import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import AuthContext from "../store/auth-context";

export default function MainNavigation() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

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
          {!isLoggedIn ? (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) => (isActive ? classes.active : "")}
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <button onClick={logoutHandler} className={classes.logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
