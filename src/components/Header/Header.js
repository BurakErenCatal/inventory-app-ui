import React from "react";
import { isTokenExpired, unsetToken } from "../../services/TokenService";
import { useHistory } from "react-router-dom";

import s from "./Header.module.scss";

const Header = () => {
  const history = useHistory();

  const handleLogout = () => {
    unsetToken();
    history.push("/login");
  };

  return (
    <div id="header" className={s.container}>
      <div className={s.brandingWrapper}>
        <span>ENVANTER</span>
      </div>
      {!isTokenExpired() && (
        <div className={s.authBar}>
          <div className={s.userDetailWrapper}>
            <span className={s.name}>Kullanıcı Adı</span>
            <span className={s.role}>Yönetici</span>
          </div>
          <img src={"https://i.pravatar.cc/48"} alt="avatar-pic" className={s.userAvatar} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
