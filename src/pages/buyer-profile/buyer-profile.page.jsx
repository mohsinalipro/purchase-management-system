import React, { Component } from "react";
import { emit } from "eiphop";
import "./style.css";
class BuyerProfile extends Component {
  state = {
    buyer: null
  };
  componentDidMount() {
    emit("getBuyerById", this.props.match.params.buyer_id).then(response => {
      this.setState({ buyer: response.data });
    });
  }
  renderProfile = buyer => {
    return (
      <div className="container buyer-profile">
        <div className="columns">
          <div className="column label">Name</div>
          <div className="column">{buyer.name}</div>
        </div>
        <div className="columns">
          <div className="column label">Phone</div>
          <div className="column">{buyer.phone}</div>
        </div>
        <div className="columns">
          <div className="column label">Company</div>
          <div className="column">{buyer.company}</div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="section">
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">Buyer Profile</p>
          </div>
          <div className="card-content">
            <div className="content">
              {this.state.buyer && this.renderProfile(this.state.buyer)}
            </div>
          </div>
        </div>
        <br />
        <a onClick={() => this.props.history.goBack()}>
          <span className="icon">
            <i className="fa fa-arrow-left"></i>
          </span>
          <span>Back to Buyers</span>
        </a>
      </div>
    );
  }
}

export default BuyerProfile;
