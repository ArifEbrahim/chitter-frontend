import React, { useEffect } from "react";
import { useParams, Outlet, useLocation, Link } from "react-router-dom";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import NotFound from "../components/UI/NotFound";
import SelectedPost from "../components/posts/SelectedPost";
import useHttp from "../components/hooks/use-http";
import { getSinglePost } from "../lib/api";

export default function PostDetail() {
  const location = useLocation();
  const params = useParams();
  const { postId } = params;

  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useHttp(getSinglePost, true);

  useEffect(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  const likesBtn = (
    <div className="centered">
      <Link className="btn-flat" to={"likes"}>
        Load Likes
      </Link>
    </div>
  );

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedPost.body && status === "completed") {
    return <NotFound text="post" />;
  }

  return (
    <>
      <SelectedPost text={loadedPost.body} author={loadedPost.user.handle} />
      {location.pathname.includes("likes") ? null : likesBtn}
      <Outlet context={loadedPost.likes} />
    </>
  );
}
