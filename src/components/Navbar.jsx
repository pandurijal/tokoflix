import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

class NavHeader extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home" className="title">
                tokoFLIX
              </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Saldo : {this.props.balance}
            </NavItem>
          </Nav>
        </Navbar>
        <h1 />
      </div>
    );
  }
}

export default NavHeader;
