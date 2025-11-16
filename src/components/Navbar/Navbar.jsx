import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
  <nav className="navbar" ref={navRef}>
      <div className="nav-logo">Go Rental</div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/mybookings">My Bookings</Link></li>
        <li><Link to="/profile">Profile</Link></li>

        {user ? (
          <li onClick={() => { setMenuOpen(false); logout(); }} className="logout-btn">Logout</li>
        ) : (
          <li><Link to="/login">Login </Link></li>
        )}
      </ul>

      <button
        className="hamburger"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={(e) => { e.stopPropagation(); setMenuOpen((s) => !s); }}
      >
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
};

export default Navbar;
