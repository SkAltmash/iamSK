import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* 🔹 Scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClasses = ({ isActive }) =>
    `relative transition-colors ${
      isActive
        ? "text-cyan-400"
        : "text-white hover:text-cyan-400"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-black/80 backdrop-blur-md shadow-lg"
            : "bg-black"
        }`}
    >
      <div className="max-w-[900px] mx-auto flex items-center justify-between px-4 py-3">

        {/* 🔰 Logo */}
        <NavLink to="/home" className="flex items-center gap-2">
          <img
            src="logo.png"
            alt="Altamash Logo"
            className="h-14 w-14 transition-transform duration-700 hover:rotate-[360deg]"
          />
        </NavLink>

        {/* 🔹 Desktop Links */}
        <div className="hidden sm:flex items-center space-x-8 text-sm">
          {["/home", "/about", "/projects","/services",  "/contact" ,].map((path, i) => {
            const labels = ["Home", "About", "Projects","Services", "Contact"];
            return (
              <NavLink key={path} to={path} className={linkClasses}>
                {labels[i]}
              </NavLink>
            );
          })}

          {/* Portfolio Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowPortfolio(true)}
            onMouseLeave={() => setShowPortfolio(false)}
          >
            <button
              onClick={() => setShowPortfolio((p) => !p)}
              className="flex items-center gap-1 text-white hover:text-cyan-400 transition"
              aria-haspopup="true"
              aria-expanded={showPortfolio}
            >
              Versions <FaChevronDown size={12} />
            </button>

            <AnimatePresence>
              {showPortfolio && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-44 bg-[#111] border border-white/10 rounded-xl shadow-xl overflow-hidden"
                >
                  <DropdownLink
                    href="https://skaltamashportfolio.netlify.app/"
                    label="Portfolio V2"
                  />
                  <DropdownLink
                    href="https://skaltmash.github.io/plortfolio/"
                    label="Portfolio V1"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 🔹 Mobile Hamburger */}
        <button
          className="sm:hidden text-white"
          aria-label="Toggle Menu"
          onClick={() => setIsOpen((p) => !p)}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="max-w-[900px] mx-auto flex flex-col items-center py-6 space-y-5">
              {["/", "/about", "/projects", "/contact"].map((path, i) => {
                const labels = ["Home", "About", "Projects", "Contact"];
                return (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={linkClasses}
                  >
                    {labels[i]}
                  </NavLink>
                );
              })}

              <div className="w-full border-t border-white/10 pt-4 text-center space-y-3">
                <MobileLink
                  href="https://skaltamashportfolio.netlify.app/"
                  label="Portfolio V2"
                />
                <MobileLink
                  href="https://skaltmash.github.io/plortfolio/"
                  label="Portfolio V1"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* 🔹 Reusable Links */
const DropdownLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block px-4 py-3 text-sm text-gray-300 hover:bg-cyan-400 hover:text-black transition"
  >
    {label}
  </a>
);

const MobileLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="block text-gray-300 hover:text-cyan-400 transition"
  >
    {label}
  </a>
);

export default Navbar;
