import React from "react";
import "./search-box.style.scss";

export const SearchBox = (props: any) => {
  return (
    <div>
      <input
        className="search"
        type="search"
        placeholder={props.placeholder}
        onChange={props.handleSearch}
      />
    </div>
  );
};
