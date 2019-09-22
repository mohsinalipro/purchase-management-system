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
      <div class="container buyer-profile">
        <div class="columns">
          <div class="column label">Name</div>
          <div class="column">{buyer.name}</div>
        </div>
        <div class="columns">
          <div class="column label">Phone</div>
          <div class="column">{buyer.phone}</div>
        </div>
        <div class="columns">
          <div class="column label">Company</div>
          <div class="column">{buyer.company}</div>
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
          <span class="icon">
            <i class="fa fa-arrow-left"></i>
          </span>
          <span>Back to Buyers</span>
        </a>
      </div>
    );
  }
}

export default BuyerProfile;
