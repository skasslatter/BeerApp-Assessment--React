import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Beer Wiki</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/beers">All Beers</Nav.Link>
              <Nav.Link href="/breweries">All Breweries</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
