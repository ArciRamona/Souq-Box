import { useEffect } from "react";
// import { useSelector } from "react-redux";
import React from "react";
// import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../../redux/api/orderApi.js";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";
import Loader from "../layout/Loader.jsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice.js";
import { useSelector } from "react-redux";

const MyOrders = () => {
  //   const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMyOrdersQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const orderSuccess = searchParams.get("order_success");

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

  const { user } = useSelector((state) => state.auth); // Access current user

  useEffect(() => {
    if (orderSuccess === "true") {
      dispatch(clearCart());
      localStorage.removeItem("cartItems");
      if (user?._id) localStorage.removeItem(`cartItems_${user._id}`);
      toast.success("🛒 Cart cleared after order");
      navigate("/orders/me", { replace: true }); // ✅ Clear the param after
    }
  }, [orderSuccess, dispatch, navigate, user?._id]);

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
                  <td>
                    <Link
                      to={`/me/orders/${order._id}`}
                      className="btn btn-primary btn-sm me-2"
                      title="View Order"
                    >
                      <i className="fa fa-eye"></i>
                    </Link>

                    <Link
                      to={`/invoice/order/${order._id}`}
                      className="btn btn-success btn-sm"
                      title="Download Invoice"
                    >
                      <i className="fa fa-download"></i>
                    </Link>
                  </td>
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
