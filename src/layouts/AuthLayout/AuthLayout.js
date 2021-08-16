import React from "react";
import s from "./AuthLayout.module.scss";

//components
import Header from "../../components/Header/Header";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div id={s.content}>{children}</div>
    </div>
  );
};

export default AuthLayout;
