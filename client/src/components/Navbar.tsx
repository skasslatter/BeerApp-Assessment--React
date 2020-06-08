import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../styling/default.scss";

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Navbar expand="lg">
          <Navbar.Brand href="/"><span role="img" aria-label="beers">🍻</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/breweries">All Breweries</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
