import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light mr-2">
          <a className="navbar-brand m-2">
            HackerNews
            <span className="badge badge-pill badge-secondary">
              {/* ovde mozda kolko ima vesti (mada 20 ide po strani svakako) */}
            </span>
            <button className="btn btn-secondary btn-sm">Refresh</button>
          </a>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
