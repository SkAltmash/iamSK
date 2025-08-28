import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faCss3Alt,
  faJs,
  faHtml5,
  faGithub,
  faPython,
  faGitAlt,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDatabase,
  faC,
   // for C++ (as FontAwesome doesn't have direct)
  faServer,
  faCode,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const projects = [
  {
    slug: "zap-split",
    title: "ZapSplit",
    image: "ZapSplit.jpg",
    video: "/videos/zapsplit.webm",
    description:
      "ZapSplit is your all-in-one money management solution. Top up your wallet, split bills, earn rewards, pay later, and stay on top of your finances — all in one app.",
    link: "https://zapsplit.netlify.app/",
    github: "https://github.com/SkAltmash/ZapSplit",
    technologies: [faReact, faCss3Alt, faJs, faGithub],
  },
  {
    slug: "trendora-ecommerce",
    title: "Trendora E-commerce",
    image: "trendora.png",
    description:
      "Modern E-commerce app built with React and Firebase. Admin panel, product management, cart, coupon system and responsive design.",
    link: "https://astrendora.netlify.app/",
    github: "https://github.com/SkAltmash/Trendora",
    technologies: [faReact, faGithub, faCss3Alt, faJs],
  },
  {
    slug: "flickstream-v2",
    title: "FlickStream V2",
    image: "flickstreamV2.png",
    description:
      "TMDB-powered movie streaming app with login, watchlist, comments, chat using Firebase & React.",
    link: "https://flickstreamvtwo.netlify.app",
    github: "https://github.com/SkAltmash/FlickStreamV2",
    technologies: [faReact, faGithub, faCss3Alt, faJs, faServer],
  },
  {
    slug: "flickstream-v1",
    title: "FlickStream V1",
    image: "flickstreamV1.png",
    description:
      "TMDB movie explorer using vanilla JS. Search, details, trailers, watchlist—lightweight & fast.",
    link: "https://asflickstream.netlify.app/",
    github: "https://github.com/SkAltmash/flickstreembysk",
    technologies: [faHtml5, faCss3Alt, faJs, faGithub, faServer],
  },
  {
    slug: "pathan-tutorials",
    title: "Pathan Tutorials of Mathematics",
    image: "pathan-tutorials.png",
    description:
      "A real-world educational website built for Pathan Tutorials of Mathematics (Hinganghat). Showcases batches, contact info, courses, and modern design. Built with React and MailJS.",
    link: "https://pathan-tutorials.netlify.app/",
    github: "https://github.com/SkAltmash/pathan-tutorials--website",
    technologies: [faReact, faCss3Alt, faJs, faGithub],
  },
];
const certificates = [
  {
    title: "Error Hunt (2nd place)",
    image: "aarohan.jpg",
    description: "2nd place in  Aarohan(2024)  Error Hunt. at RAICSIT Wardh",
    rank: 2,
  },
  {
    title: "Coding Competitions (1st place)",
    image: "aakurit.jpg",
    description: "1st place in  Aakurit(2023) coding competitions. at RAICSIT Wardh",
    rank: 1,
  },
];
const techStack = [
  {
    category: "Languages",
    items: [
      { name: "C", icon: faC },
      { name: "C++", icon: faC },
      { name: "Python", icon: faPython },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: faReact },
      { name: "React Native", icon: faReact },
      { name: "Tailwind CSS", icon: faCss3Alt },
      { name: "JavaScript", icon: faJs },
      { name: "TypeScript", icon: faJs },
      { name: "Framer Motion", icon: faGlobe }, // placeholder
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "SQL", icon: faDatabase },
      { name: "Firebase", icon: faServer },
      { name: "Node.js", icon: faNodeJs },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "GitHub", icon: faGithub },
      { name: "Git", icon: faGitAlt },
      { name: "Netlify", icon: faGlobe }, // placeholder
    ],
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

      {/* Content */}
      {activeTab === "projects" && (
        <div className="flex flex-wrap gap-8 justify-center">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              className="bg-[#111] w-full max-w-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-70 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-[#00ffff] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <FontAwesomeIcon
                      key={idx}
                      icon={tech}
                      className="text-gray-200 text-xl"
                    />
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400 transition"
                  >
                    Live link
                  </a>
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
          ))}
        </div>
      )}

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
          {/* Rank badge */}
          <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
            <span>{cert.icon}</span> Rank {cert.rank}
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



      {activeTab === "techstack" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {techStack.map((section, idx) => (
            <motion.div
              key={idx}
              className="bg-[#111] rounded-xl p-6 shadow-md hover:shadow-cyan-500/30 transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <h4 className="text-xl font-bold text-[#00ffff] mb-4">
                {section.category}
              </h4>
              <div className="flex flex-col gap-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-300 text-lg"
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-xl" />
                    {item.name}
                  </div>
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
