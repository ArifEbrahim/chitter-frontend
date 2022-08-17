import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Chitter</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              to="/posts"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              All posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new-post"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Add a post
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
