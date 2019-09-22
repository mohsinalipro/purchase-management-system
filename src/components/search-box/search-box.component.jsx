import React from "react";

function SearchBox(props) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        props.handleSearch(formData.get("search"));
      }}
    >
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="search"
            name="search"
            placeholder="Search buyer by name"
          />
        </div>
        <div className="control">
          <a className="button is-info">Search</a>
        </div>
      </div>
    </form>
  );
}

export default SearchBox;
