import React from "react";

interface Props {
  handleSearch: (name: string) => void;
  placeholder: string
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
      <div className="col-sm-12 search-component">
        <input
          className="search-name"
          placeholder={this.props.placeholder}
          type="text"
          name="text"
          onChange={(event) => this.handleOnChange(event)}
        />
      </div>
    );
  }
}

export default SearchByName;
