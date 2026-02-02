import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import projects from "../../projectsData";

export default function ClientProjects() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          onClick={() => navigate(`/projects/${project.slug}`)}
          className="group relative bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-cyan-400/50 transition-colors duration-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            <span className="absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase text-black bg-cyan-400 rounded">
              {project.status}
            </span>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {project.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
