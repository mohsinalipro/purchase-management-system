import React, { Component } from "react";
import { emit } from "eiphop";
import { appName } from "../../../package.json";

class Dashboard extends Component {
  componentDidMount() {
    emit("setWindowTitle", { title: `Dashboard - ${appName}` });

    emit("getBuyerCount").then(response => {
      this.setState({ buyerCount: response.data });
    });
    emit("getPurchaseCount").then(response => {
      this.setState({ purchaseCount: response.data });
    });
  }
  state = {
    buyerCount: 0,
    purchaseCount: 0
  };
  render() {
    return (
      <div className="section">
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">Dashboard</p>
          </div>
          <div className="card-content">
            <div className="content">
              <div class="tile is-ancestor has-text-centered">
                <div class="tile is-parent has-background-primary">
                  <article class="tile is-child box">
                    <p class="title">{this.state.buyerCount}</p>
                    <p class="subtitle">Total Buyers</p>
                  </article>
                </div>
                <div class="tile is-parent has-background-info">
                  <article class="tile is-child box">
                    <p class="title">{this.state.purchaseCount}</p>
                    <p class="subtitle">Total Purchases</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashboard;
