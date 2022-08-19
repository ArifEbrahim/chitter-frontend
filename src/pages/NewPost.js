import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PostForm from "../components/posts/PostForm";
import AuthContext from "../components/store/auth-context";
import useHttp from "../components/hooks/use-http";
import { addPost } from "../lib/api";

export default function NewPost() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { token, userId } = authCtx;
  const { sendRequest, status } = useHttp(addPost);

  useEffect(() => {
    if (status === "completed") {
      navigate("/posts");
    }
  }, [status, navigate]);

  const addPostHandler = (postText) => {
    const postData = {
      peepData: {
        peep: {
          user_id: userId,
          body: postText,
        },
      },
      token,
    };
    sendRequest(postData);
  };

  return (
    <PostForm onAddPost={addPostHandler} isLoading={status === "pending"} />
  );
}
