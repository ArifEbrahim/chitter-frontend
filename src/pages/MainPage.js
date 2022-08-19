import React, { useContext, useState, useEffect } from "react";

import PostForm from "../components/posts/PostForm";
import AuthContext from "../components/store/auth-context";
import useHttp from "../components/hooks/use-http";
import { addPost, getAllPosts } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import PostList from "../components/posts/PostList";
import Button from "../components/UI/Button";

export default function MainPage() {
  const [showPostForm, setShowPostForm] = useState(false);
  const authCtx = useContext(AuthContext);
  const { token, userId, isLoggedIn } = authCtx;
  const { sendRequest: createPost } = useHttp(addPost);
  const {
    data: loadedPosts,
    status,
    sendRequest: getPosts,
  } = useHttp(getAllPosts, true);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const addPostHandler = async (postText) => {
    const postData = {
      peepData: {
        peep: {
          user_id: userId,
          body: postText,
        },
      },
      token,
    };
    await createPost(postData);
    await getPosts();
    setShowPostForm((prevState) => !prevState);
  };

  const showFormHandler = () => {
    setShowPostForm((prevState) => !prevState);
  };

  return (
    <>
      {isLoggedIn && !showPostForm && (
        <div className="centered">
          <Button onClick={showFormHandler} text="New Post" className="btn" />
        </div>
      )}
      {isLoggedIn && showPostForm && (
        <PostForm onAddPost={addPostHandler} onCancel={showFormHandler} />
      )}
      {status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <PostList posts={loadedPosts} getPosts={getPosts} />
      )}
    </>
  );
}
