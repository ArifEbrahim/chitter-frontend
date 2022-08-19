import React, { useRef } from "react";

import classes from "./PostForm.module.css";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";

export default function PostForm(props) {
  const textRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredText = textRef.current.value;

    props.onAddPost(enteredText);
  };

  if (props.isLoading) {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Card>
        <form onSubmit={submitHandler} className={classes.form}>
          <div className={classes.control}>
            <textarea id="text" rows="5" ref={textRef} placeholder="What's on your mind?"></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn-flat" onClick={props.onCancel}>Cancel</button>
            <button className="btn">Add Post</button>
          </div>
        </form>
      </Card>
    </>
  );
}
