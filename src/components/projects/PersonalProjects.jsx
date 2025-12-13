import React from "react";
import { motion } from "framer-motion";

const PersonalProjects = ({ openModal }) => {
    const projects = [
  {
    slug: "nextalk-chat-app",
    title: "NexTalk – Real-Time Chat App",
    image: "Nextalk.png",
    description:
      "WhatsApp-like real-time chat app with group support, last seen, media sharing & Socket.IO backend.",
    github: "https://github.com/SkAltmash/NexTalk-the-chatApp",
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.IO"],
  },
  {
    slug: "zap-split",
    title: "ZapSplit – Bill Split & Wallet System",
    image: "ZapSplit.jpg",
    description:
      "Top-up wallet, split bills, pay later, rewards — smart money management for groups.",
    link: "https://zapsplit.netlify.app/",
    github: "https://github.com/SkAltmash/ZapSplit",
    technologies: ["React", "Tailwind CSS", "Firebase"],
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
    <div className="flex flex-wrap gap-10 justify-center">
      {projects.map((project, index) => {
        const isApp = project.technologies.includes("React Native");

        return (
          <motion.div
            key={project.slug}
            className="bg-[#111] w-full max-w-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            onClick={() => openModal(project)}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-45 sm:h-60 md:h-72 object-cover hover:scale-105 transition-transform duration-300"
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

              <div className="flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400 transition"
                  >
                    Live
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[#00ffff] text-[#00ffff] rounded-lg hover:bg-[#00ffff] hover:text-black transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PersonalProjects;