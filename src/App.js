import React from "react";
import { Routes, Route } from "react-router-dom";

import AllPosts from "./pages/AllPosts";
import NewPost from "./pages/NewPost";
import PostDetail from "./pages/PostDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/posts" element={<AllPosts />} />
      <Route path='/posts/:postId' element={<PostDetail />} />
      <Route path='/new-post' element={<NewPost />} />
    </Routes>
  );
}
