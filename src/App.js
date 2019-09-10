import React, { Component } from "react";
// import "./App.css";
import "./App.sass";
import BuyerForm from "./components/buyer-form/buyer-form.component";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BuyerForm />
      </div>
    );
  }
}

export default App;
