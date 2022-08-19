import React, { useContext } from "react";

import PostItem from "./PostItem";
import classes from "./PostList.module.css";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import { deletePost } from "../../lib/api";

export default function PostList(props) {
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;
  const { sendRequest } = useHttp(deletePost);

  const { posts } = props;

  const deletePostHandler = async (postId) => {
    const postData = {
      postId,
      token,
    };
    await sendRequest(postData);
    await props.getPosts();
  };

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
        />
      ))}
    </ul>
  );
}
