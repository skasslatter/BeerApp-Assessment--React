import React from "react";

interface Props {
  handleSearch: (name: string) => any;
  countries: Array<string>;
}
interface State {
  searchValue: any;
}

class SearchByCountry extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleOnChange = (event: any) => {
    this.setState({
      searchValue: event.target.value,
    });
    this.props.handleSearch(event.target.value);
  };

  render() {
    return (
      <div>
        <select name="country" onChange={(event) => this.handleOnChange(event)}>
        <option value="" selected disabled>
            Select country
          </option>
          {this.props.countries.map((country, index) => 
            <option key={index} value={country}>{country}</option>
          )}
        </select>
      </div>
    );
  }
}

export default SearchByCountry;

{
  /* <input
          className="search-name"
          placeholder="Search a country..."
          type="text"
          name="text"
          onChange={(event) => this.handleOnChange(event)}
        /> */
}
