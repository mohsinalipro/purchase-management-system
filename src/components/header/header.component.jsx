import React from "react";
import { Link, NavLink } from "react-router-dom";
import { appName } from "../../../package.json";
import "./style.css";
export default function Header(props) {
  const isPrintPage = props.location.pathname.indexOf("/print-page") >= 0;
  console.log(props.location);
  return !isPrintPage ? (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          {/* <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          /> */}
          {appName}
        </Link>

        {/* <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> */}
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        {/* <div className="navbar-start">
          <a className="navbar-item">Home</a>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div> */}

        <div className="navbar-end">
          {/* <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div>
          </div> */}
          <NavLink to="/" className="navbar-item">
            {/* <span className="icon">
                  <i className="fa fa-home"></i>
                </span> */}
            Dashboard
          </NavLink>

          <div className="navbar-item has-dropdown is-hoverable">
            <NavLink to="/buyers" className="navbar-link">
              {/* <span className="icon">
                    <i className="fa fa-users"></i>
                  </span> */}
              Buyers
            </NavLink>

            <div className="navbar-dropdown">
              <NavLink to="/new-buyer" className="navbar-item">
                {/* <span className="icon">
                    <i className="fa fa-user-plus"></i>
                  </span> */}
                Add New Buyer
              </NavLink>
              {/* <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  ) : null;
}
