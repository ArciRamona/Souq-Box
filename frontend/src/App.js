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
        </Routes>
      </div>

      {/* Footer should always be visible */}
      <Footer />
    </div>
  );
}
export default App;
