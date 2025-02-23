import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_url: process.env.CLOUDINARY_URL,
});

// Function to upload images to Cloudinary
export const upload_file = async (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto", folder },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          console.log("Cloudinary Upload Success:", result);
          resolve({
            public_id: result.public_id,
            url: result.secure_url, // Ensure secure_url is used
          });
        }
      }
    );
  });
};

// Function to delete a file from Cloudinary
export const delete_file = async (public_id) => {
  try {
    const res = await cloudinary.uploader.destroy(public_id);

    // Checking the response to confirm successful deletion
    if (res?.result === "ok") {
      return true;
    } else {
      throw new Error("Failed to delete file from Cloudinary");
    }
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    return false;
  }
};
