import React, { useContext, useState, useEffect } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import classes from "./PostItem.module.css";
import AuthContext from "../store/auth-context";
import Button from "../UI/Button";

export default function PostItem(props) {
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);
  const authCtx = useContext(AuthContext);
  const { userId, isLoggedIn, username } = authCtx;
  const { likes } = props;

  useEffect(() => {
    const likedUsersAry = likes.map((data) => data.user.handle);
    if (likedUsersAry.includes(username)) {
      setIsPostLiked(true);
      const updatedLikedUsersAry = likedUsersAry.filter(
        (user) => user !== username
      );
      updatedLikedUsersAry.unshift("You");
      setLikedUsers(updatedLikedUsersAry);
    } else {
      setLikedUsers(likedUsersAry);
    }
  }, [likes, userId, username]);

  const deleteBtnHandler = () => {
    props.onDelete(props.id);
  };

  const likeHandler = () => {
    setIsPostLiked((prevState) => !prevState);
    if (likedUsers.includes("You")) {
      const updatedLikedUsersAry = likedUsers;
      updatedLikedUsersAry.shift();
      setLikedUsers(updatedLikedUsersAry);
      props.onUnlike(props.id);
    } else {
      const updatedLikedUsersAry = likedUsers;
      updatedLikedUsersAry.unshift("You");
      setLikedUsers(updatedLikedUsersAry);
      props.onLike(props.id);
    }
  };

  const createdAt = new Date(props.createdAt)

  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{`${props.author} - ${createdAt.toLocaleDateString()}`}</figcaption>
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
          {isPostLiked && isLoggedIn && (
            <BsHeartFill size="1.5em" color="red" />
          )}
          {!isPostLiked && isLoggedIn && (
            <BsHeart size="1.5em" color="darkgrey" />
          )}
        </div>
      </div>
    </li>
  );
}
