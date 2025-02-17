import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload images to cloudinary
export const uploadToCloudinary = async (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.UploadStream.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      },
      {
        resource_type: "auto",
        folder,
      }
    );
  });
};

export const delete_file = async (file) => {
  const res = await cloudinary.uploader.destroy(file);

  if (res?.result === "ok") return true;
};
