import React, { useState, useRef } from "react";

import classes from "./AuthForm.module.css";
import Card from "../UI/Card";
import axios from "axios";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const signUpUser = async (username, password) => {
    const url = "https://chitter-backend-api-v2.herokuapp.com/users";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      user: {
        handle: username,
        password,
      },
    };

    try {
      const response = await axios.post(url, data, config);
    } catch (error) {
      const { handle: errorMessage } = error.response.data;
      setError(`Username ${errorMessage}, please try again`);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setError(null);

    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if (isLogin) {
    } else {
      signUpUser(enteredUsername, enteredPassword);
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
