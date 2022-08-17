import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import AllPosts from "./pages/AllPosts";
import NewPost from "./pages/NewPost";
import NotFound from "./pages/NotFound"
import PostDetail from "./pages/PostDetail";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to='/posts' replace />} />
        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
