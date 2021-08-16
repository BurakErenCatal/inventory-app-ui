import jwt_decode from "jwt-decode";

export const getToken = () => localStorage.getItem("accessToken");

export const setToken = (token) => localStorage.setItem("accessToken", token);

export const unsetToken = () => localStorage.removeItem("accessToken");

export const isTokenExpired = () => {
  const token = getToken();
  if (token) {
    const { exp } = jwt_decode(token);
    if (exp && Date.now() >= exp * 1000) return true;
    else return false;
  } else return true;
};
