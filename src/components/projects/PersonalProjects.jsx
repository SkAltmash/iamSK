import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaMobileAlt, FaGlobe } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import SkeletonCard from "../ui/SkeletonCard";

const PersonalProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "personalProjects"));
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape" && selectedProject) setSelectedProject(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedProject]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} aspect="video" />)}
      </div>
    );
  }

  if (projects.length === 0) {
    return <div className="text-center py-20 text-gray-500">No personal projects found.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 justify-items-center">
        {projects.map((project, index) => {
          const isApp = Array.isArray(project.technologies) && project.technologies.includes("React Native");
          return (
            <motion.div
              key={project.id}
              layoutId={`card-${project.id}`}
              onClick={() => { setSelectedProject(project); setVideoLoaded(false); setVideoError(false); }}
              className="group relative w-full max-w-[500px] bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden cursor-pointer
                         hover:border-cyan-400/50 transition-all duration-500 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
                {project.image && (
                  <motion.img
                    layoutId={`img-${project.id}`}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase text-black rounded ${isApp ? "bg-green-400" : "bg-cyan-400"
                  }`}>
                  {isApp ? "App" : "Web"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                {Array.isArray(project.technologies) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-[10px] uppercase font-medium text-gray-300 bg-white/5 border border-white/5 rounded">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_40px_rgba(34,211,238,0.1)]" />
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`card-${selectedProject.id}`}
              className="w-full max-w-5xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10 bg-[#161616]">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  {selectedProject.title}
                  {Array.isArray(selectedProject.technologies) && selectedProject.technologies.includes("React Native") ? (
                    <FaMobileAlt className="text-green-400 text-lg" />
                  ) : (
                    <FaGlobe className="text-cyan-400 text-lg" />
                  )}
                </h2>
                <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors">
                  <FaTimes />
                </button>
              </div>

              <div className="overflow-y-auto">
                <div className="w-full bg-black aspect-[16/9] relative">
                  {selectedProject.youtube ? (
                    <>
                      {!videoLoaded && !videoError && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
                          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      {!videoError ? (
                        <iframe
                          src={`${selectedProject.youtube}${selectedProject.youtube.includes("?") ? "&" : "?"}autoplay=1`}
                          title="Project Demo"
                          onLoad={() => setVideoLoaded(true)}
                          onError={() => setVideoError(true)}
                          className={`w-full h-full transition-opacity duration-500 ${videoLoaded ? "opacity-100" : "opacity-0"}`}
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                      )}
                    </>
                  ) : (
                    <motion.img
                      layoutId={`img-${selectedProject.id}`}
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-8 p-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 mb-2">About Project</h3>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">{selectedProject.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-4">
                      {selectedProject.link && (
                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-transform active:scale-95">
                          <FaExternalLinkAlt size={14} /> Live Demo
                        </a>
                      )}
                      {selectedProject.github && (
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/40 transition-colors">
                          <FaGithub size={16} /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(selectedProject.technologies) && selectedProject.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 text-xs font-medium text-cyan-100 bg-cyan-900/30 border border-cyan-500/20 rounded-md">{tech}</span>
                      ))}
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