import React from "react";
import Axios from "axios";
import _ from "lodash";
import SearchByName from "../components/SearchByName";
import SearchSelect from "../components/SearchSelect";

import "../styling/default.scss";

interface Props {
  match: any;
}
interface State {
  beers: Array<Beer>;
  shownBeers: Array<Beer>;
  searchType: string;
  loading: boolean;
  types: Array<string>;
}
interface Beer {
  id: string;
  name: string;
  style: any;
}

function getBeerTypes(beers: Array<Beer>) {
  const types = beers
    .filter((beer) => {
      return (
        beer.style.shortName !== null && beer.style.shortName !== undefined
      );
    })
    .map((beer) => {
      return beer.style.shortName;
    });
  const uniqueBeerTypes = _.uniq(types);
  return uniqueBeerTypes;
}

function filterBeersByType(beers: Array<Beer>, name: string) {
  if (!name) {
    return beers;
  }
  const filteredBeers = beers
    .filter((beer) => {
      return (
        beer.style.shortName !== null && beer.style.shortName !== undefined
      );
    })
    .filter((beer) => {
      let typeName = beer.style.shortName;
      return typeName === name;
    });
  return filteredBeers;
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
      types: [],
    };
    this.getAllBreweries = this.getAllBreweries.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleSearchByName = this.handleSearchByName.bind(this);
    this.handleBeerTypeSearch = this.handleBeerTypeSearch.bind(this);
  }

  getAllBreweries() {
    const selectedBrewery = this.props.match.params.id;
    Axios.get(`http://localhost:3000/breweries/${selectedBrewery}/beers`)
      .then((response) => {
        console.log("all beers of this brewery: ", response.data);
        const beers: Array<Beer> = response.data.beers;
        const uniqueBeerTypes = getBeerTypes(beers);
        this.setState({
          beers: beers,
          shownBeers: beers,
          loading: false,
          types: uniqueBeerTypes,
        });
      })
      .catch((error) => {
        console.log("Error fetching beers for brewery", error);
      });
  }

  componentDidMount() {
    this.getAllBreweries();
  }

  //handles the drop down search menu
  handleSearchType(search: any) {
    let selectedSearch = search.target.value;
    this.setState({
      shownBeers: this.state.beers,
      searchType: selectedSearch
    });
  }

  handleSearchByName(name: string): void {
    const filteredBeers = filterBeersByName(this.state.beers, name);
    this.setState({
      shownBeers: filteredBeers
    });
  }

  handleBeerTypeSearch(name: string) {
    const filteredBeers = filterBeersByType(this.state.beers, name);
    this.setState({
      shownBeers: filteredBeers
    });
  }

  render() {
    let searchComponent = null;
    if (this.state.searchType === "name") {
      searchComponent = (
        <SearchByName
          handleSearch={this.handleSearchByName}
          placeholder="beer name"
        />
      );
    } else if (this.state.searchType === "type") {
      searchComponent = (
        <SearchSelect
          handleSearch={this.handleBeerTypeSearch}
          options={this.state.types}
        />
      );
    }

    return (
      <div>
        <div className="hero-image">
          <div className="hero-text">
            <h1>Their beers</h1>
          </div>
        </div>
        {this.state.loading && <h1>Loading 🍻🍻🍻</h1>}
        {!this.state.beers && !this.state.loading && <h1>No beers found</h1>}
        {this.state.beers && !this.state.loading && (
          <div className="container">
            <div className="row">
              <div className="col-sm-12 search">
                <h4>I want to </h4>
                <select
                  name="search"
                  className="search-select"
                  onChange={(event) => this.handleSearchType(event)}
                >
                  <option value="name" selected>
                    search by Name
                  </option>
                  <option value="type">search by Type</option>
                </select>
              </div>
            </div>

            {searchComponent}

            <div className="row">
              {this.state.shownBeers.map((beer: any) => (
                <div className="col-sm-12" key={beer.id}>
                  {/* <Link  to={`/beers/${beer.id}`} > */}
                  <div className="list-item">
                    <h4>{beer.name}</h4>
                    <p>Type: {beer.style.name}</p>
                    {beer.labels && (
                      <div className="beer-img">
                        <img src={beer.labels.medium} />
                      </div>
                    )}
                  </div>
                  {/* </Link> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BreweryDetail;
