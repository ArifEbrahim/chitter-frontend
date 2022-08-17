import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoPostFound from "../components/posts/NoPostFound";
import SelectedPost from "../components/posts/SelectedPost";

export default function PostDetail() {
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  let content = <NoPostFound />;

  if (post.body) {
    content = <SelectedPost text={post.body} author={post.user.handle} />;
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
