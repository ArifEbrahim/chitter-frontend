import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AllPosts from "./pages/AllPosts";
import NewPost from "./pages/NewPost";
import NoPage from "./pages/NoPage";
import PostDetail from "./pages/PostDetail";
import Likes from "./components/likes/Likes";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./components/store/auth-context";
import MainPage from "./pages/MainPage";

export default function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {!isLoggedIn && <Route path="auth" element={<AuthPage />} />}
        <Route path="posts" element={<AllPosts />}></Route>
        <Route path="posts/:postId" element={<PostDetail />}>
          <Route path="likes" element={<Likes />} />
        </Route>
        {isLoggedIn && <Route path="new-post" element={<NewPost />} />}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Layout>
  );
}
