import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>
        <h1>Tokoflix</h1>
        <p>Balance = {this.props.balance}</p>
      </div>
    );
  }
}

export default Navbar;
