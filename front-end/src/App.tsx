import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";
import Home from "./pages/home";
import Service from "./pages/service";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import YourMove from "./pages/yourMove";

function App() {
  return (
    
    <Router>
      <div className="w-full overflow-visible">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Service />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/your-move" element={<YourMove />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
