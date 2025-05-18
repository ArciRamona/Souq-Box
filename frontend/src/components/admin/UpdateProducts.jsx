import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { PRODUCT_CATEGORIES } from "../../constants/constans";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
} from "../../redux/api/productsApi";

const UpdateProuct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });

  const { name, description, price, category, stock, seller } = product;

  const [updateProduct, { isLoading, error, isSuccess }] =
    useUpdateProductMutation();

  const { data } = useGetProductDetailsQuery(params.id);

  useEffect(() => {
    if (data?.product) {
      setProduct({
        name: data?.product?.name,
        description: data?.product?.description,
        price: data?.product?.price,
        category: data?.product?.category,
        stock: data?.product?.stock,
        seller: data?.product?.seller,
      });
    }

    if (error) {
      toast.error(error?.data?.message || "Failed to create product");
    }

    if (isSuccess) {
      toast.success("Update Product successfully");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate, setProduct, data]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("🧾 Submitting:", product);

    // Check for required values before submitting
    if (!name || !price || !description || !category || !stock || !seller) {
      toast.error("All fields are required");
      return;
    }

    updateProduct({ id: params?.id, body: product });
  };

  return (
    <AdminLayout>
      <MetaData title="Update Product" />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm p-4">
              <h3 className="mb-4 text-center">🛍️ Add New Product</h3>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label">Update Product</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="e.g., Wireless Headphones"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={description}
                    onChange={onChange}
                    rows="5"
                    placeholder="Describe the product"
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Price (SAR)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={price}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      name="stock"
                      value={stock}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={category}
                      onChange={onChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Seller Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="seller"
                      value={seller}
                      onChange={onChange}
                      placeholder="Your company or supplier name"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 "
                  style={{ backgroundColor: "#f90", border: "none" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Product Updated"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateProuct;
