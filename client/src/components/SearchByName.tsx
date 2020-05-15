import React from "react";

interface Props {
  handleSearch: (name: string) => void;
}
interface State {
  searchValue: string;
}

class SearchByName extends React.Component<Props, State> {
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
          placeholder="Brewery name..."
          type="text"
          name="text"
          onChange={(event) => this.handleOnChange(event)}
        />
      </div>
    );
  }
}

export default SearchByName;
