const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let win = null;

const production = process.env.NODE_ENV === "production";
console.log(process.env);
console.log(`ENV = ${process.env.NODE_ENV}, production = ${production}`);

const url = true
  ? `file://${path.join(__dirname, "index.html")}`
  : "http://localhost:5432";

console.log(url);
const createWindow = () => {
  win = new BrowserWindow({ width: 1000, height: 600 });
  win.loadURL(url);
  win.webContents.openDevTools();
  win.on("closed", () => (win = null));
};

app.on("ready", () => createWindow());
app.on("activate", () => !win && createWindow());
app.on("window-all-closed", () => process.platform != "darwin" && app.quit());

ipcMain.on("get:dir", () => {
  const dirs = dialog.showOpenDialog(win, { properties: ["openDirectory"] });
  if (dirs && dirs.length > 0) win.webContents.send("set:dir", dirs[0]);
});
