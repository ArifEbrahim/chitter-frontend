import React, { useContext } from "react";

import PostItem from "./PostItem";
import classes from "./PostList.module.css";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { deletePost, likePost, unlikePost } from "../../lib/api";

export default function PostList(props) {
  const authCtx = useContext(AuthContext);
  const { token, userId } = authCtx;
  const { sendRequest: deletePostReq } = useHttp(deletePost);
  const { sendRequest: likePostReq } = useHttp(likePost);
  const { sendRequest: unlikePostReq } = useHttp(unlikePost);

  const { posts } = props;

  const deletePostHandler = async (postId) => {
    const postData = {
      postId,
      token,
    };
    await deletePostReq(postData);
    await props.getPosts();
  };

  const likePostHandler = async (postId) => {
    const postData = {
      token,
      postId,
      userId,
    };
    await likePostReq(postData);
  };

  const unlikePostHandler = async (postId) => {
    const postData = {
      token,
      postId,
      userId,
    };
    await unlikePostReq(postData);
  }

  return (
    <ul className={classes.list}>
      {posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          text={post.body}
          author={post.user.handle}
          authorId={post.user.id}
          onDelete={deletePostHandler}
          likes={post.likes}
          onLike={likePostHandler}
          onUnlike={unlikePostHandler}
          createdAt={post.created_at}
        />
      ))}
    </ul>
  );
}
