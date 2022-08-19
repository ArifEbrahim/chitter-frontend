import React, { useContext } from "react";

import classes from "./PostItem.module.css";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { deletePost } from "../../lib/api";

export default function PostItem(props) {
  const authCtx = useContext(AuthContext);
  const { token, userId, isLoggedIn } = authCtx;
  const { sendRequest } = useHttp(deletePost);

  const deletePostHAndler = () => {
    const postData = {
      postId: props.id,
      token,
    };
    sendRequest(postData);
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
        {parseInt(userId) === parseInt(props.authorId) && isLoggedIn && <button className={classes.delete} onClick={deletePostHAndler}>Delete</button>}
      </div>
    </li>
  );
}
