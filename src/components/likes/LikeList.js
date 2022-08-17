import React from "react";

import LikeItem from "./LikeItem";
import classes from './LikeList.module.css'

export default function LikeList(props) {
  return (
    <ul className={classes.likes}>
      {props.likes.map((like, index) => (
        <LikeItem key={index} user={like.user.handle}/>
      ))}
    </ul>
  );
}
