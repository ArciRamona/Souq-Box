import React from "react";
import { Link } from "react-router-dom";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className="checkout-progress">
      {shipping ? (
        <Link to="/shipping" className="step-wrapper">
          <div className="triangle2-active"></div>
          <div className="step active-step" style={{ color: "white" }}>
            Shipping
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" className="step-wrapper" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Shipping</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/payment_method" className="step-wrapper">
          <div className="triangle2-active"></div>
          <div className="step active-step" style={{ color: "white" }}>
            Confirm Order
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" className="step-wrapper" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirm Order</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
      {payment ? (
        <Link to="/payment_method" className="step-wrapper">
          <div className="triangle2-active"></div>
          <div className="step active-step" style={{ color: "white" }}>
            Payment
          </div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" className="step-wrapper" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Payment</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
