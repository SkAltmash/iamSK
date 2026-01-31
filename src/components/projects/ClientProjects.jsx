import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Skeleton ---------- */
const VideoSkeleton = () => (
  <div className="absolute inset-0 bg-[#222] animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

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
    slug: "Smart-Fix-Services",
    title: "Smart Fix Services Website",
    image: "smartfix.png",
    description:
      "A sleek, modern website for Smart Fix Services, a tech repair business in hinganghat, showcasing services, pricing, and contact info with smooth animations.",
    impact: [
      "Enhanced online visibility for local business",
      "Professional branding with fast-loading UI",
    ],
    technologies: ["React", "Next.js", "Firebase" , "Tailwind CSS", "Framer Motion"],
    status: "Delivered to Client",
    live: "https://smartfixservices.in/",
    youtube: "https://www.youtube.com/embed/3fcvd1ldcy0",
    
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
      {/* PROJECT CARDS */}
      <div className="flex flex-wrap gap-10 justify-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            onClick={() => {
              setSelectedProject(project);
              setVideoLoaded(false);
              setVideoError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSelectedProject(project);
                setVideoLoaded(false);
                setVideoError(false);
              }
            }}
            role="button"
            tabIndex={0}
            className="bg-[#111] w-full max-w-[480px] rounded-2xl overflow-hidden shadow-lg 
                       hover:shadow-cyan-500/30 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -6 }}
            whileHoverTransition={{ type: "spring", stiffness: 200 }}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold rounded-full bg-green-400 text-black">
                {project.status}
              </span>
            
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#00ffff]">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                {project.description}
              </p>

              {/* IMPACT */}
              {project.impact && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-2">
                    Business Impact
                  </h4>
                  <ul className="list-disc pl-5 text-gray-400 text-sm space-y-1">
                    {project.impact.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* TECHNOLOGIES */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs bg-[#222] rounded-lg text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>


          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-[#111] rounded-2xl max-w-4xl w-full max-h-[92vh] md:max-h-[80vh] overflow-hidden"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-[#00ffff]">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white text-xl hover:text-cyan-400"
                >
                  ✕
                </button>
              </div>

              {/* VIDEO OR IMAGE */}
              <div
                className="relative bg-black aspect-[16/9] md:aspect-auto md:h-[320px]"
              >
                {selectedProject.youtube ? (
                  <>
                    {!videoLoaded && !videoError && <VideoSkeleton />}
                    {!videoError ? (
                      <iframe
                        src={selectedProject.youtube.includes("?")
                          ? `${selectedProject.youtube}&autoplay=1`
                          : `${selectedProject.youtube}?autoplay=1`}
                        title="Project Demo"
                        onLoad={() => setVideoLoaded(true)}
                        onError={() => setVideoError(true)}
                        className={`absolute inset-0 w-full h-full transition-opacity ${videoLoaded ? "opacity-100" : "opacity-0"
                          }`}
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
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6 overflow-y-auto md:max-h-[calc(80vh-320px)]">
                <p className="text-gray-300 mb-4">
                  {selectedProject.description}
                </p>



                {/* LINKS */}
                <div className="flex gap-3 flex-wrap">
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400"
                    >
                      Live
                    </a>
                  )}
                  {selectedProject.readMore && (
                    <a
                      href={selectedProject.readMore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-[#00ffff] text-[#00ffff] rounded-lg hover:bg-[#00ffff] hover:text-black"
                    >
                      Read more
                    </a>
                  )}
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
