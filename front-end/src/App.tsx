import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/navbar";
import "./App.css";
import Home from "./pages/home";
import Service from "./pages/service";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="w-full overflow-visible">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Service />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
