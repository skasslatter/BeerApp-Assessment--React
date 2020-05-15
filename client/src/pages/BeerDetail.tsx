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
    const selectedBeer = this.props.match.params.id;
    // Axios.get(
    //   `https://sandbox-api.brewerydb.com/v2/beer/${selectedBeer}/?key=659d5c6b8f3d2447f090119e48202fdb`
    // )
    Axios.get(`http://localhost:3000/beers/${selectedBeer}`)
      .then((response) => {
        console.log("one beer response: ", response);
        this.setState({ beer: response.data.beers });
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
            {/* <p>Style: {this.state.beer.style.category.name}</p> */}
            {/* <p>Style: {this.state.beer.style.description}</p> */}

          </div>
        )}
      </div>
    );
  }
}

export default BeerDetail;
