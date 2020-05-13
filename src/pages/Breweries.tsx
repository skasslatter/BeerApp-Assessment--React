import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import * as Utils from "../utilities";

import "../styling/default.scss";

interface Props {}
interface State {
  breweries: Array<any>;
}

export class Breweries extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      breweries: [],
    };
    this.getAllBreweries = this.getAllBreweries.bind(this);
  }

  getAllBreweries() {
    Axios.get(
      "https://sandbox-api.brewerydb.com/v2/breweries/?key=659d5c6b8f3d2447f090119e48202fdb"
    )
      .then((response) => {
        console.log("all breweries response: ", response);
        this.setState({ breweries: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getAllBreweries();
  }

  render() {
    return (
      <div>
        <div className="hero-image">
          <div className="hero-text">
            <h1>All our breweries</h1>
            {/* <p>List</p> */}
          </div>
        </div>
        <div className="container">
          {this.state.breweries.map((brewery) => (
            <Link
              key={brewery.id}
              to={`/beers/${brewery.id}`}
              className="beer-detail-link"
            >
              <div className="row">
                <div className="col-7">
                  <h2>{brewery.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default Breweries;

// list beer brands per country
// provide a search field by name
// filter/group them by country
// filter/group them by type
