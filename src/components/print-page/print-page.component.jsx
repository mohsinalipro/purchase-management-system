import React, { Component } from "react";

export default class PrintPageComponent extends Component {
  componentDidMount() {
    console.log(window.location);
  }
  render() {
    const { children: Children, ...props } = this.props;
    return "Print";
  }
}
