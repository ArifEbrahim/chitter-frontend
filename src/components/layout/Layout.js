import React from "react";

import MainNavigation from "./MainNavigation";
import classes from './Layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </>
  );
}
