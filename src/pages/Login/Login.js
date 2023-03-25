import React, { useState, useEffect } from "react";
import axios from "axios";
import { setToken, isTokenExpired } from "../../services/TokenService";
import { useHistory } from "react-router-dom";

import s from "./Login.module.scss";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState({ username: "", password: "", general: "" });

  useEffect(() => {
    if (!isTokenExpired()) {
      history.push("/");
    }
  }, []);

  const handleChange = (e) => {
    if (!e.target.value) {
      setFormErrors({ ...formErrors, [e.target.name]: "Bu alan boş olamaz" });
    } else {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setFormErrors({ ...formErrors, general: "" });

    if (formData.username && formData.password) {
      //request
      //   axios
      //     .post("https://dev-inventory.singlewindow.io/v1/api/auth", formData)
      //     .then((res) => {
      //       console.log("res", res.data.access_token);
      //       setToken(res.data.access_token);
      //     })
      //     .catch((err) => {
      //       setFormErrors({ ...formErrors, general: err.response.data.message });
      //     });

      try {
        const res = await axios.post("https://dev-inventory.singlewindow.io/v1/api/auth", formData);
        if (res.data) {
          console.log(res.data);
          setToken(res.data.access_token);
          history.push("/");
        }
      } catch (err) {
        setFormErrors({ ...formErrors, general: err.response?.data.message });
      }
    }
  };

  return (
    <div id="login-container" className={s.container}>
      <div className={s.form}>
        {formErrors.general && (
          <div className={s.generalError}>
            <span>{formErrors.general}</span>
          </div>
        )} 
        <div className={s.inputGroup}>
          <label>Kullanıcı Adı</label>
          <input type="text" name="username" onChange={handleChange} />
          <span>{formErrors.username}</span>
        </div>
        <div className={s.inputGroup}>
          <label>Şifre</label>
          <input type="password" name="password" onChange={handleChange} />
          <span>{formErrors.password}</span>
        </div>
        <button onClick={handleSubmit}>Giriş Yap</button>
      </div>
    </div>
  );
};

export default Login;
