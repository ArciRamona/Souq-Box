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

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation(); // Get the current URL path
  const hideHeaderFooter = location.pathname === "/login"; // Hide Header & Footer on login page

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Show Header only if not on login page */}
      {!hideHeaderFooter && <Header />}

      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>

      {/* Show Footer only if not on login page */}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
