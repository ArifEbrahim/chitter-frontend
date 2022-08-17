import React from "react";
import { NavLink } from "react-router-dom";

export default function MainNavigation() {
  return (
    <header>
      <div>Chitter</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/posts">All posts</NavLink>
          </li>
          <li>
            <NavLink to="/new-post">Add a post</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
