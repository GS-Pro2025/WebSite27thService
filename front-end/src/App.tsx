import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/navbar";
import Loader from "./pages/Loader";
import "./App.css";

// Lazy loading de las páginas
const Home = lazy(() => import("./pages/home"));
const Service = lazy(() => import("./pages/service"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const YourMove = lazy(() => import("./pages/yourMove"));
const AboutUs = lazy(() => import("./pages/AboutUs"));

function App() {
  return (
    <Router>
      <div className="w-full overflow-visible">
        <Navbar />

        <Suspense fallback={<Loader message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Service />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/your-move" element={<YourMove />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
