// src/layouts/ProjectsLayout.jsx
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const projectTabs = [
  { label: "Overview", to: "/projects" },
  { label: "Client Projects", to: "/projects/client" },
  { label: "Apps & Websites", to: "/projects/apps" },
  { label: "Achievements", to: "/projects/certificates" },
  { label: "Skills & Tools", to: "/projects/skills" },
];

const ProjectsLayout = () => {
  const location = useLocation();

  return (
    <section className="bg-black min-h-screen text-white">
      {/* Sticky Tabs */}
      <div className="sticky top-0 z-30 bg-black/70 backdrop-blur border-b border-cyan-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto no-scrollbar">
          {projectTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === "/projects"} // exact match only for overview
              className={({ isActive }) =>
                `px-4 py-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[#00ffff] text-black shadow-[0_0_20px_#00ffff80]"
                    : "border border-[#00ffff66] text-[#00ffff] hover:bg-[#00ffff22]"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Animated page content */}
      <div className="max-w-6xl mx-auto px-4 pb-16 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsLayout;
