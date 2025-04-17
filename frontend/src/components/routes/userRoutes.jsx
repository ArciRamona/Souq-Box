// src/components/routes/userRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";

import Home from "../Home";
import ProductDetails from "../product/ProductDetails";
import Login from "../auth/Login";
import RegisterUser from "../auth/RegisterUser";
import Profile from "../user/Profile";
import UpdateUserProfile from "../user/UpdateUserProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import UploadAvatar from "../user/UploadAvatar";
import UpdatePassword from "../user/UpdatePassword";
import ForgotPassword from "../auth/ForgotPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";
import OrderSuccess from "../order/OrderSuccess";
import MyOrders from "../order/MyOrders";
import OrderDetails from "../order/OrderDetails";
import Invoice from "../invoice/invoice.jsx";

const userRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="product" path="/product/:id" element={<ProductDetails />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<RegisterUser />} />,
  <Route key="forgot" path="/password/update" element={<ForgotPassword />} />,

  <Route
    key="profile"
    path="/me/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />,
  <Route
    key="updateProfile"
    path="/me/update_profile"
    element={
      <ProtectedRoute>
        <UpdateUserProfile />
      </ProtectedRoute>
    }
  />,
  <Route
    key="uploadAvatar"
    path="/me/upload_avatar"
    element={
      <ProtectedRoute>
        <UploadAvatar />
      </ProtectedRoute>
    }
  />,
  <Route
    key="updatePassword"
    path="/me/update_password"
    element={
      <ProtectedRoute>
        <UpdatePassword />
      </ProtectedRoute>
    }
  />,
  <Route
    key="cart"
    path="/cart"
    element={
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    }
  />,
  <Route
    key="shipping"
    path="/shipping"
    element={
      <ProtectedRoute>
        <Shipping />
      </ProtectedRoute>
    }
  />,
  <Route
    key="confirmOrder"
    path="/confirm_order"
    element={
      <ProtectedRoute>
        <ConfirmOrder />
      </ProtectedRoute>
    }
  />,
  <Route
    key="paymentMethod"
    path="/payment_method"
    element={
      <ProtectedRoute>
        <PaymentMethod />
      </ProtectedRoute>
    }
  />,
  <Route key="orderSuccess" path="/me/orders" element={<OrderSuccess />} />,
  <Route
    key="myOrders"
    path="/orders/me"
    element={
      <ProtectedRoute>
        <MyOrders />
      </ProtectedRoute>
    }
  />,
  <Route
    key="orderDetails"
    path="/me/orders/:id"
    element={
      <ProtectedRoute>
        <OrderDetails />
      </ProtectedRoute>
    }
  />,
  <Route
    key="invoice"
    path="/invoice/orders/:id"
    element={
      <ProtectedRoute>
        <Invoice />
      </ProtectedRoute>
    }
  />,
];

export default userRoutes;
