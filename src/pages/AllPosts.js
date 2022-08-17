import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.body}</li>
          ))}
        </ul>
      </>
    );
  }

  return <section>{content}</section>;
}
