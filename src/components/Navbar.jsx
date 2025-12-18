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
    `block text-lg transition-colors ${
      isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
    }`;

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black"}`}
      >
        <div className="max-w-[900px] mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <NavLink to="/home">
            <img
              src="logo.png"
              alt="Logo"
              className="h-14 w-14 transition-transform duration-700 hover:rotate-[360deg]"
            />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-8 text-sm">
            {["/home", "/about", "/projects", "/services", "/contact"].map(
              (path, i) => {
                const labels = [
                  "Home",
                  "About",
                  "Projects",
                  "Services",
                  "Contact",
                ];
                return (
                  <NavLink key={path} to={path} className={linkClasses}>
                    {labels[i]}
                  </NavLink>
                );
              }
            )}

            {/* Portfolio Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowPortfolio(true)}
              onMouseLeave={() => setShowPortfolio(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-cyan-400">
                Versions <FaChevronDown size={12} />
              </button>

              <AnimatePresence>
                {showPortfolio && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-44 bg-[#111] border border-white/10 rounded-xl shadow-xl"
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

          {/* Mobile Button */}
          <button
            className="sm:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={24} />
          </button>
        </div>
      </nav>

      {/* 📱 MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 right-0 w-[280px] h-full bg-[#0b0b0b] z-50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <img src="logo.png" alt="Logo" className="h-12 w-12" />
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes size={22} className="text-white" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-6 p-6">
                {["/home", "/about", "/projects", "/services", "/contact"].map(
                  (path, i) => {
                    const labels = [
                      "Home",
                      "About",
                      "Projects",
                      "Services",
                      "Contact",
                    ];
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
                  }
                )}

                <div className="border-t border-white/10 pt-6 space-y-4">
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
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* Reusable links */
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
