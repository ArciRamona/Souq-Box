import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarMenu = ({ menuItems }) => {
  const location = useLocation();

  const [activeMenuItem, setActiveMenuItem] = useState(
    location?.pathname || ""
  );

  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem.url);
  };

  return (
    <div className="list-group mt-5 pl-4">
      {menuItems?.map((menuItem, index) => (
        <Link
          key={index}
          to={menuItem.url}
          href="menu-item-url-1"
          className={`fw-bold list-group-item list-group-item-action ${activeMenuItem && activeMenuItem.includes(menuItem.url) ? "active" : ""} `}
          onClick={() => handleMenuItemClick(menuItem.url)}
          aria-current={
            activeMenuItem && activeMenuItem.includes(menuItem.url)
              ? "false"
              : ""
          }
        >
          <i className={`${menuItem.icon} fa-fw pe-2`}></i> {menuItem.name}
        </Link>
      ))}
    </div>
  );
};

export default SidebarMenu;
