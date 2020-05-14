import React from "react";
import { Link } from "react-router-dom";
import "../styling/default.scss";

export class Homepage extends React.Component {
  render() {
    return (
      <div className="bg">
          <div className="caption">
            <h1>Welcome</h1>
            <Link to="/beers" className="main-section-link">
          <button className="btn btn-success">
            Check out all our beers
          </button>
        </Link>
          </div>
      </div>
    );
  }
}

export default Homepage;
