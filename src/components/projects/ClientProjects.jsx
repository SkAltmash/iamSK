import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import SkeletonCard from "../ui/SkeletonCard";

export default function ClientProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "clientProjects"), orderBy("order", "asc"));
        const snap = await getDocs(q);
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        // fallback without ordering
        const snap = await getDocs(collection(db, "clientProjects"));
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} aspect="video" />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No client projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          onClick={() => navigate(`/projects/${project.slug}`)}
          className="group relative bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden cursor-pointer hover:border-cyan-400/50 transition-colors duration-500"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ y: -5 }}
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            <span className="absolute top-3 right-3 px-3 py-1 text-[10px] font-bold uppercase text-black bg-cyan-400 rounded">
              {project.status}
            </span>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
              {project.description}
            </p>
            {Array.isArray(project.technologies) && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded text-gray-400">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
