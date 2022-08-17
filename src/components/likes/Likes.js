import React from "react";
import { useOutletContext } from "react-router-dom";

import LikeList from "./LikeList";
import classes from './Likes.module.css'

export default function Likes() {
  const likes = useOutletContext();

  if (likes.length === 0) {
    return (
      <div className="centered">
        <p>No likes yet</p>
      </div>
    );
  }

  return (
    <section className={classes.likes}>
      <h2>This was liked by the following users:</h2>
      <LikeList likes={likes} />
    </section>
  );
}
