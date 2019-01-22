import React, { Component } from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class NavHeader extends Component {
  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/" className="title">
                tokoFLIX
              </a>
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
