import React from "react";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../redux/api/authApi";
import { logoutSuccess } from "../../redux/features/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const { isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart); // ✅ Define cartItems before using it

  // ✅ Fix: Calculate total quantity after defining cartItems
  const totalCartItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutSuccess());
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img
              src="/images/SouqBoxITLogo.png"
              alt="SouqBoxITLogo"
              style={{ width: "9rem" }}
            />
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {/* Cart Icon with Badge */}
        <Link
          to="/cart"
          style={{
            color: "#f90",
            textDecoration: "none",
            position: "relative",
            display: "inline-block",
          }}
        >
          <i
            className="fas fa-shopping-cart fa-lg"
            style={{ position: "relative", fontSize: "1.8rem" }}
          >
            {totalCartItems > 0 && ( // Show badge only if cart has items
              <span
                className="badge bg-white"
                id="cart_count"
                style={{
                  position: "absolute",
                  top: "-29px",
                  right: "-17px",
                  fontSize: "12px",
                  padding: "4px 4.5px",
                  borderRadius: "50%",
                  minWidth: "15px",
                  minHeight: "15px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#f90",
                }}
              >
                {totalCartItems} {/* ✅ Fix: Display total quantity */}
              </span>
            )}
          </i>
          <span id="cart" className="ms-2">
            Cart
          </span>
        </Link>

        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src={
                    user?.avatar
                      ? user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            <div
              className="dropdown-menu w-100"
              aria-labelledby="dropDownMenuButton"
            >
              <Link className="dropdown-item" to="/admin/dashboard">
                Dashboard
              </Link>
              <Link className="dropdown-item" to="/me/orders">
                Orders
              </Link>
              <Link className="dropdown-item" to="/me/profile">
                Profile
              </Link>
              <Link
                className="dropdown-item text-danger"
                to="/"
                onClick={logoutHandler}
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Header;
