import React from "react";
import MainNavbar from "./NavBar";

export default function DefaultLayout({ children }) {
  return (
    <div>
      <div>
        <MainNavbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
