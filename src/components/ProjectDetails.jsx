import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Helmet } from "react-helmet-async";

export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDocs(collection(db, "clientProjects"));
      const found = snap.docs.map((d) => ({ id: d.id, ...d.data() })).find((p) => p.slug === slug);
      setProject(found || null);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center">
        <FaSpinner className="text-cyan-400 text-3xl animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0b0b0b] flex flex-col items-center justify-center text-white gap-4">
        <p className="text-gray-400">Project not found.</p>
        <button onClick={() => navigate("/projects")} className="text-cyan-400 hover:underline flex items-center gap-2">
          <FaArrowLeft /> Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Helmet>
        <title>{project.title} | Altamash Portfolio</title>
        <meta name="description" content={project.description || `Read about ${project.title}`} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        {project.image && <meta property="og:image" content={project.image} />}
      </Helmet>

      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition"
        >
          <FaArrowLeft /> Back to Projects
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          {project.title}
        </motion.h1>
        <p className="text-gray-400 max-w-2xl">{project.description}</p>
      </div>

      {/* Media */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {project.youtube ? (
            <iframe
              src={project.youtube + (project.youtube.includes("?") ? "&" : "?") + "autoplay=1"}
              className="w-full aspect-video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : project.image ? (
            <img src={project.image} alt={project.title} className="w-full" />
          ) : null}
        </div>
      </div>

      {/* Details */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        {/* Left */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-cyan-400 text-lg font-semibold mb-3">Project Overview</h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition"
            >
              Visit Live Website
            </a>
          )}
        </div>

        {/* Right */}
        <div className="space-y-10">
          {Array.isArray(project.technologies) && project.technologies.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md">{tech}</span>
                ))}
              </div>
            </div>
          )}
          {Array.isArray(project.impact) && project.impact.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Impact</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {project.impact.map((item, i) => (
                  <li key={i}>▹ {item}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Status</h4>
            <span className="px-3 py-1.5 text-xs bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 rounded-md font-medium">
              {project.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
