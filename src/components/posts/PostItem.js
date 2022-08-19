import React, { useContext } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import classes from "./PostItem.module.css";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";

export default function PostItem(props) {
  const authCtx = useContext(AuthContext);
  const { userId, isLoggedIn } = authCtx;

  const deleteBtnHandler = () => {
    props.onDelete(props.id);
  };

  const likeHandler = () => {
    props.onLike(props.id)
  }

  const likedUsers = props.likes.map((data) => data.user.handle);

  const likedByCurrentUser = props.likes.find(
    (user) => parseInt(user.user.id) === parseInt(userId)
  );

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
        <p className={classes.likes}>Likes: {likedUsers.join(", ")}</p>
      </figure>
      <div className={classes.actions}>
        {parseInt(userId) === parseInt(props.authorId) && isLoggedIn && (
          <Button
            className="btn-delete"
            onClick={deleteBtnHandler}
            text="Delete"
          />
        )}
        <div className={classes.icon} onClick={likeHandler}>
          {likedByCurrentUser ? (
            <BsHeartFill size="1.5em" color="red" />
          ) : (
            <BsHeart size="1.5em" color="darkgrey" />
          )}
        </div>
      </div>
    </li>
  );
}
