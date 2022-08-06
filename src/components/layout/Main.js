import React from "react";
import Header from "./Header";

const Main = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Main;
