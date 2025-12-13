import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiGit,
  SiGithub,
  SiNetlify,
  SiPostman,
} from "react-icons/si";
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
  slug: "marco-teck",
  title: "Marco Teck – Business Website",
  image: "marco.png",
  description:
    "A modern, responsive business website built for Marco Teck Hyderabad to showcase services, brand identity, and contact details with smooth animations.",
  impact: [
    "Improved online presence for local business",
    "Professional branding with fast-loading UI",
  ],
  technologies: ["React", "Tailwind CSS", "Framer Motion"],
  status: "Delivered to Client",
  live: "https://marcotech.netlify.app/",
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
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 90, icon: <SiReact />, color: "#61DAFB" },
      { name: "React Native", level: 80, icon: <SiReact />, color: "#61DAFB" },
      { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "JavaScript", level: 85, icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "TypeScript", level: 70, icon: <SiTypescript />, color: "#3178C6" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85, icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express", level: 80, icon: <SiExpress />, color: "#fff" },
      { name: "Firebase", level: 90, icon: <SiFirebase />, color: "#FFCA28" },
      { name: "MongoDB", level: 75, icon: <SiMongodb />, color: "#47A248" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", level: 85, icon: <SiGit />, color: "#F05032" },
      { name: "GitHub", level: 85, icon: <SiGithub />, color: "#fff" },
      { name: "Netlify", level: 80, icon: <SiNetlify />, color: "#00C46A" },
      { name: "Postman", level: 75, icon: <SiPostman />, color: "#FF6C37" },
    ],
  },
];



const Projects = () => {
  const [activeTab, setActiveTab] = useState("client");
  const [skillFilter, setSkillFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const tabs = [
    { key: "client", label: "Client Projects" },
    { key: "projects", label: "Apps & Websites" },
    { key: "certificates", label: "Achievements" },
    { key: "techstack", label: "Skills & Tools" },
  ];

  const filteredClientProjects = clientProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredPersonalProjects = personalProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTechStack = techStack.map((section) => ({
    ...section,
    skills: section.skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((section) => section.skills.length > 0);

  return (
    <section className="relative bg-black text-white min-h-screen py-16 px-6 mt-12">
      {/* Search Bar */}
     

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
          {filteredClientProjects.map((project, index) => (
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
          {filteredPersonalProjects.map((project, index) => {
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
                    className="w-full h-45 sm:h-60 md:h-72  object-cover hover:scale-105 transition-transform duration-300"
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
          {filteredCertificates.map((cert, index) => (
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
  <div className="max-w-6xl mx-auto">

    {/* Filters */}
    <div className="flex gap-4 justify-center mb-10 flex-wrap">
      {["All", "Frontend", "Backend", "Tools"].map((filter) => (
        <button
          key={filter}
          onClick={() => setSkillFilter(filter)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${
              skillFilter === filter
                ? "bg-cyan-400 text-black"
                : "border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Skills Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredTechStack
        .filter(
          (section) =>
            skillFilter === "All" || section.category === skillFilter
        )
        .map((section, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/40 transition"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <h4 className="text-xl font-bold text-cyan-400 mb-6 border-b border-cyan-500/30 pb-2">
              {section.category}
            </h4>

            <div className="space-y-5">
              {section.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-3 text-gray-300">
                      <span className="text-xl" style={{ color: skill.color }}>
                        {skill.icon}
                      </span>
                      <span className="font-medium">{skill.name}</span>
                    </div>

                    {/* Animated Counter */}
                    <motion.span
                      className="text-sm text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
    </div>
  </div>
)}


      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-[#111] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
              >
                ✕
              </button>
              {selectedProject.status && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase rounded-full bg-green-400 text-black">
                  {selectedProject.status}
                </span>
              )}
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#00ffff] mb-4">
                {selectedProject.title}
              </h2>
              <p className="text-gray-300 mb-6">{selectedProject.description}</p>

              {selectedProject.impact && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Business Impact</h3>
                  <ul className="list-disc pl-5 text-gray-400">
                    {selectedProject.impact.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#222] rounded-lg text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {selectedProject.live && (
                  <a
                    href={selectedProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400 transition"
                  >
                    View Live
                  </a>
                )}
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400 transition"
                  >
                    View Live
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-[#00ffff] text-[#00ffff] rounded-lg hover:bg-[#00ffff] hover:text-black transition"
                  >
                    GitHub
                  </a>
                )}
                {selectedProject.readMore && (
                  <a
                    href={selectedProject.readMore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-[#00ffff] text-[#00ffff] rounded-lg hover:bg-[#00ffff] hover:text-black transition"
                  >
                    Read More
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </section>
  );
};

export default Projects;