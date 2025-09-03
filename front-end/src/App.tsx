import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import "./App.css";
import Home from "./pages/home";
import Service from "./pages/service";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import YourMove from "./pages/yourMove";

function App() {
  return (
    <Router>
      <div className="w-full overflow-visible">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Service />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/your-move" element={<YourMove />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
