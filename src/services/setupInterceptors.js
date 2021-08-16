import axios from "axios";
import { getToken, isTokenExpired } from "./TokenService";

const setup = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        if (!isTokenExpired()) {
          config.headers["Authorization"] = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setup;
