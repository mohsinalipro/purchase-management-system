import React, { Component } from "react";
import { emit } from "eiphop";
import dateFormat from "date-format";
import AddNewPurchaseRow from "./add-new-purchase-row.component";
import { renderToStaticMarkup } from "react-dom/server";
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
  renderTable = (printView = false) => {
    return (
      <table className="table is-bordered is-fullwidth">
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
            {!printView &&
              (!this.state.activeAddNew && (
                <th
                  style={{
                    width: 140
                  }}
                >
                  Operations
                </th>
              ))}
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
                {!printView &&
                  (!this.state.activeAddNew && (
                    <td>{this.renderOperations(purchaseItem)}</td>
                  ))}
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
            <td colSpan={!printView ? 2 : 1} className="has-text-weight-bold">
              Rs. {this.calcGrandTotalAmount(this.state.purchaseList)}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  };
  modal = null;
  print = () => {
    this.modal = window.open("", "modal", null, true);
    const html = this.modal.document.createElement("html");
    const head = this.modal.document.createElement("head");
    const styles = document.querySelectorAll("style");
    for (let style of styles) {
      const tmpStyle = this.modal.document.createElement("style");
      tmpStyle.innerHTML = style.innerHTML;
      head.append(tmpStyle);
    }
    const customStyle = this.modal.document.createElement('style');
    customStyle.innerHTML = `
    @page {
      size: A4;
      margin: 0;
    }
    @media print {
      html, body {
        width: 210mm;
        height: 297mm;
      }
    }
    `;
    head.append(customStyle);
    html.append(head);
    const body = this.modal.document.createElement("body");
    html.style.backgroundColor = "#FFF";
    body.style.backgroundColor = "#FFF";
    const header = (
      <div>
        <h1 className="title has-text-centered">Hafiz Muhammad Arshad</h1>
        <h2 className="subtitle has-text-centered">
          Branch: Adda Chanab Sand, Somoria Pull, Gt Road, Ranchna Town, Lahore
        </h2>
      </div>
    );
    const content = this.renderTable(true);
    body.innerHTML =
      '<div style="padding: 20;">' +
      renderToStaticMarkup(header) +
      renderToStaticMarkup(content) +
      "</div>";
      
    // const customScript = this.modal.document.createElement('script');
    // customScript.innerHTML = `
    // (function() {
    //   window.close();
    
    // })()
    // `;
    // body.append(customScript);
    html.append(body);
    
    this.modal.document.write(html.innerHTML);
    // this.modal.print();
  };
  
  render() {
    return (
      <React.Fragment>
        <div className="columns">
          <div className="column">
            <h3>
              Buyer Name:{" "}
              <span className="has-text-link">
                {this.state.buyer && this.state.buyer.name}
              </span>
            </h3>
          </div>
          <div className="column is-1 has-text-right">
            <button className="button" onClick={this.print}>
              <i className="fa fa-print"></i>
            </button>
          </div>
        </div>
        <h5>Total Purchases: {this.state.purchaseList.length}</h5>
        {this.renderTable()}
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
