import { useEffect } from "react";
// import { useSelector } from "react-redux";
import React from "react";
// import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import Loader from "../layout/Loader.jsx";
import { Link } from "react-router-dom";
import { useGetAdminProductsQuery } from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout.jsx";

const ListProducts = () => {
  //   const { user } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetAdminProductsQuery();

  useEffect(() => {
    console.log("🧾 Orders data from API:", data); // Add this
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.data?.message || "Failed to fetch orders");
    }
  }, [error]);

  if (isLoading) return <Loader />;
  // if (!data?.orders?.length) {
  //   console.log("🚫 No orders found or data missing:", data);
  //   return <p>No orders found</p>;
  // }

  return (
    <>
      <MetaData title="All Products" />
      <AdminLayout>
        <div className="container py-5">
          <h2 className="mb-4">{data?.products?.length} Products</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link
                        to={`/admin/products/${product._id}`}
                        className="btn btn-outline-primary btn-sm me-2"
                        title="Edit Product"
                      >
                        <i className="fa fa-edit"></i>
                      </Link>
                      <Link
                        to={`/admin/products/${product._id}/upload_images`}
                        className="btn btn-outline-success btn-sm me-2"
                      >
                        <i className="fa fa-upload"></i>
                      </Link>
                      <button className="btn btn-outline-success btn-sm me-2">
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default ListProducts;
