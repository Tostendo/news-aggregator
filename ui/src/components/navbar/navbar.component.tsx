import React from "react";
import { Link } from "react-router-dom";
import "./navbar.style.scss";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/create">Create Feed</Link>
        </li>
      </ul>
    </nav>
  );
};
