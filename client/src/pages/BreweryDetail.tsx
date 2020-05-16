import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchByName from "../components/SearchByName";

import "../styling/default.scss";

interface Props {
  match: any;
}
interface State {
  beers: Array<Beer>;
  shownBeers: Array<Beer>;
  searchType: string;
  loading: boolean;
}
interface Beer {
  id: string;
  name: string;
}

function filterBeersByName(beers: Array<Beer>, name: string) {
  const filteredBeers = beers.filter((beer) => {
    const regex = new RegExp(name, "i");
    console.log(beer.name, name, regex.test(beer.name));
    return regex.test(beer.name);
  });
  return filteredBeers;
}

export class BreweryDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      beers: [],
      shownBeers: [],
      searchType: "name",
      loading: true,
    };
    this.getAllBreweries = this.getAllBreweries.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleSearchByName = this.handleSearchByName.bind(this);

  }

  getAllBreweries() {
    const selectedBeer = this.props.match.params.id;
    Axios.get(`http://localhost:3000/breweries/${selectedBeer}`)
      .then((response) => {
        console.log("all beers of this brewery response: ", response.data);
        this.setState({
          beers: response.data.beers,
          shownBeers: response.data.beers,
          loading: false
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

  //handles the drop down search menu
  handleSearchType(search: any) {
    this.setState({
      shownBeers: this.state.beers,
    })
    let selectedSearch = search.target.value;
    this.setState({ searchType: selectedSearch });
  }
  handleSearchByName(name: string): void {
    this.setState({
      shownBeers: this.state.beers,
    })
    const filteredBeers = filterBeersByName(this.state.beers, name);
    this.setState({
      shownBeers: filteredBeers,
    });
  }

  render() {
    let searchComponent = <div></div>;
    if (this.state.searchType === "name") {
      searchComponent = <SearchByName handleSearch={this.handleSearchByName} placeholder="beer name"/>;
    } else if (this.state.searchType === "type") {
      searchComponent = <div></div>
    }

    return (
      <div>
        {this.state.loading && <h1>Loading...</h1>}
        {!this.state.beers && !this.state.loading && <h1>No beers found</h1>}
        {this.state.beers && !this.state.loading && (
          <div>
          <div className="hero-image">
          <div className="hero-text">
            <h1>All their beers</h1>
          </div>
        </div>
          <div className="container">
            <div className="search-header">
            <div>
              <h4 id="search-title">I want to </h4>
              <select
                name="search"
                className="search-select"
                onChange={(event) => this.handleSearchType(event)}
              >
                <option value="name" selected>
                  search by Name
                </option>
                <option value="country">search by Country</option>
              </select>
            </div>
            {searchComponent}
          </div>
            <div className="row">
              {this.state.shownBeers.map((beer: any) => (
                <div className="col-sm-12">
                <Link  to={`/beers/${beer.id}`} >
                  <div key={beer.id}>
                    <h5>{beer.name}</h5>
                    <p>Style: {beer.style.category.name}</p>
                  </div>
                </Link>
                </div>
              ))}
            </div>
          </div>
          </div>
        )}
      </div>
    );
  }
}

export default BreweryDetail;
