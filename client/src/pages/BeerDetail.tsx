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
    Axios.get(`http://localhost:3000/beers/${selectedBeer}`)
      .then((response) => {
        console.log("one beer response: ", response);
        this.setState({ beer: response.data.beer });
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
            <h5>{this.state.beer.name}</h5>
            <p>{this.state.beer.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default BeerDetail;
