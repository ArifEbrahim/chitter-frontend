import React, { useContext } from "react";

import classes from "./PostItem.module.css";
import AuthContext from "../store/auth-context";

export default function PostItem(props) {
  const authCtx = useContext(AuthContext);
  const { userId, isLoggedIn } = authCtx;

  const deleteBtnHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <div className={classes.actions}>
        {parseInt(userId) === parseInt(props.authorId) && isLoggedIn && (
          <button className={classes.delete} onClick={deleteBtnHandler}>
            Delete
          </button>
        )}
      </div>
    </li>
  );
}
