import React, { Component } from "react";
const electron = window.require("electron");
const fs = electron.remote.require("fs");
// const ipcRenderer = electron.ipcRenderer;

class BuyerForm extends Component {
  constructor(props) {
    super(props);
    this.ipcRenderer = electron.ipcRenderer;
    this.ipcRenderer.on("add-buyer:done", function(event, response) {
      console.log(response);
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    this.ipcRenderer.send("add-buyer", { name: data.get("name") });
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Text input" />
            </div>
          </div>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default BuyerForm;
