import React from "react";

import classes from './LikeItem.module.css'

export default function LikeItem({user}) {
  return (
    <li className={classes.item}>
      <p>{user}</p>
    </li>
  );
}
