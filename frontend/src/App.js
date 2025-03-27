import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./components/Home.jsx";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails.jsx";
import Login from "./components/auth/Login.jsx";
import RegisterUser from "./components/auth/RegisterUser.jsx";
import Profile from "./components/user/Profile.jsx";
import UpdateUserProfile from "./components/user/UpdateUserProfile.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import UploadAvatar from "./components/user/UploadAvatar.jsx";
import UpdatePassword from "./components/user/UpdatePassword.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import Cart from "./components/cart/Cart.jsx";
import Shipping from "./components/cart/Shipping.jsx";
import CartSync from "./components/layout/CartSync.js";
import CartLoader from "./components/layout/CartLoader.js";
import ConfirmOrder from "./components/cart/ConfirmOrder.jsx";
import PaymentMethod from "./components/cart/PaymentMethod.jsx";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation(); // Get the current URL path
  const hideHeader = location.pathname === "/register"; // Only hide Header on Register page

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />

      <CartLoader />
      <CartSync />
      {/* ✅ Load cart from localStorage on login */}

      {/* Show Header except on Register page */}
      {!hideHeader && <Header />}

      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/password/update" element={<ForgotPassword />} />

          <Route
            path="/me/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/me/update_profile"
            element={
              <ProtectedRoute>
                {" "}
                <UpdateUserProfile />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/upload_avatar"
            element={
              <ProtectedRoute>
                {" "}
                <UploadAvatar />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/me/update_password"
            element={
              <ProtectedRoute>
                {" "}
                <UpdatePassword />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                {" "}
                <Shipping />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/confirm_order"
            element={
              <ProtectedRoute>
                {" "}
                <ConfirmOrder />{" "}
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment_method"
            element={
              <ProtectedRoute>
                {" "}
                <PaymentMethod />{" "}
              </ProtectedRoute>
            }
          />
          {/* A ProtectedRoute (also called a Private Route) is a route in your React app that requires the user to be authenticated (logged in) before they can access it. */}
        </Routes>
      </div>

      {/* Footer should always be visible */}
      <Footer />
    </div>
  );
}
export default App;
