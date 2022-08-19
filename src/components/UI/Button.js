import React from "react";

export default function Button(props) {
  return <button onClick={props.onClick} className={props.className}>{props.text}</button>;
}
