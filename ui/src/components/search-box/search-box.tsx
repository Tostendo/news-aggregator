import React from "react";
import "./search-box.style.scss";

type Props = {
  placeholder: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBox = (props: Props) => {
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
