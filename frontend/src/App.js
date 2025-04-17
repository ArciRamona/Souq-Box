import React from "react";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Cart Syncing + Auth
import AuthLoader from "./components/auth/AuthoLoader.jsx";
import CartLoader from "./components/layout/CartLoader.js";
import CartSync from "./components/layout/CartSync.js";

// React Router
import { BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

// Routes

import adminRoutes from "./components/routes/adminRoutes.jsx";
import userRoutes from "./components/routes/userRoutes";

// ✅ 👇 This wraps MainContent inside App
function App() {
  return (
    <Router>
      <AuthLoader />
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  const hideHeader = location.pathname === "/register";

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <CartLoader />
      <CartSync />
      {!hideHeader && <Header />}

      <div className="container">
        <Routes>
          {userRoutes}
          {adminRoutes}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
