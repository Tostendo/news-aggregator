import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.style.scss";

export const Navbar = () => {
  const match = useLocation();

  const getFeedId = () => {
    if (
      match &&
      match.pathname &&
      match.pathname.split("/").length > 1 &&
      match.pathname.split("/")[2]
    ) {
      return match.pathname.split("/")[2];
    }
    return null;
  };
  return (
    <nav className="navbar">
      <ul>
        {getFeedId() && (
          <li>
            <Link to={`/feed/${getFeedId()}/edit`}>Edit Feed</Link>
          </li>
        )}
        <li>
          <Link to="/create">Create Feed</Link>
        </li>
        <li>
          <Link to="/feeds">All Feeds</Link>
        </li>
      </ul>
    </nav>
  );
};
