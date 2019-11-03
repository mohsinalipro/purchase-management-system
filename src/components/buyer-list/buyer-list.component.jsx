import React, { Component } from "react";
import { emit } from "eiphop";
import { Link } from "react-router-dom";
import "./style.css";
import SearchBox from "../search-box/search-box.component";
class BuyerList extends Component {
  state = {
    buyerList: [],
    filteredBuyers: []
  };
  componentDidMount() {
    emit("getAllBuyers", {}).then(response => {
      this.setState({
        buyerList: response.data,
        filteredBuyers: response.data
      });
    });
  }

  renderTable = () => (
    <table className="table is-bordered">
      <thead>
        <tr>
          <th>Buyer Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.state.filteredBuyers.map(buyer => (
          <tr key={buyer._id}>
            <td>{buyer.name}</td>
            <td>{buyer.phone}</td>
            <td>
              <div className="buttons are-small has-text-centered">
                <Link to={`/purchases/${buyer._id}`} className="button">
                  View All Purchases
                </Link>
                <Link to={`/purchases/new/${buyer._id}`} className="button">
                  Add New Purchase
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  renderGrid = () => (
    <div className="container-fluid buyers-grid">
      <div className="columns is-multiline">
        {this.state.filteredBuyers.map(this.renderGridItem)}
      </div>
    </div>
  );

  renderGridItem = buyer => (
    <div className="column" key={buyer._id}>
      <div className="card">
        <div className="card-content has-text-centered">
          <Link to={`/buyer-profile/${buyer._id}`}>
            <p className="is-size-3">
              <strong>{buyer.name}</strong>
            </p>
          </Link>
          <span className=" tag is-dark subtitle ">
            Total Purchase: {buyer.purchaseCount || 0}
          </span>
        </div>
        <footer className="card-footer is-flex">
          <div className="card-footer-item has-background-primary ">
            <Link to={`/purchases/${buyer._id}`} className="has-text-white ">
              <span>View Purchases</span>
            </Link>
          </div>
          {/* <div className="card-footer-item has-background-primary">
            <Link
              to={`/purchases/new/${buyer._id}`}
              className=" has-text-light"
            >
              <span>New Purchase</span>
            </Link>
          </div> */}
          {/* <Link to={`/purchases/${buyer._id}`} className="button  is-info">
              <span className="icon">
                <i className="fa fa-list-alt"></i>
              </span>
              <span>View Purchases</span>
            </Link>
            <Link
              to={`/purchases/new/${buyer._id}`}
              className="button  is-success"
            >
              <span className="icon">
                <i className="fa fa-cart-plus"></i>
              </span>
              <span>New Purchase</span>
            </Link> */}
        </footer>
      </div>
    </div>
  );

  handleSearch = term => {
    if (this.state.buyerList.length > 0) {
      const filteredBuyers = this.state.buyerList.filter(
        b => b.name.toLowerCase().indexOf(term.toLowerCase().trim()) !== -1
      );
      this.setState({
        filteredBuyers
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <SearchBox handleSearch={this.handleSearch} />
        <br />
        <span className="tag is-gray subtitle">
          {this.state.filteredBuyers.length !== this.state.buyerList.length ? (
            <span>Buyers Found: {this.state.filteredBuyers.length}</span>
          ) : (
            <span>Total Buyers: {this.state.buyerList.length}</span>
          )}
        </span>
        {this.renderGrid()}
      </React.Fragment>
    );
  }
}

export default BuyerList;
