/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import React from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import "./RegisterUser.css"; // Ensure this CSS file matches Login.css
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const RegisterUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { name, email, password, phone, confirmPassword } = user;
  const [register, { isLoading, error, data }] = useRegisterMutation();

  console.log(data);

  const { isAuthenticated } = useSelector((state) => state.auth);

  console.log(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isAuthenticated, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const signUpData = { name, email, password, phone, confirmPassword };
    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <MetaData title={"Register"} />
      <div className="register-container">
        <div className="register-box">
          <div className="logo-container">
            <img
              src="/images/SouqBoxITLogo.png"
              alt="SouqBox Logo"
              className="logo"
            />
          </div>
          <h2>Create account</h2>
          <form onSubmit={submitHandler}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              className="input-field"
              placeholder="First and last name"
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="input-field"
              placeholder="Enter your email"
            />

            <label htmlFor="email">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              required
              className="input-field"
              placeholder="Enter your phone number"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              className="input-field"
              placeholder="At least 6 characters"
            />

            <label htmlFor="confirmPassword">Re-enter password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              required
              className="input-field"
            />

            <button type="submit" className="register-btn" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create your SouqBox account"}
            </button>
          </form>

          <p className="terms-text">
            By creating an account, you agree to SouqBox's
            <a href="#" className="terms-link">
              {" "}
              Conditions of Use{" "}
            </a>
            and
            <a href="#" className="terms-link">
              {" "}
              Privacy Notice
            </a>
            .
          </p>

          <div className="divider"></div>

          <div className="new-account">
            <p>Already have an account?</p>
            <button
              className="sign-in-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterUser;

// Pulled the name, email and password from the user.
// Simply use this submit handler that will pass the name, email and the password to the backend righ there in the register signUpData.
// Then onChange we will set the user
