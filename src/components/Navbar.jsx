import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown, FaLayerGroup } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

// Custom easing for that "Apple/Vercel" premium feel
const smoothEasting = [0.22, 1, 0.36, 1];

// Variants for staggered animations
const navVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: smoothEasting,
      staggerChildren: 0.1, // Staggers the desktop links on load
    },
  },
};

const linkItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: smoothEasting } },
};

const mobileMenuVariants = {
  closed: { height: 0, opacity: 0, transition: { duration: 0.4, ease: smoothEasting } },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.5, ease: smoothEasting, staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const mobileLinkVariants = {
  closed: { x: -20, opacity: 0 },
  open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: smoothEasting } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  
  const location = useLocation();
  const { scrollY } = useScroll();

  // Smart Navbar: Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // Toggle glassmorphism
    setIsScrolled(latest > 20);
    
    // Toggle visibility (only if menu is closed)
    if (!isOpen && latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        style={{ y: isHidden ? "-100%" : "0%" }}
        transition={{ duration: 0.4, ease: smoothEasting }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none"
      >
        <motion.div
          layout
          className={`relative w-full max-w-[850px] pointer-events-auto transition-colors duration-500 ease-out border
          ${isOpen ? "rounded-[30px]" : "rounded-full"}
          ${
            isScrolled || isOpen
              ? "bg-[#0a0a0a]/70 backdrop-blur-xl border-white/10 shadow-2xl"
              : "bg-transparent border-transparent shadow-none"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* LOGO */}
            <NavLink to="/home" className="flex items-center gap-2 group focus-visible:outline-none rounded-full">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 180 }}
                transition={{ duration: 0.6, ease: smoothEasting }}
                className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20 group-hover:border-cyan-400 transition-colors"
              >
                <img src="/logo.png" alt="" aria-hidden="true" className="h-full w-full object-cover" />
              </motion.div>
              <span className="hidden sm:block font-bold text-white tracking-wider text-sm">
                ALTAMASH
              </span>
            </NavLink>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={linkItemVariants}>
                  <NavLink
                    to={link.path}
                    className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors z-10 block rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    {({ isActive }) => (
                      <>
                        <span className="relative z-10">{link.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-white/10 rounded-full"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* VERSIONS DROPDOWN */}
              <motion.div
                variants={linkItemVariants}
                className="relative ml-2"
                onMouseEnter={() => setShowPortfolio(true)}
                onMouseLeave={() => setShowPortfolio(false)}
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-cyan-400 border border-cyan-400/30 rounded-full hover:bg-cyan-400/10 transition-colors focus-visible:outline-none"
                >
                  Versions 
                  <motion.div animate={{ rotate: showPortfolio ? 180 : 0 }} transition={{ duration: 0.3, ease: smoothEasting }}>
                    <FaChevronDown size={10} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showPortfolio && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(5px)" }}
                      transition={{ duration: 0.3, ease: smoothEasting }}
                      className="absolute right-0 top-full mt-2 w-48 bg-[#111]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-2 origin-top"
                    >
                      <DropdownLink href="https://skaltamashportfolio.netlify.app/" label="Portfolio V2" desc="Netlify Release" />
                      <DropdownLink href="https://skaltmash.github.io/plortfolio/" label="Portfolio V1" desc="Legacy Github" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* MOBILE TOGGLE BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors focus-visible:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FaTimes size={18} />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FaBars size={18} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* 📱 MOBILE MENU */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="overflow-hidden md:hidden"
              >
                <div className="flex flex-col p-4 pt-0 gap-2">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

                  {navLinks.map((link) => (
                    <motion.div key={link.path} variants={mobileLinkVariants}>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `flex items-center justify-between p-3 rounded-xl transition-colors focus-visible:outline-none ${
                            isActive ? "bg-white/10 text-cyan-400" : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`
                        }
                      >
                        <span className="font-medium text-lg">{link.label}</span>
                        {location.pathname === link.path && (
                          <motion.div layoutId="mobile-dot" className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        )}
                      </NavLink>
                    </motion.div>
                  ))}

                  {/* Mobile Versions Grid */}
                  <motion.div variants={mobileLinkVariants} className="mt-4 grid grid-cols-2 gap-3">
                    <MobileVersionBtn href="https://skaltamashportfolio.netlify.app/" label="V2" />
                    <MobileVersionBtn href="https://skaltmash.github.io/plortfolio/" label="V1" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>
      <div className="h-24" aria-hidden="true" />
    </>
  );
};

/* --- SUB COMPONENTS --- */

const DropdownLink = ({ href, label, desc }) => (
  <motion.a
    whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.05)" }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex flex-col px-4 py-3 rounded-xl transition-colors group focus-visible:outline-none"
  >
    <span className="text-sm font-semibold text-gray-200 group-hover:text-cyan-400 transition-colors">
      {label}
    </span>
    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
      {desc}
    </span>
  </motion.a>
);

const MobileVersionBtn = ({ href, label }) => (
  <motion.a
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-colors group focus-visible:outline-none"
  >
    <FaLayerGroup className="text-gray-500 group-hover:text-cyan-400 transition-colors" size={14} />
    <span className="text-sm font-bold text-gray-400 group-hover:text-cyan-400 transition-colors">
      {label}
    </span>
  </motion.a>
);

export default Navbar;