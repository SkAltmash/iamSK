import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Skeleton ---------- */
const VideoSkeleton = () => (
  <div className="absolute inset-0 bg-[#222] animate-pulse flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

const PersonalProjects = () => {
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
      slug: "zap-split",
      title: "ZapSplit – Bill Split & Wallet System",
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
      title: "Trendora E-commerce",
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
      title: "FlickStream V2 – Movie Streaming",
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
      title: "FlickStream V1 – Movie Explorer",
      image: "flickstreamV1.png",
      description:
        "Lightweight movie search app powered by TMDB API.",
      link: "https://asflickstream.netlify.app/",
      github: "https://github.com/SkAltmash/flickstreembysk",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
  ];
  return (
    <>
      {/* PROJECT CARDS */}
      <div className="flex flex-wrap gap-10 justify-center">
        {projects.map((project, index) => {
          const isApp = project.technologies.includes("React Native");

          return (
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
              className="bg-[#111] w-full max-w-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              whileHoverTransition={{ type: "spring", stiffness: 200 }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-45 sm:h-60 md:h-72 object-cover"
                />
                <span
                  className={`absolute bottom-3 right-3 px-3 py-[3px] text-[10px] font-bold uppercase rounded-full ${
                    isApp ? "bg-green-500 text-black" : "bg-blue-500"
                  }`}
                >
                  {isApp ? "App" : "Website"}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-semibold text-[#00ffff] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-[#222] rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

               
              </div>
            </motion.div>
          );
        })}
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
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400"
                    >
                      Live
                    </a>
                  )}
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#00ffff] text-[#00ffff] rounded-lg hover:bg-[#00ffff] hover:text-black"
                  >
                    GitHub
                  </a>
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