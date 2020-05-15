import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "../styling/default.scss";

interface Props {
  match: any;
}
interface State {
  beers: any;
}

export class BreweryDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      beers: [],
    };
    this.getAllBreweries = this.getAllBreweries.bind(this);
  }

  getAllBreweries() {
    const selectedBeer = this.props.match.params.id;
    Axios.get(`http://localhost:3000/breweries/${selectedBeer}`)
      .then((response) => {
        console.log("all beers of this brewery response: ", response.data);
        this.setState({
          beers: response.data.beers,
        });
        console.log("this.state.beers", this.state.beers);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  componentDidMount() {
    this.getAllBreweries();
  }

  render() {
    return (
      <div>
        {!this.state.beers && <h1>Loading...</h1>}
        {this.state.beers && (
          <div className="container">
            <div className="row">
              {this.state.beers.map((beer: any) => (
                <Link key={beer.id} to={`/beers/${beer.id}`} className="col-sm-12">
                  <div >
                    <h5>{beer.name}</h5>
                    <p>Style: {beer.style.category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BreweryDetail;
