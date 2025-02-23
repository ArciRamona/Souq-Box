import { useState, useEffect } from "react";
import React from "react";
import UserLayout from "../layout/UserLayout";
import { useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadAvatar = () => {
  const { user } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar ? user.avatar.url : "/images/default_avatar.jpg"
  );

  const navigate = useNavigate();
  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to upload avatar");
    }
    if (isSuccess) {
      toast.success("Avatar uploaded successfully");
      navigate("/me/profile");
    }
  }, [error, isSuccess, navigate]);

  // 🟢 Handle File Selection
  const onChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        return toast.error("Please select a valid image file");
      }

      if (file.size > 2 * 1024 * 1024) {
        return toast.error("File size must be under 2MB");
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      setAvatar(file);
    }
  };

  // 🟢 Handle Avatar Upload
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!avatar) {
      return toast.error("Please select an avatar to upload.");
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    console.log("Uploading avatar..."); // ✅ Check if this logs
    console.log("FormData contains:", formData.get("avatar")); // ✅ Check if this logs the correct file

    try {
      const response = await uploadAvatar(formData).unwrap();
      console.log("Upload Response:", response); // ✅ Debug the response

      if (response.url) {
        toast.success(response.message || "Avatar uploaded successfully");
        navigate("/me/profile");
      } else {
        toast.error("Upload failed. No URL returned.");
        console.error("No URL in response:", response);
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error(err?.data?.message || "Failed to upload avatar");
    }
  };

  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body p-4" onSubmit={submitHandler}>
            <h2 className="mb-4 text-center ">Upload Avatar</h2>

            <div className="mb-3 text-center">
              <figure className="avatar item-rtl">
                <img
                  src={avatarPreview}
                  className="rounded-circle"
                  alt="avatar"
                  width={240}
                  height={240}
                  style={{ objectFit: "cover", border: "3px solid #ccc" }}
                />
              </figure>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="avatarUpload">
                Choose Avatar (Max: 2MB)
              </label>
              <input
                type="file"
                name="avatar"
                className="form-control"
                id="avatarUpload"
                accept="image/*"
                onChange={onChange}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-2"
              style={{ backgroundColor: "#f90", color: "white" }}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload Avatar"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UploadAvatar;
