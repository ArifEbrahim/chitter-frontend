import React, { useState, useEffect } from "react";
import axios from "axios";

import PostList from "../components/posts/PostList";
import NotFound from "../components/UI/NotFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPostData = async () => {
      setIsLoading(true);
      setError(null);
      const URL = "https://chitter-backend-api-v2.herokuapp.com/peeps";
      try {
        const response = await axios.get(URL);
        setPosts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPostData();
  }, []);

  let content = <NotFound text='post' />;

  if (posts.length > 0 && !isLoading) {
    content = <PostList posts={posts} />;
  } else if (error) {
    content = <p className="centered">{error}</p>;
  } else if (isLoading) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return <section>{content}</section>;
}
