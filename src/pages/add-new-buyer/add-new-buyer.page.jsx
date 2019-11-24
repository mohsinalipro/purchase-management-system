import React, { Component } from "react";
import { emit } from "eiphop";
import { appName } from "../../../package.json";

class AddNewBuyer extends Component {
  componentDidMount() {
    emit("setWindowTitle", { title: `Add New Buyer - ${appName}` });
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const payload = {
      name: data.get("name"),
      phone: data.get("phone"),
      company: data.get("company"),
      purchaseCount: 0
    };

    emit("addBuyer", payload)
      .then(res => {
        this.props.history.goBack();
      })
      .catch(err => console.trace(err));
  };
  render() {
    return (
      <div className="section">
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">New Buyer</p>
          </div>
          <div className="card-content">
            <div className="content">
              <div className="container-fluid">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Phone</label>
                    <div className="control">
                      <input
                        className="input"
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Company Name</label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        required
                      />
                    </div>
                  </div>
                  <button className="button">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddNewBuyer;
