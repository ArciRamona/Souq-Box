
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import "./App.css";
import Home from "./components/Home.jsx";

import { BrowserRouter as Router, Routes } from 'react-router-dom'


function App() {
  return (
    <Router>
    <div className="App">
    <Header/>
    <div className="container">
      <Routes>
    <Home />
    </Routes>
    </div>
  
    <Footer/>
   
    </div>
    </Router>
  );
}

export default App;
