import React from "react";
import { Link } from "react-router-dom";
import "../styling/default.scss";

export class Homepage extends React.Component {
  render() {
    return (
      <div className="bg">
        <div className="caption">
          <h1>Welcome</h1>
          <div className="homepage-buttons">
            <Link to="/breweries">
              <button className="btn btn-warning">
                Check out our breweries
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
