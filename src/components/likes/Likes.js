import React from "react";
import { useOutletContext } from "react-router-dom";

import LikeList from "./LikeList";
import NotFound from "../UI/NotFound";
import classes from './Likes.module.css'

export default function Likes() {
  const likes = useOutletContext();

  if (likes.length === 0) {
    return <NotFound text='likes' showBtn={false} />
  }

  return (
    <section className={classes.likes}>
      <h2>This was liked by the following users:</h2>
      <LikeList likes={likes} />
    </section>
  );
}
