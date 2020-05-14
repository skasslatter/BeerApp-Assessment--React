import React from "react";

interface Props {
  handleSearch: (name: string) => any;
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
        <input
          className="search-name"
          placeholder="Search a country..."
          type="text"
          name="text"
          onChange={(event) => this.handleOnChange(event)}
        />
      </div>
    );
  }
}

export default SearchByCountry;
