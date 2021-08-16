import React from "react";
import s from "./DashboardLayout.module.scss";

//components
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div id={s.content}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
