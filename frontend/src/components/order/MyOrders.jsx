import { useEffect } from "react";
// import { useSelector } from "react-redux";
import React from "react";
// import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../redux/api/orderApi.js";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import Loader from "../layout/Loader.jsx";

const MyOrders = () => {
  //   const { user } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    console.log("🧾 Orders data from API:", data); // Add this
  }, [data]);
  useEffect(() => {
    console.log("🧾 Orders data from API:", data);
    console.log("❗️Error:", error);
  }, [data, error]);

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
      <MetaData title="My Orders" />
      <div className="container py-5">
        <h2 className="mb-4">{data?.orders?.length} Orders</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Status</th>
                <th>Total</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.orderItems.length}</td>
                  <td>{order.orderStatus}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>{order.paymentInfo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default MyOrders;
