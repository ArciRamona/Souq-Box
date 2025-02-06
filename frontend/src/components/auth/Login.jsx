/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./Login.css";
import { useLoginMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error, data }] = useLoginMutation();

  console.log(data);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };
    login(loginData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img
            src="/images/SouqBoxITLogo.png"
            alt="SouBox Logo"
            className="logo"
          />
        </div>
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email or mobile phone number</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
            placeholder="Enter your email or phone number"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
            placeholder="Enter your password"
          />

          <a href="#" className="forgot-password">
            Forgot your password?
          </a>

          <button type="submit" className="sign-in-btn" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="terms-text">
          By continuing, you agree to SouqBox's
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
          <p>New to SouqBox?</p>

          <button className="create-account-btn">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Create your SouqBox account
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
