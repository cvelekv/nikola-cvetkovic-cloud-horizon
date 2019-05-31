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
            <b> HackerNews</b>
          </a>
          <button
            className="btn btn-default btn-color btn-lg ml-3 mb-4"
            onClick={e => this.props.refreshPage(e)}
          >
            <img src={refreshLogo} alt={refreshLogo} width="20px" />
          </button>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
