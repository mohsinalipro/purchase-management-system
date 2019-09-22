import React, { Component } from "react";
import { emit } from "eiphop";
import dateFormat from "date-format";
class PurchaseList extends Component {
  state = {
    buyer: null,
    purchaseList: []
  };

  async componentDidMount() {
    if (this.props.buyer_id) {
      const buyerResponse = await emit("getBuyerById", this.props.buyer_id);
      this.setState({
        buyer: buyerResponse.data
      });

      const purchaseResponse = await emit(
        "getPurchasesByBuyerId",
        this.props.buyer_id
      );
      this.setState({
        purchaseList: purchaseResponse.data
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <h3>
          Buyer Name:{" "}
          <span class="has-text-link">
            {this.state.buyer && this.state.buyer.name}
          </span>
        </h3>
        <h5>Total Purchases: {this.state.purchaseList.length}</h5>
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Date</th>
              <th>Truck No</th>
              <th>Receipt No</th>
              <th>Quality</th>
              <th>Cubic Feet</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.purchaseList.map((purchase, i) => (
              <tr key={purchase._id}>
                <td>{i + 1}</td>
                <td>{dateFormat("dd/MM/yyyy", new Date(purchase.date))}</td>
                <td>{purchase.truck_no}</td>
                <td>{purchase.receipt_no}</td>
                <td>{purchase.quality}</td>
                <td>{purchase.cubic_feet}</td>
                <td>{purchase.rate}</td>
                <td>{purchase.amount}</td>
                {/* <td>
                <div className="buttons are-small has-text-centered">
                  <a className="button">View All Purchases</a>
                  <a className="button">Add New Purchase</a>
                </div>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default PurchaseList;
