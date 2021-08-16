import React from "react";

import s from "./Card.module.scss";

const Card = ({ children, title }) => {
  return (
    <div id="card-container" className={s.container}>
      <div className={s.titleContainer}>
        <span>{title}</span>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};

export default Card;
