import React from "react";
import { Link } from "react-router-dom";

export default function NavSwitch() {
  return (
    <div className="nav-switch-container">
      <ul>
        <li>
          <Link className="switch-link--active" to="/explore-all">
            Grid
          </Link>
        </li>
        <li>
          <Link to="/filter-page">Filter</Link>
        </li>
        <div className="switch-hover"></div>
      </ul>
    </div>
  );
}
