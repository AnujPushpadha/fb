import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    const url = "http://localhost:3000/user/login";
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        console.log(response.data.data.token.key);
        localStorage.setItem("Token", response.data.data.token.key);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      });

    // console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login to Your Account</h1>

        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={"input"}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={"input"}
        />

        <button type="submit" className={"white_btn"}>
          Sing In
        </button>
      </form>
    </div>
  );
};

export default login;
