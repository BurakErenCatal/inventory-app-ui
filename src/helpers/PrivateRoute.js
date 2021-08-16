import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { isTokenExpired } from "../services/TokenService";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (isTokenExpired() ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
