import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faCss3Alt,
  faJs,
  faHtml5,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faServer } from "@fortawesome/free-solid-svg-icons";

const projects = [
  {
    slug: "zap-split",
    title: "ZapSplit",
    image: "ZapSplit.jpg",
    description:
      "ZapSplit is your all-in-one money management solution. Top up your wallet, split bills, earn rewards, pay later, and stay on top of your finances — all in one app.",
    link: "https://zapsplit.netlify.app/",
    github: "https://github.com/SkAltmash/PathanTutorials",
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
    link: "https://flickstreamvtwo.netlify.app",
    github: "https://github.com/SkAltmash/flickstreembysk",
    technologies: [faHtml5, faCss3Alt, faJs, faGithub, faServer],
  },
  {
    slug: "pathan-tutorials",
    title: "Pathan Tutorials of Mathematics",
    image: "pathan-tutorials.png",
    description:
      "A real-world educational website built for Pathan Tutorials of Mathematics (Hinganghat). Showcases batches, contact info, courses, and modern design. Built with React and MailJS.",
    link: "https://pathtutorials.netlify.app",
    github: "https://github.com/SkAltmash/PathanTutorials",
    technologies: [faReact, faCss3Alt, faJs, faGithub],
  },
];

const Projects = () => {
  return (
    <section className="relative bg-black text-white min-h-screen py-16 px-6">
      {/* Header Section */}
      <div className="max-w-[600px] mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4" style={{ color: "#00ffff" }}>
          My Projects
        </h2>
        <p className="text-gray-400">
          A selection of my favorite work — modern, scalable, and crafted with
          passion.
        </p>
      </div>

      {/* Project Cards */}
      <div className="max-w-[600px] mx-auto grid grid-cols-1 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            className="bg-[#111] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            {/* Project Image */}
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-70 object-cover hover:scale-105 transition-transform duration-300"
              />
            </a>

            {/* Project Details */}
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-[#00ffff] mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Technologies Used */}
              <div className="flex flex-wrap gap-3 mb-4">
                {project.technologies.map((tech, idx) => (
                  <FontAwesomeIcon
                    key={idx}
                    icon={tech}
                    className="text-gray-200 text-xl"
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#00ffff] text-black rounded-lg hover:bg-cyan-400 transition"
                >
                  Live Demo
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
    </section>
  );
};

export default Projects;
