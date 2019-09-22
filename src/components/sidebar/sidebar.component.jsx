import React from "react";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
      <p className="menu-label is-hidden-touch">Navigation</p>
      <ul className="menu-list">
        <li>
          <NavLink to="/">
            <span className="icon">
              <i className="fa fa-home"></i>
            </span>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/buyers">
            <span className="icon">
              <i className="fa fa-users"></i>
            </span>
            Buyers
          </NavLink>

          <ul>
            <li>
              <NavLink to="/new-buyer">
                <span className="icon">
                  <i className="fa fa-user-plus"></i>
                </span>
                Add New Buyer
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          {/* <NavLink to="/purchases" activeClassName="is-active">
            <span className="icon">
              <i className="fa fa-shopping-cart"></i>
            </span>
            Purchases
          </NavLink> */}

          {/* <ul>
            <li>
              <NavLink to="/new-buyer" activeClassName="is-active">
                <span className="icon">
                  <i className="fa fa-user-plus"></i>
                </span>
                Add New Purchase
              </NavLink>
            </li>
          </ul> */}
        </li>
      </ul>
    </aside>
  );
}
