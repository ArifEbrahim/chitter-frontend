import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AuthForm.module.css";
import Card from "../UI/Card";
import AuthContext from "../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { signUpUser, loginUser } from "../../lib/api";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    data: loginData,
    status: loginStatus,
    sendRequest: loginUserReq,
  } = useHttp(loginUser);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  // const signUpUser = async (username, password) => {
  //   const usersURL = "https://chitter-backend-api-v2.herokuapp.com/users";
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   const userData = {
  //     user: {
  //       handle: username,
  //       password,
  //     },
  //   };

  //   try {
  //     await axios.post(usersURL, userData, config);
  //   } catch (error) {
  //     const { handle: errorMessage } = error.response.data;
  //     setError(`Username ${errorMessage}, please try again`);
  //   }
  // };

  const loginHandler = async (userData) => {
    await loginUserReq(userData)
    console.log(loginData)
    const { session_key, user_id } = loginData;
    authCtx.login(session_key, user_id, userData.handle);

    navigate("/posts");
  };

  const submitHandler = async(event) => {
    event.preventDefault();

    const userData = {
      handle: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    if (isLogin) {
      await loginHandler(userData);
    } else {
      signUpUser(userData);
      loginHandler(userData);
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  if (loginStatus === 'pending') {
    return <LoadingSpinner />;
  }

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
        {/* {error && <p className={classes.error}>{error}</p>} */}
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
