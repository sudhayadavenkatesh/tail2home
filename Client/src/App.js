import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import Services from "./Components/Services/Services";
import Contact from "./Components/Contact/Contact";
import Pets from "./Components/Pets/Pets";
import EmergencyPopup from "./Components/EmergencyPopup/EmergencyPopup"; // ✅ Import EmergencyPopup
import AdoptForm from "./Components/AdoptForm/AdoptForm";
import AdminLogin from "./Components/AdminPanel/AdminLogin";
import Profile from "./Components/Profile/Profile";
import Auth from "./Components/Auth/Auth";
import PetCareResources from "./Components/pages/PetCareResources";
import Blogs from "./Components/pages/Blogs"; // ✅ Import Blogs Page
import BlogDetail from "./Components/pages/BlogDetail"; // ✅ Import BlogDetail Page
import { useAuthContext } from './hooks/UseAuthContext';
import "./App.css";
import FourOhFourPage from "./Components/404/FourOhFourPage";

const Layout = ({ children }) => (
  <>
    <Navbar title="PawFinds" />
    <EmergencyPopup /> {/* ✅ Emergency Popup added to appear on all pages */}
    {children}
    <Footer title="PawFinds" />
  </>
);

const ProtectedRoute = ({ user, children }) => {
  return user ? children : <Navigate to="/auth" />;
};

const App = () => {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute user={user}><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute user={user}><Layout><Services /></Layout></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute user={user}><Layout><Contact /></Layout></ProtectedRoute>} />
        <Route path="/pets" element={<ProtectedRoute user={user}><Layout><Pets /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute user={user}><Layout><Profile /></Layout></ProtectedRoute>} />
        <Route path="/adopt-form" element={<ProtectedRoute user={user}><Layout><AdoptForm /></Layout></ProtectedRoute>} />
        <Route path="/pet-care-resources" element={<Layout><PetCareResources /></Layout>} />
        <Route path="/blogs" element={<Layout><Blogs /></Layout>} /> {/* ✅ Blogs Page Route */}
        <Route path="/blog/:id" element={<Layout><BlogDetail /></Layout>} /> {/* ✅ Blog Detail Page Route */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/" />} />
        <Route path="/*" element={<FourOhFourPage />} />
      </Routes>
    </Router>
  );
};

export default App;
