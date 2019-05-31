import '../styles/NavBar.css';

import React, { Component } from 'react';

import refreshLogo from '../assets/refresh-button.png';

class NavBar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light nav-bar-custom">
          <a className="navbar-brand m-2 nav-bar-content" href="/">
            HackerNews
            <span className="badge badge-pill badge-secondary">
              {/* ovde mozda kolko ima vesti (mada 20 ide po strani svakako) */}
            </span>
            <button
              className="btn btn-color btn-lg ml-3"
              onClick={e => this.props.refreshPage(e)}
            >
              <img src={refreshLogo} alt={refreshLogo} width="20px" />
            </button>
          </a>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
