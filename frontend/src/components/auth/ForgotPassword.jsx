import React, { useState, useEffect } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLayout from "../layout/UserLayout";
import { Link } from "react-router-dom";
import "./ForgotPassword.css"; // Create a CSS file for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] =
    useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Email sent! Please check your email.");
      navigate("/login");
    }
  }, [error, isSuccess, navigate, isAuthenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    forgotPassword({ email });
  };

  return (
    <UserLayout>
      <div className="forgot-password-container">
        <div className="forgot-password-box">
          <div className="logo-container">
            <img
              src="/images/AmazonLogo.png"
              alt="Amazon Logo"
              className="logo"
            />
          </div>

          <h2>Password Assistance</h2>
          <p>Enter your email or mobile phone number to reset your password.</p>

          <form className="forgot-password-form" onSubmit={submitHandler}>
            <label htmlFor="email_field" className="form-label">
              Email or mobile phone number
            </label>
            <input
              type="email"
              id="email_field"
              className="input-field"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="reset-password-btn"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </form>

          <div className="help-links">
            <Link to="/login">Back to Sign-In</Link>
            <Link to="/register">Create your account</Link>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ForgotPassword;
