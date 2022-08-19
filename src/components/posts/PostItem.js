import React, { useContext } from "react";

import classes from "./PostItem.module.css";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";

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
          <Button className='btn-delete' onClick={deleteBtnHandler} text='Delete' />
        )}
      </div>
    </li>
  );
}
