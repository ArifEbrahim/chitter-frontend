import React, { useEffect } from "react";

import PostList from "../components/posts/PostList";
import NotFound from "../components/UI/NotFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../components/hooks/use-http";
import { getAllPosts } from "../lib/api";

export default function AllPosts() {
  const { data, isLoading, error, sendRequest } = useHttp(getAllPosts);
  console.log(data)

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    <p className="centered">{error}</p>;
  }

  if (!isLoading && (!data || data.length === 0)) {
    <NotFound text="posts" />;
  }

  return <PostList posts={data} />;
}
