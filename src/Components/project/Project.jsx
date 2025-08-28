import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projectsItems = [
  { 
    image: "/ZapSplit.jpg", 
    text: "ZapSplit", 
    live: "https://zapsplit.netlify.app", 
    github: "https://github.com/SkAltmash/ZapSplit", 
    id: "1" 
  },
  { 
    image: "/flickstreamV2.png", 
    text: "FlickstreamV2", 
    live: "https://flickstreamvtwo.netlify.app", 
    github: "https://github.com/SkAltmash/FlickStreamV2", 
    id: "2" 
  },
  { 
    image: "/trendora.png", 
    text: "Trendora", 
    live: "https://astrendora.netlify.app", 
    github: "https://github.com/SkAltmash/Trendora", 
    id: "3" 
  },
  { 
    image: "/flickstreamV1.png", 
    text: "FlickstreamV1", 
    live: "https://flickstreamvtwo.netlify.app", 
    github: "https://github.com/SkAltmash/flickstreembysk", 
    id: "4" 
  },
  { 
    image: "/pathan-tutorials.png", 
    text: "Pathan Tutorials", 
    live: "https://pathan-tutorials.netlify.app/", 
    github: "https://github.com/SkAltmash/pathan-tutorials--website", 
    id: "5" 
  },
];

function Project() {
  return (
    <section id="projects" className="w-screen bg-black py-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          My <span className="text-[#15AABF]">Projects</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          A selection of my featured work with live demos & GitHub links
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-10">
        {projectsItems.map((project) => (
          <div
            key={project.id}
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col"
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.text}
              className="w-full h-60 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
            />

            {/* Project info */}
            <div className="p-4 flex justify-between gap-2 items-center">
              <h2 className="text-lg font-semibold text-white">{project.text}</h2>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#15AABF] text-2xl transition"
                    title="GitHub"
                  >
                    <FaGithub />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#15AABF] text-2xl transition"
                    title="Live Demo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Project;
