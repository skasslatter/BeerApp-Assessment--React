import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import "../styling/default.scss";

interface Props {}
interface State {
  beers: Array<any>;
}


export class Beers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      beers: [],
    };
  this.getAllBeers = this.getAllBeers.bind(this)
}

  // getAllBeers() {
  //   Axios
  //     .get("https://sandbox-api.brewerydb.com/v2/beers/?key=659d5c6b8f3d2447f090119e48202fdb")
  //     .then((response) => {
  //       console.log("all beers response: ", response);
  //       this.setState({ beers: response.data.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  getAllBeers() {
    Axios
    .get("http://localhost:3000/beers")
    .then((response) => {
      console.log("all beers response: ", response);
      this.setState({ beers: response.data.beers });
    })
    .catch((error) => {
      console.log(error);
    });
}

  componentDidMount() {
    this.getAllBeers();
  }

  render() {
    return (
      <div>

        <div className="hero-image">
          <div className="hero-text">
            <h1>All our beers</h1>
            </div>
            </div>
            <div className="container">
              {this.state.beers.map((beer) => (
                <Link
                  key={beer.id}
                  to={`/beers/${beer.id}`}
                  className="beer-detail-link"
                >
                  <div className="row beer-list">
                    <div className="col-7 beer-list_text">
                      <h2>{beer.name}</h2>
                      <h4>Year: {beer.year}</h4>
                      <p>id: {beer.id}</p>

                    </div>
                  </div>
                </Link>
              ))}
            </div>
          
        
      </div>
    );
  }
}

export default Beers;
