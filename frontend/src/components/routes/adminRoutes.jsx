// src/components/routes/adminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

import AdminDashboard from "../admin/Dashboard";
import AdminProducts from "../admin/Products";
import ListProducts from "../admin/ListProducts";
import UploadProductImages from "../admin/UploadProductImages.jsx";
import NewProduct from "../admin/NewProduct.jsx";

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
    key="admin-products-panel"
    path="/admin/products-panel"
    element={
      <ProtectedRoute adminOnly={true}>
        <AdminProducts />
      </ProtectedRoute>
    }
  />,

  <Route
    key="list-products"
    path="/admin/products"
    element={
      <ProtectedRoute adminOnly={true}>
        <ListProducts />
      </ProtectedRoute>
    }
  />,

  <Route
    key="upload-images"
    path="/admin/products/:id/upload_images"
    element={
      <ProtectedRoute adminOnly={true}>
        <UploadProductImages />
      </ProtectedRoute>
    }
  />,

  <Route
    path="/admin/product/new"
    element={
      <ProtectedRoute adminOnly={true}>
        <NewProduct />
      </ProtectedRoute>
    }
  />,
];

export default adminRoutes;
