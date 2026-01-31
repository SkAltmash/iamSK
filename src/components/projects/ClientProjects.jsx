import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExternalLinkAlt, FaBookOpen, FaPlay, FaTimes } from "react-icons/fa";

const ClientProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

 const projects = [
  {
    slug: "Sales-Tracking-App",
    title: "Sales Tracking + Invoice Application",
    image: "smsAdmin.png",
    description: "Sales Management System for a retail business to track sales, manage inventory, and generate invoices with ease.",
    impact: [
      "Streamlined sales tracking and inventory management",
      "Automated invoice generation saving time and reducing errors",
    ],
    technologies: ["React Native", "Firebase", "Expo", "Expo-Share",  "Tailwind CSS"],
    status: "Delivered to Client",
  

  }
  ,
  {
    slug: "Smart-Fix-Services",
    title: "Smart Fix Services Website",
    image: "sms.png",
    description:
      "A sleek, modern website for Smart Fix Services, a tech repair business in hinganghat, showcasing services, pricing, and contact info with smooth animations.",
    impact: [
      "Enhanced online visibility for local business",
      "Professional branding with fast-loading UI",
    ],
    technologies: ["React", "Next.js", "Firebase" , "Tailwind CSS", "Framer Motion"],
    status: "Delivered to Client",
    live: "https://smartfixservices.help",
    
  },
  {
    slug: "pos-perfect-auto-parts",
    title: "Sales & Inventory Management System (POS)",
    image: "PerfectAutoParts.png",
    description:
      "A full POS system built for a live auto-parts business — includes real billing workflow, retailer management, inventory tracking, and statements panel.",
    impact: [
      "60% faster billing & cashflow tracking",
      "Used daily in real business operations",
    ],
    technologies: ["React", "Node.js", "Firebase", "Tailwind CSS", "Charts"],
    status: "Delivered to Client",
    youtube: "https://www.youtube.com/embed/vFygI_2ArP4",
    
  },

  {
    slug: "marco-teck",
    title: "MarcoTech E-Com Website",
    image: "marco.png",
    description:
      "A modern, responsive business website built for Marco Teck Hyderabad to showcase services, brand identity, and contact details with smooth animations.",
    impact: [
      "Improved online presence for local business",
      "Professional branding with fast-loading UI",
    ],
    technologies: ["React", "Next.js", "Firebase" , "Tailwind CSS", "Framer Motion"],
    status: "Delivered to Client",
    live: "https://marcotech.shop/",
    youtube: "https://www.youtube.com/embed/xQyEWSui1Xk",
  },

  {
    slug: "ecommerce-bdgc",
    title: "E-commerce Website – BDGC",
    image: "bgdc.png",
    description:
      "Shopping platform for Baby Care products with cart, secure checkout and inventory sync with admin panel.",
    impact: [
      "Online orders enabled for local customers",
      "Ready integrated online payments (UPI / Card)",
    ],
    technologies: ["React", "Node.js", "Firebase", "Tailwind CSS"],
    status: "Delivered to Client",
    live: "https://baby-daiper-and-genral-care.netlify.app/",
    youtube: "https://www.youtube.com/embed/z02s8ORQyv4",
  },

  {
    slug: "admin-app-bdgc",
    title: "Admin Application – BDGC",
    image: "BDGCAdmin.png",
    description:
      "Admin app to manage products, orders, retailers and analytics — fully connected with backend.",
    impact: [
      "Reduced manual workload by 50%",
      "Full control — mobile-friendly operations",
    ],
    technologies: ["React Native", "Node.js", "Firebase", "Telegram Bot"],
    status: "Delivered to Client",
    youtube: "https://www.youtube.com/embed/3JwjiZbYrmk",
    readMore:
      "https://www.linkedin.com/posts/skaltamash18_react-reactnative-expo-activity-7399686177215324160-ycsd",
  },
];





  return (
    <>
      {/* 🔹 PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            layoutId={`card-${project.slug}`}
            onClick={() => {
              setSelectedProject(project);
              setVideoLoaded(false);
              setVideoError(false);
            }}
            className="group relative bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden cursor-pointer
                       hover:border-cyan-400/50 transition-colors duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Image Section (Fixed Aspect Ratio) */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <motion.img
                layoutId={`img-${project.slug}`}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

              {/* Floating Badge */}
              <span className="absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black bg-cyan-400 rounded shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                {project.status}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-5 relative z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {project.description}
              </p>

              {/* Mini Tech Tags (Limit to 3) */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-[10px] uppercase font-medium text-gray-300 bg-white/5 border border-white/5 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 text-[10px] text-gray-500">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_40px_rgba(34,211,238,0.1)]" />
          </motion.div>
        ))}
      </div>

      {/* 🔹 CINEMATIC MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`card-${selectedProject.slug}`}
              className="w-full max-w-5xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Close Button */}
              <div className="flex justify-between items-center p-5 border-b border-white/10 bg-[#161616]">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                  <span className="ml-3 text-sm font-normal text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">
                    {selectedProject.status}
                  </span>
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto custom-scrollbar">
                
                {/* Media Section (Video/Image) */}
                <div className="w-full bg-black aspect-[16/9] relative group">
                   {selectedProject.youtube ? (
                    <>
                      {!videoLoaded && !videoError && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-[#1a1a1a]">
                           <span className="animate-pulse">Loading Demo...</span>
                        </div>
                      )}
                      {!videoError ? (
                        <iframe
                          src={selectedProject.youtube.includes("?")
                            ? `${selectedProject.youtube}&autoplay=1`
                            : `${selectedProject.youtube}?autoplay=1`}
                          title="Project Demo"
                          onLoad={() => setVideoLoaded(true)}
                          onError={() => setVideoError(true)}
                          className={`w-full h-full transition-opacity duration-500 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </>
                  ) : (
                    <motion.img
                      layoutId={`img-${selectedProject.slug}`}
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Grid Content Layout */}
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  
                  {/* Left Column: Description & Actions (Span 2) */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 mb-2">Overview</h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {selectedProject.live && (
                        <a
                          href={selectedProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-transform active:scale-95"
                        >
                          <FaPlay size={12} /> Live Demo
                        </a>
                      )}
                      {selectedProject.readMore && (
                        <a
                          href={selectedProject.readMore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <FaBookOpen size={14} /> Case Study
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Tech & Impact (Span 1) */}
                  <div className="space-y-8">
                    
                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-xs font-medium text-cyan-100 bg-cyan-900/30 border border-cyan-500/20 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Business Impact */}
                    {selectedProject.impact && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                          Key Highlights
                        </h4>
                        <ul className="space-y-2">
                          {selectedProject.impact.map((item, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-300">
                              <span className="text-cyan-400 mt-1">▹</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default ClientProjects;
