import React from "react";
import ReactDOM from "react-dom";

import { setupFrontendListener } from "eiphop";

import App from "./App";

import "./index.sass";

const electron = window.require("electron");
setupFrontendListener(electron);

ReactDOM.render(<App />, document.getElementById("root"));
