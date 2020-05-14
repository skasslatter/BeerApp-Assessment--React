import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";

import "../styling/default.scss";

interface Props {}
interface State {
  breweries: Array<Brewery>;
  countries: Array<string>;
  selectedCountry?: string;
  searchName?: string;
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
  countryName: String
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

export class Breweries extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      breweries: [],
      countries: [],
    };
    this.getAllBreweries = this.getAllBreweries.bind(this);
  }

  getAllBreweries() {
    console.log("h1");
    fetch(
      "https://sandbox-api.brewerydb.com/v2/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&withLocations=Y"
    )
      .then(function (response) {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          console.log("yes", data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });

    Axios.get(
      "https://sandbox-api.brewerydb.com/v2/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&withLocations=Y"
    )
      .then((response) => {
        console.log("all breweries response: ", response);
        const breweries: Array<Brewery> = response.data.data;
        const uniqueCountryNames = getCountryNames(breweries);

        this.setState({
          breweries,
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

  render() {
    return (
      <div>
        <div className="hero-image">
          <div className="hero-text">
            <h1>All our breweries</h1>
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
