import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  userId: "",
  username: "",
  isLoggedIn: false,
  login: (token, userId) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const initialUserId = localStorage.getItem("userId");
  const [userId, setUserId] = useState(initialUserId);
  const initialUsername = localStorage.getItem("username");
  const [username, setUsername] = useState(initialUsername);

  const isLoggedIn = !!token;

  const loginHandler = (token, userId, username) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  const contextValue = {
    token,
    userId,
    username,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
