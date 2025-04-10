import React from "react";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <>
      <MetaData title="Order Successful" />
      <div className="container text-center py-5">
        <h1 className="text-success mb-4">🎉 Payment Successful!</h1>
        <p className="lead">
          Thank you for your order. Your payment was successful, and we’re
          preparing your items.
        </p>
        <Link to="/orders/me?order_success=true" className="btn btn-primary">
          View My Orders
        </Link>
      </div>
    </>
  );
};

export default OrderSuccess;
