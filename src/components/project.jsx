import React, { useState } from "react";
import { motion } from "framer-motion";

const clientProjects = [
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
    readMore:
      "https://www.linkedin.com/posts/skaltamash18_reactjs-nodejs-firebase-activity-7403004146406088704-vYuR",
  },
  {
    slug: "ecommerce-bdgc",
    title: "E-commerce Website – BDGC",
    image: "bgdc.png",
    description:
      "Shopping platform for Baby Care products with cart, secure checkout and inventory sync with admin panel.",
    impact: [
      "Online orders enabled for local customers",
      "Redy Integrated online payments (UPI/Card)",
    ],
    technologies: ["React", "Node.js", "Firebase", "Tailwind CSS"],
    status: "Delivered to Client",
    live: "https://baby-daiper-and-genral-care.netlify.app/",
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
    readMore:
      "https://www.linkedin.com/posts/skaltamash18_react-reactnative-expo-activity-7399686177215324160-ycsd",
  },
];

const personalProjects = [
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

const certificates = [
  {
    title: "Error Hunt (2nd place)",
    image: "aarohan.jpg",
    description:
      "2nd place in Aarohan 2024 Error Hunt coding challenge at RAICSIT Wardha.",
    rank: 2,
  },
  {
    title: "Coding Competition (1st place)",
    image: "aakurit.jpg",
    description:
      "1st place in Aakurit 2023 Coding Competition at RAICSIT Wardha.",
    rank: 1,
  },
];

const techStack = [
  { category: "Languages", items: ["C", "C++", "JavaScript", "TypeScript"] },
  { category: "Frontend", items: ["React", "React Native", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "Firebase", "MongoDB"] },
  { category: "Tools", items: ["Git", "GitHub", "Netlify", "VS Code", "Postman", "Socket.IO"] },
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState("client");

  const tabs = [
    { key: "client", label: "Client Projects" },
    { key: "projects", label: "Apps & Websites" },
    { key: "certificates", label: "Achievements" },
    { key: "techstack", label: "Skills & Tools" },
  ];

  return (
    <section className="relative bg-black text-white min-h-screen py-16 px-6 mt-12">
      {/* Tabs */}
      <div className="flex mb-12 gap-6 overflow-auto md:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.key
                ? "bg-[#00ffff] text-black"
                : "border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Client Projects */}
      {activeTab === "client" && (
        <div className="flex flex-wrap gap-10  justify-center">
          {clientProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              className="bg-[#111] w-full max-w-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 md:h-72 object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-[3px] text-[10px] font-bold uppercase rounded-full bg-green-400 text-black shadow">
                  {project.status}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-semibold text-[#00ffff] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">{project.description}</p>

                {/* Business impact points */}
                <ul className="text-gray-500 text-xs mt-2 list-disc pl-5">
                  {project.impact.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

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
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400 transition"
                    >
                      Live
                    </a>
                  )}

                  {project.readMore && (
                    <a
                      href={project.readMore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-[#00ffff] text-[#00ffff] rounded-lg hover:bg-[#00ffff] hover:text-black transition"
                    >
                      Read more
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Personal Projects */}
      {activeTab === "projects" && (
        <div className="flex flex-wrap gap-10 justify-center">
          {personalProjects.map((project, index) => {
            const isApp = project.technologies.includes("React Native");

            return (
              <motion.div
                key={project.slug}
                className="bg-[#111] w-full max-w-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 md:h-72 object-cover hover:scale-105 transition-transform duration-300"
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
      )}

      {/* Certificates */}
      {activeTab === "certificates" && (
        <div className="flex flex-wrap gap-10 justify-center">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-[#111] w-full max-w-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-[10px] uppercase font-bold">
                  🏆 Rank {cert.rank}
                </div>
              </div>

              <div className="p-5">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {techStack.map((section, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/50 hover:scale-[1.03] transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
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
