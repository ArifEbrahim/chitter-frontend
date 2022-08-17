import React, { useState, useEffect } from "react";
import { useParams, Outlet, useLocation, Link } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPostFound from "../components/posts/NoPostFound";
import SelectedPost from "../components/posts/SelectedPost";

export default function PostDetail() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = useParams();
  const { postId } = params;

  useEffect(() => {
    const getPostData = async () => {
      setIsLoading(true);
      setError(null);
      const URL = `https://chitter-backend-api-v2.herokuapp.com/peeps/${postId}`;
      try {
        const response = await axios.get(URL);
        setPost(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPostData();
  }, [postId]);

  const likesBtn = (
    <div className="centered">
      <Link className="btn-flat" to={'likes'}>
        Load Likes
      </Link>
    </div>
  );

  if (isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!post.body && !isLoading) {
    return <NoPostFound />;
  }

  return (
    <>
      <SelectedPost text={post.body} author={post.user.handle} />
      {location.pathname.includes("likes") ? null : likesBtn}
      <Outlet context={post.likes}/>
    </>
  );
}
