import React, { Component } from "react";
import { emit } from "eiphop";
import { appName } from "../../../package.json";
import PurchaseList from "../../components/purchase-list/purchase-list.component.jsx";

class Purchases extends Component {
  componentDidMount() {
    emit("setWindowTitle", { title: `Dashboard - ${appName}` });
  }
  render() {
    return (
      <div className="section">
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">Purchases</p>
          </div>
          <div className="card-content">
            <div className="content">
              <PurchaseList buyer_id={this.props.match.params.buyer_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Purchases;
