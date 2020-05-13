import React from "react";

import Axios from "axios";
import "../styling/default.scss";

interface Props {
  match: any;
}
interface State {
  beer: any;
}

export class BeerDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      beer: [],
    };
  }

  componentDidMount() {
    console.log("this.props", this.props);
    const selectedBeer = this.props.match.params.id;
    Axios.get(
      `https://sandbox-api.brewerydb.com/v2/beer/${selectedBeer}/?key=659d5c6b8f3d2447f090119e48202fdb`
    )
      .then((response) => {
        console.log("one beer response: ", response.data.data);
        let myJSON = JSON.stringify(response.data.data);
        let myData = JSON.parse(myJSON);
        this.setState({ beer: myData });
        console.log("STATE", this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {!this.state.beer && <h1>Loading...</h1>}
        {this.state.beer && (
          <div>
            <h2>{this.state.beer.name}</h2>
            {!this.state.beer.description && <div></div>}
            {this.state.beer.description && (
              <p>Description: {this.state.beer.description}</p>
            )}
            {!this.state.beer.foodPairings && <div></div>}
            {this.state.beer.foodPairings && (
              <p>foodPairings: {this.state.beer.foodPairings}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default BeerDetail;
