import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null);

  const isLoggedIn = !!token;

  const loginHandler = (token, userId, username) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
  };

  const contextValue = {
    token,
    userId,
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
