import React, { useEffect } from "react";

import PostList from "../components/posts/PostList";
import NotFound from "../components/UI/NotFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../components/hooks/use-http";
import { getAllPosts } from "../lib/api";

export default function AllPosts() {
  const { data: loadedPosts, status, error, sendRequest } = useHttp(getAllPosts, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status==='pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    <p className="centered">{error}</p>;
  }

  if (status === 'completed' && (!loadedPosts || loadedPosts.length === 0)) {
    <NotFound text="posts" />;
  }

  return <PostList posts={loadedPosts} />;
}
