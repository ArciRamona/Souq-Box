import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { PRODUCT_CATEGORIES } from "../../constants/constans";
import { useCreateProductMutation } from "../../redux/api/productsApi";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });

  const { name, description, price, category, stock, seller } = product;

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Failed to create product");
    }

    if (isSuccess) {
      toast.success("✅ Product created successfully");
      navigate("/admin/products");
    }
  }, [error, isSuccess, navigate]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <AdminLayout>
      <MetaData title="Create New Product" />
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm p-4">
              <h3 className="mb-4 text-center">🛍️ Add New Product</h3>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
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
                  {isLoading ? "Creating..." : "Create Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
