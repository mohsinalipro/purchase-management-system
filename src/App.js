import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import DashboardPage from "./pages/dashboard/dashboard.page";

import BuyerProfilePage from "./pages/buyer-profile/buyer-profile.page";

import BuyersPage from "./pages/buyers/buyers.page";
import AddNewBuyer from "./pages/add-new-buyer/add-new-buyer.page";

import PurchasesPage from "./pages/purchases/purchases.page";
import AddNewPurchase from "./pages/add-new-purchase/add-new-purchase.page";

import Header from "./components/header/header.component";
import Sidebar from "./components/sidebar/sidebar.component";
import "./App.css";
import PrintPage from "./components/print-page/print-page.component";

class App extends Component {
  render() {
    return (
      <div id="app">
        <HashRouter>
          <Header />
          <section className="main-content is-fullheight">
            {/* <Sidebar /> */}
            <div className="container-fluid">
              <Switch>
                <Route path="/buyers" exact component={BuyersPage} />
                <Route path="/new-buyer" component={AddNewBuyer} />
                <Route
                  path="/purchases/:buyer_id"
                  exact
                  component={PurchasesPage}
                />
                <Route
                  path="/purchases/new/:buyer_id"
                  component={AddNewPurchase}
                />
                <Route
                  path="/buyer-profile/:buyer_id"
                  exact
                  component={BuyerProfilePage}
                />
                <Route path="/print-page" component={PrintPage} />
                <Route path="/" exact component={DashboardPage} />
              </Switch>
            </div>
          </section>

          {/* <footer className="footer ">
          <div className="container">
            <div className="content has-text-centered">
              <p>Hello</p>
            </div>
          </div>
        </footer> */}
        </HashRouter>
      </div>
    );
  }
}

export default App;
