import React from "react";

interface Props {
  handleSearch: (name: string) => any;
  options: Array<string>;
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
      <div className="row">
        <div className="col-sm-12 search-component">
          <select
            name="dropDown"
            onChange={(event) => this.handleOnChange(event)}
          >
            <option value="" selected disabled>
              Select
            </option>
            {this.props.options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SearchByCountry;
