import "./NavBar.css";
import React from "react";
import refreshIcon from "../../assets/refresh-button.png";

function NavBar(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light nav-bar-custom">
        <a className="navbar-brand m-2 nav-bar-content" href="/">
          <b>HackerNews</b>
        </a>
        <button
          className="btn btn-default btn-color btn-lg ml-3 mb-4"
          onClick={e => props.refreshPage(e)}
        >
          <img src={refreshIcon} alt={refreshIcon} width="20px" />
        </button>
      </nav>
    </React.Fragment>
  );
}
export default NavBar;
