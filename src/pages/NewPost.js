import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PostForm from "../components/posts/PostForm";
import AuthContext from "../components/store/auth-context";

export default function NewPost() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { token, userId } = authCtx;

  const addPostHandler = async (text) => {
    setIsLoading(true);
    const url = "https://chitter-backend-api-v2.herokuapp.com/peeps";
    const config = {
      headers: {
        Authorization: `Token token=${token}`,
        "Content-Type": "application/json",
      },
    };
    const data = {
      peep: {
        user_id: userId,
        body: text,
      },
    };

    try {
      await axios.post(url, data, config);
      setIsLoading(false);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return <PostForm onAddPost={addPostHandler} isLoading={isLoading}/>;
}
