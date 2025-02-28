import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./images/logo.png";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/UseAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="navbar-container">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="PawFinds Logo" />
          <p>Tail<span className="highlighted-two">2</span>Home 🐾</p>
        </Link>
      </div>
      <div>
        <ul className="navbar-links">
          <li><Link to="/" className={isActive("/")}>Home</Link></li>
          <li><Link to="/services" className={isActive("/services")}>Services</Link></li>
          <li><Link to="/pets" className={isActive("/pets")}>Pets</Link></li>
          <li><Link to="/profile" className={isActive("/profile")}>Profile</Link></li>
          <li><Link to="/blogs" className={isActive("/blogs")}>Blog</Link></li>
          <li><Link to="/pet-care-resources" className={isActive("/pet-care-resources")}>Pet Care</Link></li>
          <li><Link to="/contact" className={isActive("/contact")}>Contact</Link></li> {/* New Contact Section */}
        </ul>
      </div>
      <div className="logout-username">
        <p>Welcome {user?.userName}!</p>
        <button onClick={handleLogout} className="Navbar-button">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
