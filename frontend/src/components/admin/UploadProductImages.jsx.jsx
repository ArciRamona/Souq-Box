import React, { useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import toast from "react-hot-toast";

const UploadProductImages = () => {
  const { id: productId } = useParams();
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleUpload = async () => {
    if (images.length === 0) return toast.error("No images selected");
    setUploading(true);

    try {
      const formData = new FormData();
      images.forEach((image) => formData.append("images", image));

      // const {} = await axios.put(
      //   `/api/v1/admin/products/${productId}/upload_images`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       // Add Authorization if needed:
      //       // Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Upload Images for Product #{productId}</h2>

      <input
        type="file"
        multiple
        accept="image/*"
        className="form-control mb-3"
        onChange={handleImageChange}
      />

      <button
        className="btn btn-success"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>

      {images.length > 0 && (
        <div className="mt-4">
          <h5>Preview:</h5>
          <div className="d-flex flex-wrap gap-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(img)}
                alt="preview"
                height="100"
                className="border rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProductImages;
