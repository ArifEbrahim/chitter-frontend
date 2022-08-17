import React from "react";

import classes from "./SelectedPost.module.css";

export default function SelectedPost(props) {
  return (
    <figure className={classes.post}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
}
