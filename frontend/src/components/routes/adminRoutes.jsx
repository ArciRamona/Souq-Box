// src/components/routes/adminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

import AdminDashboard from "../admin/Dashboard";
import AdminProducts from "../admin/Products";

const adminRoutes = [
  <Route
    key="admin-dashboard"
    path="/admin/dashboard"
    element={
      <ProtectedRoute adminOnly={true}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />,
  <Route
    key="admin-products"
    path="/admin/products"
    element={
      <ProtectedRoute adminOnly={true}>
        <AdminProducts />
      </ProtectedRoute>
    }
  />,
];

export default adminRoutes;
