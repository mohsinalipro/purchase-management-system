import React, { Component } from "react";
import { emit } from "eiphop";
import DatePicker from "react-date-picker";

class AddNewPurchaseRow extends Component {
  state = {
    // _id:'',
    // buyer_id: '',
    date: new Date(),
    truck_no: "",
    receipt_no: "",
    quality: "",
    cubic_feet: "",
    rate: "",
    amount: ""
  };

  constructor(props) {
    super(props);

    const { purchaseItem = null } = props;

    if (purchaseItem) {
      purchaseItem.date = new Date(purchaseItem.date);
      this.state = purchaseItem;
    }
  }
  handleFieldChange = (name, value) => {
    console.log({ [name]: value });
    this.setState({ [name]: value });
  };
  componentWillUnmount() {
    const {
      buyer,
      handleAdd = null,
      handleUpdate = null,
      cancel = false
    } = this.props;

    if (cancel) return;

    // add new
    if (typeof handleAdd === "function") {
      handleAdd({ buyer_id: buyer._id, ...this.state });
    }
    // update
    if (typeof handleUpdate === "function") {
      handleUpdate({ buyer_id: buyer._id, ...this.state });
    }
  }
  render() {
    console.log(this.state);
    const { itemNo } = this.props;
    return (
      <React.Fragment>
        <td>{itemNo}</td>
        <td name="date">
          <DatePicker
            value={this.state.date}
            onChange={date => this.handleFieldChange("date", date)}
            clearIcon={null}
            format="dd/MM/yyyy"
          />
        </td>
        <td>
          <input
            type="text"
            value={this.state.truck_no}
            onChange={e => {
              this.handleFieldChange("truck_no", e.target.value);
            }}
            autoFocus
          />
        </td>
        <td>
          <input
            type="text"
            value={this.state.receipt_no}
            onChange={e => {
              this.handleFieldChange("receipt_no", e.target.value);
            }}
          />
        </td>
        <td>
          {/* <input
            type="text"
            value={this.state.quality}
            onChange={e => {
              this.handleFieldChange("quality", e.target.value);
            }}
          /> */}
          <select
            onChange={e => {
              this.handleFieldChange("quality", e.target.value);
            }}
          >
            <option selected disabled>
              --SELECT--
            </option>
            <option>SAND L/P</option>
            <option>CRUSH</option>
            <option>STONES</option>
            <option>RAVI SAND</option>
            <option>CHANAN SAND</option>
            <option>LAWRANCE PUR</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            value={this.state.cubic_feet}
            onChange={e => {
              this.handleFieldChange("cubic_feet", e.target.value);
            }}
          />
        </td>
        <td>
          <input
            type="text"
            value={this.state.rate}
            onChange={e => {
              this.handleFieldChange("rate", e.target.value);
            }}
          />
        </td>
        <td>
          <input
            type="text"
            value={this.state.amount}
            onChange={e => {
              this.handleFieldChange("amount", e.target.value);
            }}
          />
        </td>
      </React.Fragment>
    );
  }
}

export default AddNewPurchaseRow;
