
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import "./App.css";
import Home from "./components/Home.jsx";


function App() {
  return (
    <div className="App">
    <Header/>
    <div className="container">
    <Home />
    </div>
  
    <Footer/>
   
    </div>
  );
}

export default App;
