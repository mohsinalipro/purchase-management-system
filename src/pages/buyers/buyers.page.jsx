import React, { Component } from "react";
import { emit } from "eiphop";
import { appName } from "../../../package.json";
import BuyerList from "../../components/buyer-list/buyer-list.component";
import {Link} from 'react-router-dom'
class Buyers extends Component {
  componentDidMount() {
    emit("setWindowTitle", { title: `Buyers - ${appName}` });
  }
  render() {
    return (
      <div className="section">
              <Link to ="/new-buyer" className="button"> Add New Buyer</Link>
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">Buyers</p>
          </div>
          <div className="card-content">
            <div className="content">
              <BuyerList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Buyers;
