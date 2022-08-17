import React, { useState, useEffect } from "react";
import axios from "axios";

import PostList from "../components/posts/PostList";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const URL = "https://chitter-backend-api-v2.herokuapp.com/peeps";
      const response = await axios.get(URL);
      setPosts(response.data);
    };

    getPostData();
  }, []);

  let content = <p>No posts found.</p>;

  if (posts.length > 0) {
    content = (
      <PostList posts={posts} />
    );
  }

  return <section>{content}</section>;
}
