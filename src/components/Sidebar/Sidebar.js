import React from "react";

import {Link, useLocation} from "react-router-dom";
import csx from "classnames"

import s from "./Sidebar.module.scss";

const Sidebar = () => {
    const {pathname} = useLocation();
    return (
        <div id="sidebar" className={s.container}>
        <div className={s.content}>
            <Link to={"/"} className={csx(s.menuItem, pathname === "/" && s.active)}>
                Dashboard
            </Link>
            <Link to={"/assets"} className={csx(s.menuItem, pathname.includes("/assets") && s.active)}>
                Varlıklar
            </Link>
            <Link to={"/users"} className={csx(s.menuItem, pathname.includes("/users") && s.active)}>
                Kullanıcılar
            </Link>
        </div>
    </div>
    )
}

export default Sidebar;