import React, { Component } from "react";
import { emit } from "eiphop";
import dateFormat from "date-format";
import AddNewPurchaseRow from "./add-new-purchase-row.component";
import "./style.css";

class PurchaseList extends Component {
  state = {
    buyer: null,
    purchaseList: [],

    activeAddNew: false,
    editPurchaseId: false,
    cancel: false,

    highlightPurchaseId: false
  };

  async componentDidMount() {
    if (this.props.buyer_id) {
      const buyerResponse = await emit("getBuyerById", this.props.buyer_id);
      this.setState({
        buyer: buyerResponse.data
      });

      await this.initializeData();
    }
  }

  initializeData = async () => {
    const purchaseResponse = await emit(
      "getPurchasesByBuyerId",
      this.props.buyer_id
    );
    this.setState({
      purchaseList: purchaseResponse.data
    });
  };

  handleAddNew = async purchaseItem => {
    const purchaseResponse = await emit("addPurchase", purchaseItem);
    if (purchaseResponse.status) {
      const { buyer, purchaseList } = this.state;
      if (buyer) {
        const purcahseCountValue = purchaseList.length + 1;
        const buyerResponse = await emit("updateBuyerField", {
          buyer_id: buyer._id,
          field: "purchaseCount",
          value: purcahseCountValue
        });
      }
      this.initializeData();
      this.setState({ cancel: false });
    }
  };

  handleUpdate = async updatedPurchaseItem => {
    console.log({ updatedPurchaseItem });
    const updateResponse = await emit("updatePurchase", updatedPurchaseItem);
    if (updateResponse.status) {
      this.initializeData();
      this.setState({ cancel: false });
    }
  };

  handleEditRow(purchaseItem) {
    // if already in edit mode

    this.setState(
      {
        cancel: this.state.editPurchaseId !== false
      },
      () => {
        this.setState({
          editPurchaseId: purchaseItem._id
        });
      }
    );
  }
  handleDeleteRow = purchaseItem => {
    this.setState({ highlightPurchaseId: purchaseItem._id }, () => {
      setTimeout(async () => {
        const isConfirm = window.confirm("Are you sure to delete purchase?");
        this.setState({ highlightPurchaseId: false });

        if (!isConfirm) {
          return;
        }

        const purchaseResponse = await emit("deletePurchase", purchaseItem);
        if (purchaseResponse.status) {
          const { buyer, purchaseList } = this.state;
          if (buyer) {
            const purchaseCountValue = purchaseList.length - 1;
            const buyerResponse = await emit("updateBuyerField", {
              buyer_id: buyer._id,
              field: "purchaseCount",
              value: purchaseCountValue
            });
          }
          this.initializeData();
          this.setState({ cancel: false });
        }
      });
    });
  };
  renderOperations = purchaseItem => {
    return (
      <div className="buttons are-small has-text-centered">
        {this.state.editPurchaseId === purchaseItem._id ? (
          <React.Fragment>
            <a
              className="button is-outlined is-success"
              onClick={() =>
                this.setState({ cancel: false }, () =>
                  this.setState({ editPurchaseId: false })
                )
              }
            >
              Save
            </a>
            <a
              className="button is-outlined is-danger"
              onClick={() =>
                this.setState({ cancel: true }, () =>
                  this.setState({ editPurchaseId: false })
                )
              }
            >
              Cancel
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <a
              className="button"
              onClick={() => this.handleEditRow(purchaseItem)}
            >
              Edit
            </a>
            <a
              className="button"
              onClick={() => this.handleDeleteRow(purchaseItem)}
            >
              Delete
            </a>
          </React.Fragment>
        )}
      </div>
    );
  };

  calcGrandTotalAmount = purchaseList => {
    let total = 0;
    for (let purchaseItem of purchaseList) {
      total += parseFloat(this.calcTotalAmount(purchaseItem));
    }
    return isNaN(total) ? 0 : total.toFixed(2);
  };

  calcTotalAmount = purchaseItem => {
    const amount =
      parseFloat(purchaseItem.rate) * parseFloat(purchaseItem.cubic_feet);
    return isNaN(amount) ? 0 : amount.toFixed(2);
  };
  render() {
    return (
      <React.Fragment>
        <h3>
          Buyer Name:{" "}
          <span className="has-text-link">
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
              {!this.state.activeAddNew && (
                <th
                  style={{
                    width: 140
                  }}
                >
                  Operations
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {this.state.purchaseList.map((purchaseItem, i) =>
              this.state.editPurchaseId === purchaseItem._id ? (
                <tr
                  key={purchaseItem._id}
                  className="highlight add-new-purchase-row"
                >
                  <AddNewPurchaseRow
                    buyer={this.state.buyer}
                    itemNo={i + 1}
                    purchaseItem={purchaseItem}
                    handleUpdate={this.handleUpdate}
                    cancel={this.state.cancel}
                  />
                  <td>{this.renderOperations(purchaseItem)}</td>
                </tr>
              ) : (
                <tr
                  key={purchaseItem._id}
                  className={`purchase-row ${
                    this.state.highlightPurchaseId === purchaseItem._id
                      ? "highlight"
                      : ""
                  }`}
                >
                  <td>
                    <span>{i + 1}</span>
                  </td>
                  <td>
                    <span>
                      {dateFormat("dd/MM/yyyy", new Date(purchaseItem.date))}
                    </span>
                  </td>
                  <td>
                    <span>{purchaseItem.truck_no}</span>
                  </td>
                  <td>
                    <span>{purchaseItem.receipt_no}</span>
                  </td>
                  <td>
                    <span>{purchaseItem.quality}</span>
                  </td>
                  <td>
                    <span>{purchaseItem.cubic_feet}</span>
                  </td>
                  <td>
                    <span>{purchaseItem.rate}</span>
                  </td>
                  <td>
                    <span>{this.calcTotalAmount(purchaseItem)}</span>
                  </td>
                  {!this.state.activeAddNew && (
                    <td>{this.renderOperations(purchaseItem)}</td>
                  )}
                </tr>
              )
            )}
          </tbody>
          <tfoot>
            {this.state.activeAddNew && (
              <tr className="highlight add-new-purchase-row">
                <AddNewPurchaseRow
                  buyer={this.state.buyer}
                  itemNo={this.state.purchaseList.length + 1}
                  handleAdd={this.handleAddNew}
                  cancel={this.state.cancel}
                />
              </tr>
            )}
            <tr>
              <td colSpan="7">
                <div className="has-text-right has-text-weight-bold">
                  Total Amount:{" "}
                </div>
              </td>
              <td colSpan="2" className="has-text-weight-bold">
                Rs. {this.calcGrandTotalAmount(this.state.purchaseList)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="has-text-right">
          {this.state.activeAddNew ? (
            <React.Fragment>
              <button
                className="button is-outlined is-success"
                onClick={
                  (() => this.setState({ cancel: false }),
                  () => this.setState({ activeAddNew: false }))
                }
              >
                Save
              </button>
              <button
                className="button is-outlined is-danger"
                onClick={() =>
                  this.setState({ cancel: true }, () =>
                    this.setState({ activeAddNew: false })
                  )
                }
              >
                Cancel
              </button>
            </React.Fragment>
          ) : (
            <button
              className="button"
              onClick={() => this.setState({ activeAddNew: true })}
            >
              Add Purchase
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default PurchaseList;
