import React, { Component } from "react";
import { emit } from "eiphop";
import DatePicker from "react-date-picker";

class AddNewPurchase extends Component {
  state = {
    buyers: [],

    date: new Date(),
    buyer_id: "",
    truck_no: "",
    receipt_no: "",
    quality: "",
    cubic_feet: "",
    rate: "",
    amount: ""
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.match.params.buyer_id &&
      state.buyer_id !== props.match.params.buyer_id
    ) {
      return {
        buyer_id: props.match.params.buyer_id
      };
    }
    return null;
  }
  componentDidMount() {
    emit("getAllBuyers").then(response => {
      this.setState({
        buyers: response.data
      });
    });

    // if (this.props.match.params.buyer_id) {
    //   this.setState({
    //     buyer_id: this.props.match.params.buyer_id
    //   });
    // }
  }
  handleFieldChange = (name, value) => {
    console.log({ name, value });
    this.setState({ [name]: value });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const { buyers, ...fields } = this.state;

    const purchaseResponse = await emit("addPurchase", fields);
    if (purchaseResponse.status) {
      const buyer = this.state.buyers.find(b => b._id === this.state.buyer_id);
      if (buyer) {
        const purcahseCount = parseInt(buyer.purchaseCount);
        const purcahseCountValue = isNaN(purcahseCount) ? 0 : purcahseCount + 1;
        const buyerResponse = await emit("updateBuyerField", {
          buyer_id: buyer._id,
          field: "purchaseCount",
          value: purcahseCountValue
        });
      }
      this.props.history.goBack();
    }
  };

  renderBuyerField = () => {
    const { buyer_id } = this.props.match.params;
    const selectedBuyer = this.state.buyers.find(b => b._id === buyer_id);
    if (selectedBuyer) {
      return <strong className="has-text-link">{selectedBuyer.name}</strong>;
    } else {
      return (
        <div className="select">
          <select
            name="buyer_id"
            value={this.state.buyer_id}
            onChange={e =>
              this.handleFieldChange(e.target.name, e.target.value)
            }
          >
            {this.state.buyers.map(buyer => (
              <option key={buyer._id} value={buyer._id}>
                {buyer.name}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  renderContent = () => (
    <div className="container-fluid">
      <form onSubmit={this.handleSubmit}>
        <div className="is-clearfix">
          <div className="field is-pulled-left">
            <label className="label">Buyer</label>
            {this.renderBuyerField()}
          </div>
          <div className="field is-pulled-right">
            <label className="label">Date</label>
            <div className="control">
              <DatePicker
                value={this.state.date}
                onChange={date => this.handleFieldChange("date", date)}
                clearIcon={null}
                format="dd/MM/yyyy"
                required
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Truck No</label>
          <div className="control">
            <input
              name="truck_no"
              value={this.state.truck_no}
              onChange={e =>
                this.handleFieldChange(e.target.name, e.target.value)
              }
              className="input"
              type="text"
              placeholder="Truck No"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Receipt No</label>
          <div className="control">
            <input
              name="receipt_no"
              value={this.state.receipt_no}
              onChange={e =>
                this.handleFieldChange(e.target.name, e.target.value)
              }
              className="input"
              type="text"
              placeholder="Receipt No"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Quality</label>
          <div className="control">
            {/* <input
              name="quality"
              value={this.state.quality}
              onChange={e =>
                this.handleFieldChange(e.target.name, e.target.value)
              }
              className="input"
              type="text"
              placeholder="Quality"
              required
            /> */}
            <select
              name="quality"
              onChange={e => {
                this.handleFieldChange(e.target.name, e.target.value);
              }}
            >
              <option>SAND L/P</option>
              <option>CRUSH</option>
              <option>STONES</option>
              <option>RAVI SAND</option>
              <option>CHANAN SAND</option>
              <option>LAWRANCE PUR</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="label">Cubic Feet</label>
          <div className="control">
            <input
              name="cubic_feet"
              value={this.state.cubic_feet}
              onChange={e =>
                this.handleFieldChange(e.target.name, e.target.value)
              }
              className="input"
              type="text"
              placeholder="Cubic Feet"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Rate</label>
          <div className="control">
            <input
              name="rate"
              value={this.state.rate}
              onChange={e =>
                this.handleFieldChange(e.target.name, e.target.value)
              }
              className="input"
              type="text"
              placeholder="Rate"
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Amount</label>
          <div className="control">
            <input
              name="amount"
              value={this.state.amount}
              onChange={e =>
                this.handleFieldChange(e.target.name, e.target.value)
              }
              className="input"
              type="text"
              placeholder="Amount"
              required
            />
          </div>
        </div>
        <button className="button">Add</button>
      </form>
    </div>
  );
  render() {
    return (
      <div className="section">
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">New Purchase</p>
          </div>
          <div className="card-content">
            <div className="content">{this.renderContent()}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddNewPurchase;
