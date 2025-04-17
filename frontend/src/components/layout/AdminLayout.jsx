import React from "react";
import SidebarMenu from "../layout/SidebarMenu";

// Admin Dashboard Layout
const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "New Product",
      url: "/admin/product/new",
      icon: "fas fa-plus",
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Order",
      url: "/admin/orders",
      icon: "fas fa-receipt",
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fas fa-user",
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: "fas fa-star",
    },
  ];

  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">📊 Admin Dashboard</h2>
      </div>

      <div className="container">
        <div className="row justify-content-round">
          <div className="col-12 col-lg-3">
            <SidebarMenu menuItems={menuItems} /> {/* ✅ Fixed here */}
          </div>
          <div className="col-12 col-lg-8 user-dasboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
