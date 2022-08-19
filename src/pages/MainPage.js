import React, { useContext, useState } from "react";

import PostForm from "../components/posts/PostForm";
import AuthContext from "../components/store/auth-context";
import useHttp from "../components/hooks/use-http";
import { addPost } from "../lib/api";

export default function MainPage() {
  const [showPostForm, setShowPostForm] = useState(false);
  const authCtx = useContext(AuthContext);
  const { token, userId } = authCtx;
  const { sendRequest } = useHttp(addPost);

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
    setShowPostForm((prevState) => !prevState);
  };

  const showFormHandler = () => {
    setShowPostForm((prevState) => !prevState);
  };

  return (
    <>
      {showPostForm ? (
        <PostForm onAddPost={addPostHandler} onCancel={showFormHandler} />
      ) : (
        <div className="centered">
          <button onClick={showFormHandler} className="btn">
            New Post
          </button>
        </div>
      )}
    </>
  );
}
