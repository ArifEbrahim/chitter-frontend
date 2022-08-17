import React from "react";
import { Link } from "react-router-dom";

import classes from './PostItem.module.css'

export default function PostItem(props) {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className="btn" to={`/posts/${props.id}`}>View
      </Link>
    </li>
  );
}
