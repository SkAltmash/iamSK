import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  const linkClasses = ({ isActive }) =>
    `transition-colors ${
      isActive ? "text-[#00ffff]" : "text-white hover:text-[#00ffff]"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md">
      <div className="max-w-[600px] mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold">
          <img
            src="logo.png"
            alt="Logo"
            className="h-20 w-20 transition-transform duration-700 hover:rotate-[360deg]"
          />
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6 text-sm sm:text-base">
          <NavLink to="/" className={linkClasses}>Home</NavLink>
          <NavLink to="/about" className={linkClasses}>About</NavLink>
          <NavLink to="/projects" className={linkClasses}>Projects</NavLink>
          <NavLink to="/contact" className={linkClasses}>Contact</NavLink>

          {/* Portfolio Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowPortfolio(true)}
            onMouseLeave={() => setShowPortfolio(false)}
          >
            <button className="flex items-center gap-1 text-white hover:text-[#00ffff] transition">
              V3 <FaChevronDown size={12} />
            </button>

            {showPortfolio && (
              <div className="absolute right-0  w-44 bg-[#111] border border-gray-800 rounded-lg shadow-lg overflow-hidden">
              

                <a
                  href="https://skaltamashportfolio.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-[#00ffff] hover:text-black transition"
                >
                  Portfolio V2
                </a>

                  <a
                  href="https://skaltmash.github.io/plortfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 text-sm text-gray-300 hover:bg-[#00ffff] hover:text-black transition"
                >
                  Portfolio V1
                </a>
              </div>
            )}
          </div>
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
          <div className="max-w-[600px] mx-auto flex flex-col items-center py-6 space-y-4">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={linkClasses}>Home</NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={linkClasses}>About</NavLink>
            <NavLink to="/projects" onClick={() => setIsOpen(false)} className={linkClasses}>Projects</NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className={linkClasses}>Contact</NavLink>

            {/* Mobile Portfolio Links */}
            <div className="w-full border-t border-gray-800 pt-4 text-center space-y-3">
             
              <a
                href="https://skaltamashportfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-[#00ffff]"
              >
                Portfolio V2
              </a>

               <a
                href="https://skaltmash.github.io/plortfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-[#00ffff]"
              >
                Portfolio V1
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
