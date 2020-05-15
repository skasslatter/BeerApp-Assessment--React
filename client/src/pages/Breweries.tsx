import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";
import SearchByName from "../components/SearchByName";
import SearchByCountry from "../components/SearchByCountry";

import "../styling/default.scss";

interface Props {}
interface State {
  breweries: Array<Brewery>;
  countries: Array<string>;
  shownBreweries: Array<Brewery>;
  selectedCountry?: string;
  searchType?: string;
}
interface Brewery {
  id: string;
  name: string;
  locations: Array<Location>;
}
interface Location {
  country: Country;
}
interface Country {
  displayName: string;
}

///functions
function getCountryNames(breweries: Array<Brewery>) {
  const locations = breweries
    .filter((brewery) => {
      return brewery.locations !== null && brewery.locations !== undefined;
    })
    .map((brewery) => {
      return brewery.locations;
    });
  const flatLocations = _.flatten(locations);
  const countryNames = flatLocations.map((location) => {
    return location.country.displayName;
  });
  const uniqueCountryNames = _.uniq(countryNames);
  return uniqueCountryNames;
}

function filterBreweriesByCountry(
  breweries: Array<Brewery>,
  countryName: string
) {
  if (!countryName) {
    return breweries;
  }
  const filteredBreweries = breweries
    .filter((brewery) => {
      return brewery.locations !== null && brewery.locations !== undefined;
    })
    .filter((brewery) => {
      const validLocations = brewery.locations.filter((location) => {
        return location.country.displayName === countryName;
      });
      return validLocations.length > 0;
    });
  return filteredBreweries;
}

function filterBreweriesByName(breweries: Array<Brewery>, name: string) {
  const filteredBreweries = breweries.filter((brewery) => {
    const regex = new RegExp(name, "i");
    console.log(brewery.name, name, regex.test(brewery.name));
    return regex.test(brewery.name);
  });
  return filteredBreweries;
}

//component
export class Breweries extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      breweries: [],
      countries: [],
      shownBreweries: [],
      searchType: "name",
    };
    this.getAllBreweries = this.getAllBreweries.bind(this);
    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleSearchByName = this.handleSearchByName.bind(this);
    this.handleSearchByCountry = this.handleSearchByCountry.bind(this);
  }

  getAllBreweries() {
    Axios.get("http://localhost:3000/breweries")
      .then((response) => {
        console.log("all breweries response: ", response);
        const breweries: Array<Brewery> = response.data.beers;
        const uniqueCountryNames = getCountryNames(breweries);
        this.setState({
          breweries: breweries,
          shownBreweries: breweries,
          countries: uniqueCountryNames,
        });
      })
      .catch((error) => {
        console.log("error2", error);
      });
  }
  componentDidMount() {
    this.getAllBreweries();
  }

  //handles the drop down search menu
  handleSearchType(search: any) {
    this.setState({
      shownBreweries: this.state.breweries,
    })
    let selectedSearch = search.target.value;
    this.setState({ searchType: selectedSearch });
  }
  handleSearchByName(name: string): void {
    this.setState({
      shownBreweries: this.state.breweries,
    })
    const filteredBreweries = filterBreweriesByName(this.state.breweries, name);
    this.setState({
      shownBreweries: filteredBreweries,
    });
  }
  handleSearchByCountry(name: string): void {
    const filteredBreweries = filterBreweriesByCountry(
      this.state.breweries,
      name,
    );
    this.setState({
      shownBreweries: filteredBreweries,
    });
  }

  render() {
    let searchComponent = <div></div>;
    if (this.state.searchType === "name") {
      searchComponent = <SearchByName handleSearch={this.handleSearchByName} />;
    } else if (this.state.searchType === "country") {
      searchComponent = (
        <SearchByCountry
          handleSearch={this.handleSearchByCountry}
          countries={this.state.countries}
        />
      );
    }

    return (
      <div>
        <div className="hero-image">
          <div className="hero-text">
            <h1>All our breweries</h1>
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
          {this.state.shownBreweries.map((brewery) => (
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
