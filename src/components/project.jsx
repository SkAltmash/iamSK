import React, { useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    slug: "nextalk-chat-app",
    title: "NexTalk – Real-Time Chat App",
    image: "Nextalk.png",
    description:
      "A full-stack real-time chat app built with React Native, Node.js, Express, MongoDB, and Socket.IO. Supports one-to-one & group chats, online status, last seen, and image sharing — just like WhatsApp!",
    github: "https://github.com/SkAltmash/NexTalk-the-chatApp",
    technologies: ["React Native", "Node.js", "MongoDB", "Socket.IO"],
  },
  {
    slug: "zap-split",
    title: "ZapSplit",
    image: "ZapSplit.jpg",
    description:
      "ZapSplit is your all-in-one money management solution — top up your wallet, split bills, earn rewards, pay later, and stay on top of your finances.",
    link: "https://zapsplit.netlify.app/",
    github: "https://github.com/SkAltmash/ZapSplit",
    technologies: ["React", "Tailwind CSS", "Firebase"],
  },
  {
    slug: "trendora-ecommerce",
    title: "Trendora E-commerce",
    image: "trendora.png",
    description:
      "Modern e-commerce app built with React and Firebase. Includes product management, admin panel, coupons, and responsive design.",
    link: "https://astrendora.netlify.app/",
    github: "https://github.com/SkAltmash/Trendora",
    technologies: ["React", "Firebase", "Tailwind CSS"],
  },
  {
    slug: "flickstream-v2",
    title: "FlickStream V2",
    image: "flickstreamV2.png",
    description:
      "Movie streaming app powered by TMDB API with authentication, watchlist, and live chat using Firebase.",
    link: "https://flickstreamvtwo.netlify.app",
    github: "https://github.com/SkAltmash/FlickStreamV2",
    technologies: ["React", "Tailwind CSS", "Firebase", "TMDB API"],
  },
  {
    slug: "flickstream-v1",
    title: "FlickStream V1",
    image: "flickstreamV1.png",
    description:
      "TMDB movie explorer using vanilla JS. Lightweight, fast, and built with simplicity in mind.",
    link: "https://asflickstream.netlify.app/",
    github: "https://github.com/SkAltmash/flickstreembysk",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    slug: "pathan-tutorials",
    title: "Pathan Tutorials of Mathematics",
    image: "pathan-tutorials.png",
    description:
      "A modern educational website for Pathan Tutorials (Hinganghat). Showcases batches, contact info, and courses with a clean UI.",
    link: "https://pathan-tutorials.netlify.app/",
    github: "https://github.com/SkAltmash/pathan-tutorials--website",
    technologies: ["React", "MailJS", "CSS"],
  },
];

const certificates = [
  {
    title: "Error Hunt (2nd place)",
    image: "aarohan.jpg",
    description:
      "2nd place in Aarohan 2024 Error Hunt coding challenge at RAICSIT Wardha.",
    rank: 2,
  },
  {
    title: "Coding Competitions (1st place)",
    image: "aakurit.jpg",
    description:
      "1st place in Aakurit 2023 Coding Competition at RAICSIT Wardha.",
    rank: 1,
  },
];

const techStack = [
  {
    category: "Languages",
    items: ["C", "C++", "Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Frontend",
    items: ["React", "React Native", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Firebase", "MongoDB", "SQL"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Netlify", "VS Code", "Postman"],
  },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <section className="relative mt-15 bg-black text-white min-h-screen py-16 px-6">
      {/* Tabs */}
      <div className="flex mb-10 gap-6 overflow-auto md:justify-center">
        {["projects", "certificates", "techstack"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab
                ? "bg-[#00ffff] text-black"
                : "border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black"
            }`}
          >
            {tab === "projects"
              ? "Projects"
              : tab === "certificates"
              ? "Certificates & Achievements"
              : "Tech Stack"}
          </button>
        ))}
      </div>

      {/* Projects */}
      {activeTab === "projects" && (
        <div className="flex flex-wrap gap-8 justify-center">
          {projects.map((project, index) => {
            const isApp = project.technologies.includes("React Native");
            return (
              <motion.div
                key={project.slug}
                className="bg-[#111] w-full max-w-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition-shadow duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-70 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute bottom-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                      isApp
                        ? "bg-green-500 text-black"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {isApp ? "App" : "Website"}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-2xl font-semibold text-[#00ffff] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-[#222] rounded-lg text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400 transition-colors"
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
      )}

      {/* Certificates */}
      {activeTab === "certificates" && (
        <div className="flex flex-wrap gap-8 justify-center">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              className="bg-[#111] w-full max-w-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                  🏆 Rank {cert.rank}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#00ffff] mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tech Stack */}
      {activeTab === "techstack" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {techStack.map((section, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 120 }}
            >
              <h4 className="text-xl font-bold text-[#00ffff] mb-6 border-b border-cyan-500 pb-2">
                {section.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-[#222] text-gray-300 text-sm font-medium hover:bg-cyan-500/20 hover:text-cyan-400 transition"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
