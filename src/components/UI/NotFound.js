import React from "react";
import { Link } from "react-router-dom";

import classes from "./NotFound.module.css";

export default function NotFound({ text, showBtn = true }) {
  return (
    <div className={classes.nocontent}>
      <p>No {text} found!</p>
      {showBtn && (
        <Link className="btn" to="/new-post">
          Add a Post
        </Link>
      )}
    </div>
  );
}
