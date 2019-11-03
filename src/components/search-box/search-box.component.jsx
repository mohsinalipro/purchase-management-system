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
            onInput={e => {
              if (e.target.value.length === 0) {
                props.handleSearch("");
              }
            }}
          />
        </div>
        <div className="control">
          <button className="button is-info">Search</button>
        </div>
      </div>
    </form>
  );
}

export default SearchBox;
