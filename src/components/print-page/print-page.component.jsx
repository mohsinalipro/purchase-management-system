import React, { Component } from "react";
import { emit } from "eiphop";

import "./style.css";

export default class PrintPageComponent extends Component {
  content = this.props.location.state
    ? this.props.location.state.payload
    : null;
  printRef = React.createRef();

  componentDidMount() {
    if (this.content) {
      this.print();
    } else {
      // this.goBack();
    }
  }
  goBack = () => {
    this.props.history.goBack();
    // this.props.history.push("/buyers");
  };
  print = () => {
    const head = document.querySelector("head");
    let html = `<head>${head.innerHTML}</head>`;
    html += `<body>${this.printRef.current.innerHTML}</body>`;
    emit("printRawHtml", html).then(res => {
      if (res.status) {
        // this.goBack();
      }
    });
  };
  render() {
    return this.content ? (
      <React.Fragment>
        <div className="controls has-text-right">
          <button className="button" onClick={this.print}>
            <i className="fa fa-print"></i>
          </button>
          <button className="button" onClick={this.goBack}>
            <i className="fa fas fa-times"></i>
          </button>
        </div>
        <div ref={this.printRef} className="print-area">
          <div className="print-header">
            {/* <h1 className="title is-uppercase has-text-centered">
              Hafiz Muhammad Arshad
            </h1>
            <h4 className="subtitle is-uppercase has-text-centered">
              Branch: Adda Chanab Sand, Somoria Pull, Gt Road, Ranchna Town,
              Lahore
            </h4> */}
            <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <td className="has-text-centered">03008494903</td>
                  <td rowspan="2" className="v-align-middle">
                    <h1 className="title is-uppercase has-text-centered">
                      Hafiz Muhammad Arshad
                    </h1>
                  </td>
                  <td className="has-text-centered">03004660072</td>
                </tr>
                <tr>
                  <td className="is-uppercase has-text-centered">
                    HEAD OFFICE: 86/A
                  </td>
                  <td className="is-uppercase has-text-centered">
                    RAVI ROAD LAHORE
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="is-uppercase has-text-centered">
                    Branch: Adda Chanab Sand, Somoria Pull, Gt Road, Ranchna
                    Town, Lahore
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" className="is-uppercase has-text-centered">
                    General Order Suppliers: Crush, Stones, Ravi Sand, Chanan
                    Sand, Lawrance Pur Etc
                  </td>
                </tr>
              </thead>
            </table>
          </div>
          {this.content}
        </div>
      </React.Fragment>
    ) : null;
  }
}
