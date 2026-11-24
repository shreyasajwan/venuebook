import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Venues from "./pages/Venues";
import VenueDetails from "./pages/VenueDetails";
import Booking from "./pages/Booking";
import Gallery from "./pages/Gallery";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./pages/admin/Bookings";
import GalleryManager from "./pages/admin/GalleryManager";
import VenuesManager from "./pages/admin/VenuesManager";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        const t = setTimeout(tryScroll, 100);
        return () => clearTimeout(t);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="gallery" element={<GalleryManager />} />
            <Route path="venues" element={<VenuesManager />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
