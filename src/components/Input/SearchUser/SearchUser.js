import React from "react";
import { SearchBox } from "office-ui-fabric-react";

function SearchUser(props) {
  return (
    <div className="search-wrapper">
      <div className="text-center">
        <span>Invite to Board</span>
        <hr className="line" />
      </div>
      <SearchBox
        placeholder="Type email address"
        onSearch={props.onSearch}
        styles={{ root: { width: 300 } }}
        onClear={props.onClear}
      />
      <div className="search-result">
        <ul className="action-list">{props.searchResults}</ul>
      </div>
    </div>
  );
}

export default SearchUser;

SearchUser.defaultProps = {
  onSearch: (val) => {},
  users: [],
};
