const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let win = null;

const url =
  process.env.NODE_ENV === "production"
    ? path.join(__dirname, "/build/index.html") // root at / not ./
    : "http://localhost:3000";

const createWindow = () => {
  win = new BrowserWindow({ width: 1000, height: 600 });
  win.loadURL(url);
  if (process.env.NODE_ENV !== "production") win.webContents.openDevTools();
  win.on("closed", () => (win = null));
};

app.on("ready", () => createWindow());
app.on("activate", () => !win && createWindow());
app.on("window-all-closed", () => process.platform != "darwin" && app.quit());

ipcMain.on("get:dir", () => {
  const dirs = dialog.showOpenDialog(win, { properties: ["openDirectory"] });
  if (dirs && dirs.length > 0) win.webContents.send("set:dir", dirs[0]);
});
