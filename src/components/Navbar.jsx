import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavHeader extends Component {
  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={{ pathname: "/" }}>tokoFLIX</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Saldo : <span>{this.props.balance}</span>
            </NavItem>
          </Nav>
        </Navbar>
        <h1 />
      </div>
    );
  }
}

export default NavHeader;
