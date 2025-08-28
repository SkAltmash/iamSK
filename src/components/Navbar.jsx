import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `transition-colors ${
      isActive ? "text-[#00ffff]" : "text-white hover:text-[#00ffff]"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md">
      <div className="max-w-[600px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold" style={{ color: "#00ffff" }}>
          <img
            src="logo.png"
            alt="Logo"
            className="h-10 w-10 transform transition-transform duration-700 hover:rotate-[360deg]"
          />
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
          <NavLink to="/" className={linkClasses}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClasses}>
            About
          </NavLink>
          <NavLink to="/projects" className={linkClasses}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={linkClasses}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-black border-t border-gray-800">
          <div className="max-w-[600px] mx-auto flex flex-col items-center py-4 space-y-4">
            <NavLink to="/" className={linkClasses} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClasses} onClick={() => setIsOpen(false)}>
              About
            </NavLink>
            <NavLink to="/projects" className={linkClasses} onClick={() => setIsOpen(false)}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={linkClasses} onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
