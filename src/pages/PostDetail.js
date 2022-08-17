import React, { useState, useEffect } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPostFound from "../components/posts/NoPostFound";
import SelectedPost from "../components/posts/SelectedPost";

export default function PostDetail() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLikes, setShowLikes] = useState(false);

  const navigate = useNavigate();
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

  const showLikesHandler = () => {
    setShowLikes(true);
    navigate(`/posts/${postId}/likes`);
  };

  const likesBtn = (
    <div className="centered">
      <button className="btn-flat" onClick={showLikesHandler}>Show Likes</button>
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
      {showLikes ? null : likesBtn}
      <Outlet />
    </>
  );
}
