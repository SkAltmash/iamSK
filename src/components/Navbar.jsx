import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaLayerGroup } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* 🔹 Fixed Navbar: Always visible 
        - top-0: Sticks to top
        - z-50: stays above content
      */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <div
          className={`relative w-full max-w-[850px] bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 ease-out
          ${isOpen ? "rounded-[30px]" : "rounded-full"}`}
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* LOGO */}
            <NavLink
              to="/home"
              className="flex items-center gap-2 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 group-hover:border-cyan-400 transition-colors">
                <img
                  src="logo.png"
                  alt="Logo"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:rotate-180"
                />
              </div>
              <span className="hidden sm:block font-bold text-white tracking-wider text-sm">
                ALTAMASH
              </span>
            </NavLink>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors z-10"
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-white/10 rounded-full -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              {/* VERSIONS DROPDOWN */}
              <div
                className="relative ml-2"
                onMouseEnter={() => setShowPortfolio(true)}
                onMouseLeave={() => setShowPortfolio(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-cyan-400 border border-cyan-400/30 rounded-full hover:bg-cyan-400/10 transition-all">
                  Versions <FaChevronDown size={10} />
                </button>

                <AnimatePresence>
                  {showPortfolio && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2"
                    >
                      <DropdownLink
                        href="https://skaltamashportfolio.netlify.app/"
                        label="Portfolio V2"
                        desc="Netlify Release"
                      />
                      <DropdownLink
                        href="https://skaltmash.github.io/plortfolio/"
                        label="Portfolio V1"
                        desc="Legacy Github"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <FaTimes size={18} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <FaBars size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* 📱 MOBILE MENU (Expands down inside the bar) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col p-4 pt-0 gap-2">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                  
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.path}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between p-3 rounded-xl transition-all ${
                            isActive
                              ? "bg-white/10 text-cyan-400"
                              : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`
                        }
                      >
                        <span className="font-medium text-lg">{link.label}</span>
                        {location.pathname === link.path && (
                          <motion.div
                            layoutId="mobile-dot"
                            className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                          />
                        )}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Mobile Versions Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <MobileVersionBtn
                      href="https://skaltamashportfolio.netlify.app/"
                      label="V2"
                    />
                    <MobileVersionBtn
                      href="https://skaltmash.github.io/plortfolio/"
                      label="V1"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding behind the fixed navbar */}
      <div className="h-24" />
    </>
  );
};

/* --- SUB COMPONENTS --- */

const DropdownLink = ({ href, label, desc }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
  >
    <span className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">
      {label}
    </span>
    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
      {desc}
    </span>
  </a>
);

const MobileVersionBtn = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all group"
  >
    <FaLayerGroup className="text-gray-500 group-hover:text-cyan-400" size={14} />
    <span className="text-sm font-bold text-gray-400 group-hover:text-cyan-400">
      {label}
    </span>
  </a>
);

export default Navbar;