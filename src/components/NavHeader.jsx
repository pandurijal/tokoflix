import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavHeader extends Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={{ pathname: "/" }}>tokoFLIX</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight className="balance">
          <NavItem eventKey={1}>
            Saldo : <span>{this.props.balance}</span>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default NavHeader;
