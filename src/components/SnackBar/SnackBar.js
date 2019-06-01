import React, { Component } from "react";
import Styles from "../SnackBar/snackbar.module.css";

class SnackBar extends Component {
  message = "";

  state = { isActive: false };

  openSnackBar = (message = "Something went wrong...") => {
    this.message = message;
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 2000);
    });
  };

  render() {
    const { isActive } = this.state;
    return (
      <div
        className={
          isActive ? [Styles.snackbar, Styles.show].join(" ") : Styles.snackbar
        }
      >
        {this.message}
      </div>
    );
  }
}

export default SnackBar;
