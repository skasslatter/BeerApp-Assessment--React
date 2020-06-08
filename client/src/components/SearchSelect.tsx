import React from "react";

interface Props {
  handleSearch: (name: string) => void;
  options: Array<string>;
}
interface State {
  searchValue: string;
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
            defaultValue=""
            name="dropDown"
            onChange={(event) => this.handleOnChange(event)}
          >
            <option value="" disabled>
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
