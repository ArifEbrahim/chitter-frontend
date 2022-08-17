import React from "react";

import PostItem from "./PostItem";
import classes from './PostList.module.css'

export default function PostList(props) {
  const { posts } = props;

  return (
    <ul className={classes.list}>
      {posts.map((post) => (
        <PostItem key={post.id} id={post.id} text={post.body} author={post.user.handle} />
      ))}
    </ul>
  );
}
