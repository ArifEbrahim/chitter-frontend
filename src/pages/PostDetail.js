import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// import LoadingSpinner from "../components/UI/LoadingSpinner";
import SelectedPost from "../components/posts/SelectedPost";

export default function PostDetail() {
  const [post, setPost] = useState({});
  const params = useParams();
  const { postId } = params;

  useEffect(() => {
    const getPostData = async () => {
      const URL = `https://chitter-backend-api-v2.herokuapp.com/peeps/${postId}`;
      console.log(URL)
      const response = await axios.get(URL);
      setPost(response.data);
    };

    getPostData();
  }, [postId]);

  let content = <p>Loading</p>

  if(post.body) {
    content = <SelectedPost text={post.body} author={post.user.handle} />;
  }

  return <section>{content}</section>
}
