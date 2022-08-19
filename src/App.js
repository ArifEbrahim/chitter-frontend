import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import NoPage from "./pages/NoPage";
import AuthPage from "./pages/AuthPage";
import AuthContext from "./components/store/auth-context";
import MainPage from "./pages/MainPage";

export default function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        {!isLoggedIn && <Route path="auth" element={<AuthPage />} />}
        <Route path="posts" element={<MainPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Layout>
  );
}
