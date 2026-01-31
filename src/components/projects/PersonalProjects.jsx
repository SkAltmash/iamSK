import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaPlay, FaTimes, FaMobileAlt, FaGlobe } from "react-icons/fa";

const PersonalProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // 🔹 Lock Body Scroll when Modal is Open
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

  // 🔹 Close on Escape Key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && selectedProject) setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedProject]);

  const projects = [
    {
      slug: "zap-split",
      title: "ZapSplit",
      image: "ZapSplit.jpg",
      description:
        "Top-up wallet, split bills, pay later, rewards — smart money management for groups.",
      link: "https://zapsplit.netlify.app/",
      github: "https://github.com/SkAltmash/ZapSplit",
      technologies: ["React", "Tailwind CSS", "Firebase"],
      youtube: "https://www.youtube.com/embed/umVu3wLG3xQ",
    },
    {
      slug: "trendora-ecommerce",
      title: "Trendora",
      image: "trendora.png",
      description:
        "Modern online shopping app with admin management, discounts & secure auth.",
      link: "https://astrendora.netlify.app/",
      github: "https://github.com/SkAltmash/Trendora",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      youtube: "https://www.youtube.com/embed/K3arJarZy7c",
    },
    {
      slug: "flickstream-v2",
      title: "FlickStream V2",
      image: "flickstreamV2.png",
      description:
        "TMDB powered streaming UI with watchlist & Firebase based chat.",
      link: "https://flickstreamvtwo.netlify.app",
      github: "https://github.com/SkAltmash/FlickStreamV2",
      technologies: ["React", "Tailwind CSS", "Firebase", "TMDB API"],
      youtube: "https://www.youtube.com/embed/hrs2qdsf8uA",
    },
    {
      slug: "flickstream-v1",
      title: "FlickStream V1",
      image: "flickstreamV1.png",
      description: "Lightweight movie search app powered by TMDB API.",
      link: "https://asflickstream.netlify.app/",
      github: "https://github.com/SkAltmash/flickstreembysk",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
  ];

  return (
    <>
      {/* 🔹 PROJECT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 justify-items-center">
        {projects.map((project, index) => {
          const isApp = project.technologies.includes("React Native");

          return (
            <motion.div
              key={project.slug}
              layoutId={`card-${project.slug}`}
              onClick={() => {
                setSelectedProject(project);
                setVideoLoaded(false);
                setVideoError(false);
              }}
              className="group relative w-full max-w-[500px] bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden cursor-pointer
                         hover:border-cyan-400/50 transition-all duration-500 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Image Section */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <motion.img
                  layoutId={`img-${project.slug}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />

                {/* Floating Badge */}
                <span
                  className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] 
                  ${isApp ? "bg-green-400 shadow-green-400/40" : "bg-cyan-400 shadow-cyan-400/40"}`}
                >
                  {isApp ? "App" : "Web"}
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

                {/* Tech Stack Preview */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[10px] uppercase font-medium text-gray-300 bg-white/5 border border-white/5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_40px_rgba(34,211,238,0.1)]" />
            </motion.div>
          );
        })}
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
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-white/10 bg-[#161616]">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  {selectedProject.title}
                  {selectedProject.technologies.includes("React Native") ? (
                    <FaMobileAlt className="text-green-400 text-lg" />
                  ) : (
                    <FaGlobe className="text-cyan-400 text-lg" />
                  )}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto custom-scrollbar">
                
                {/* Media Area */}
                <div className="w-full bg-black aspect-[16/9] relative group">
                  {selectedProject.youtube ? (
                    <>
                      {!videoLoaded && !videoError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                           <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
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

                {/* Dashboard Layout */}
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  
                  {/* Left: Description & Actions */}
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 mb-2">About Project</h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-transform active:scale-95"
                        >
                          <FaExternalLinkAlt size={14} /> Live Demo
                        </a>
                      )}
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/40 transition-colors"
                        >
                          <FaGithub size={16} /> Source Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Tech Stack */}
                  <div className="space-y-6">
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

export default PersonalProjects;