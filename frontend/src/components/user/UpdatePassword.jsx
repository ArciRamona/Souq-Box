import { useState, useEffect } from "react";
import React from "react";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to update password");
    }
    if (isSuccess) {
      toast.success("Password updated successfully");
      navigate("/me/profile");
    }
  }, [error, isSuccess, navigate]);

  // Handle Form Submission
  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    const userData = {
      oldPassword,
      password: newPassword,
    };

    updatePassword(userData);
  };

  return (
    <>
      <MetaData title={"Update Password"} />
      <UserLayout>
        <div className="row wrapper">
          <div className="col-10 col-lg-8">
            <form
              className="shadow rounded bg-body p-4"
              onSubmit={submitHandler}
            >
              <h2 className="mb-4 text-center">Update Password</h2>

              <div className="mb-3">
                <label className="form-label" htmlFor="oldPassword">
                  Current Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="newPassword">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn w-100 py-2"
                style={{ backgroundColor: "#f90", color: "white" }}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default UpdatePassword;
