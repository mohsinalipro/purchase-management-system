import React, { Component } from "react";
import { emit } from "eiphop";
import moment from "moment";
import { dateFormat } from "../../common/strings";
import "./style.css";
class BuyerProfile extends Component {
  state = {
    buyer: null,
    editMode: false
  };
  componentDidMount() {
    emit("getBuyerById", this.props.match.params.buyer_id).then(response => {
      this.setState({ buyer: response.data });
    });
  }
  renderProfile = buyer => {
    const momentDateCreated = moment(buyer.dateCreated);
    return (
      <div className="container buyer-profile">
        <div className="columns">
          <div className="column label">Name</div>
          <div className="column" onDoubleClick={() => this.setState({editMode: true})}>
            {this.state.editMode ? <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        defaultValue={buyer.name}
                        required
                      />
                    </div> : buyer.name}</div>
        </div>
        <div className="columns">
          <div className="column label">Phone</div>
          <div className="column" onDoubleClick={() => this.setState({editMode: true})}>
            {this.state.editMode ? <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        defaultValue={buyer.phone}
                        required
                      />
                    </div> : buyer.phone}</div>
        </div>
        <div className="columns">
          <div className="column label">Company</div>
          <div className="column" onDoubleClick={() => this.setState({editMode: true})}>
            {this.state.editMode ? <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="company"
                        placeholder="Company"
                        defaultValue={buyer.company}
                        required
                      />
                    </div> : buyer.company}</div>
        </div>
        <div className="columns">
          <div className="column label">Date Created</div>
          <div className="column">
            {momentDateCreated.isValid() &&
              momentDateCreated.format(dateFormat)}
          </div>
        </div>
        <div className="columns">
          {this.state.editMode && <button className="button" onClick={() => this.setState({editMode: false})}>Save</button>}
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
        <button className="button" onClick={() => this.props.history.goBack()}>
          <span className="icon">
            <i className="fa fa-arrow-left"></i>
          </span>
          <span>Back to Buyers</span>
        </button>
      </div>
    );
  }
}

export default BuyerProfile;
