import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../../components/layout/UserLayout";
import { useGetMeQuery } from "../../redux/api/userApi";
const UpdateUserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const navigate = useNavigate();
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();

  useEffect(() => {
    if (user && !isSuccess) {
      // Prevent resetting state after update
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.phone || "");
      setAddress(user?.address || "");
      setAvatarPreview(user?.avatar?.url || "/images/default_avatar.jpg");
    }
  }, [user, isSuccess]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const { refetch } = useGetMeQuery(); // Get the refetch function from the user query

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      if (password) formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      await updateProfile(formData).unwrap();

      toast.success("Profile updated successfully");
      await refetch(); // Manually refetch user data
      navigate("/me/profile");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body p-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="mb-4">Update Profile</h2>

            {/* Profile Picture */}
            <div className="mb-3 text-center">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="img-fluid rounded-circle"
                width="120"
              />
              <input
                type="file"
                className="form-control mt-2"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                {" "}
                Phone{" "}
              </label>
              <input
                type="text"
                id="phone_field"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                {" "}
                Address{" "}
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password_field" className="form-label">
                {" "}
                New Password{" "}
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: "#f90", color: "white" }}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateUserProfile;
