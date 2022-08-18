import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AuthForm.module.css";
import Card from "../UI/Card";
import axios from "axios";
import AuthContext from "../store/auth-context";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const signUpUser = async (username, password) => {
    const usersURL = "https://chitter-backend-api-v2.herokuapp.com/users";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const userData = {
      user: {
        handle: username,
        password,
      },
    };

    try {
      await axios.post(usersURL, userData, config);
    } catch (error) {
      const { handle: errorMessage } = error.response.data;
      setError(`Username ${errorMessage}, please try again`);
    }
  };

  const loginUser = async (username, password) => {
    const sessionsURL = "https://chitter-backend-api-v2.herokuapp.com/sessions";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const sessionData = {
      session: {
        handle: username,
        password,
      },
    };
    try {
      const response = await axios.post(sessionsURL, sessionData, config);
      const { session_key } = response.data;
      authCtx.login(session_key);
      navigate("/posts");
    } catch (error) {
      const { handle: errorMessage } = error.response.data;
      setError(errorMessage);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setError(null);

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
      loginUser(enteredUsername, enteredPassword);
    } else {
      signUpUser(enteredUsername, enteredPassword);
      loginUser(enteredUsername, enteredPassword);
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Card>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.control}>
          <label html="username">Username</label>
          <input type="text" id="username" required ref={usernameRef} />
        </div>
        <div className={classes.control}>
          <label html="password">Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.actions}>
          <button className="btn">{isLogin ? "Login" : "Sign Up"}</button>
          <button
            type="button"
            className="btn-flat"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </Card>
  );
}
