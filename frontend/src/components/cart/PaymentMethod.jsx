import React, { useEffect, useState } from "react"; // ✅ ADDED useState for tracking selected method
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helpers";
import { useCreateNewOrderMutation } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useStripeCheckoutSessionMutation } from "../../redux/api/orderApi";

const PaymentMethod = () => {
  // ✅ STATE: To manage selected radio button
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart); // We can get our shipping and cartItems info from the useSelector

  const [createNewOrder, { isLoading, error, isSuccess }] =
    useCreateNewOrderMutation();

  const [stripeCheckoutSession, { data: checkoutData, error: checkoutError }] =
    useStripeCheckoutSessionMutation();

  useEffect(() => {
    if (checkoutData) {
      console.log(checkoutData);

      navigate(checkoutData?.url);
    }

    if (checkoutError) {
      toast.error(checkoutError?.data?.message || "Stripe checkout failed");
    }
  }, [checkoutData, checkoutError, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/");
    }
  }, [error, isSuccess, navigate, isLoading]);

  // ✅ FORM SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
      calculateOrderCost(cartItems);

    const orderItems = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      product: item.id || item._id, // Make sure this is the actual product ID
    }));

    if (paymentMethod === "COD") {
      // Create COD Order
      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Not Paid",
        },
        paymentMethod: "COD",
      };
      createNewOrder(orderData);
    }
    if (paymentMethod === "Card") {
      // Stripe checkout
      const orderData = {
        shippingInfo,
        orderItems,
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      };
      stripeCheckoutSession(orderData);
    }

    if (paymentMethod === "PayPal") {
      // Stripe Payment
      alert("PayPal");
    }

    // You can dispatch/save paymentMethod here if using Redux
    console.log("Selected Payment Method:", paymentMethod);
  };

  return (
    <>
      <MetaData title="Payment Method" />
      <CheckoutSteps shipping confirmOrder payment />

      {/* ✅ CENTERED LAYOUT: Added vertical and horizontal alignment */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }} // ✅ Makes sure the form is vertically centered
      >
        {/* ✅ RESPONSIVE WRAPPER: Adjusted width on various screen sizes */}
        <div className="col-12 col-md-6 col-lg-5">
          {/* ✅ ADDED p-4 FOR PADDING */}
          <form className="shadow rounded bg-body p-4" onSubmit={submitHandler}>
            {/* ✅ CENTERED TITLE */}
            <h2 className="mb-4 text-center">Select Payment Method</h2>

            {/* ✅ RADIO BUTTON - Cash on Delivery */}
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                checked={paymentMethod === "COD"} // ✅ Binds to state
                onChange={(e) => setPaymentMethod(e.target.value)} // ✅ Updates state
              />
              <label className="form-check-label ms-2" htmlFor="codradio">
                Cash on Delivery{" "}
                <i className="fas fa-truck ms-1 text-muted"></i>
              </label>
            </div>

            {/* ✅ RADIO BUTTON - Card */}
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                checked={paymentMethod === "Card"} // ✅ Binds to state
                onChange={(e) => setPaymentMethod(e.target.value)} // ✅ Updates state
              />
              <label className="form-check-label ms-2" htmlFor="cardradio">
                Card - VISA, MasterCard{" "}
                <i className="fab fa-cc-visa text-primary me-1"></i>
                <i className="fab fa-cc-mastercard text-danger"></i>
              </label>
            </div>

            {/* ✅ PayPal Option */}
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="paypalradio"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label ms-2" htmlFor="paypalradio">
                PayPal <i className="fab fa-cc-paypal text-info ms-1"></i>
              </label>
            </div>

            {/* ✅ BUTTON STYLING */}
            <button
              id="payment_btn"
              type="submit"
              className="btn w-100 py-2"
              style={{ backgroundColor: "#f90", color: "#fff" }} // ✅ Styled to match your theme
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
// 1 stripe -> to routes paymentss.js
// Stripe Checkout Session, Tax & Shipping Rates
// Create stripe checkout session => /api/v1/payment/checkout_session

// ... means spread of shipping information
