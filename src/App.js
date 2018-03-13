import React, { Component } from "react";
import "./App.css";
import DirSelect from "./DirSelect";

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Carlton's Tools</h1>
        </header>
        <DirSelect />
      </div>
    );
  };
}

export default App;
