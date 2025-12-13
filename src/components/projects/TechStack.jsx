import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiGit,
  SiGithub,
  SiNetlify,
  SiPostman,
} from "react-icons/si";

const TechStack = () => {
  const [skillFilter, setSkillFilter] = useState("All");

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
        { name: "Express", level: 80, icon: <SiExpress />, color: "#ffffff" },
        { name: "Firebase", level: 90, icon: <SiFirebase />, color: "#FFCA28" },
        { name: "MongoDB", level: 75, icon: <SiMongodb />, color: "#47A248" },
      ],
    },
    {
      category: "Tools",
      skills: [
        { name: "Git", level: 85, icon: <SiGit />, color: "#F05032" },
        { name: "GitHub", level: 85, icon: <SiGithub />, color: "#ffffff" },
        { name: "Netlify", level: 80, icon: <SiNetlify />, color: "#00C46A" },
        { name: "Postman", level: 75, icon: <SiPostman />, color: "#FF6C37" },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
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
        {techStack
          .filter(
            (section) =>
              skillFilter === "All" || section.category === skillFilter
          )
          .map((section, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/40 transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                        <span
                          className="text-xl"
                          style={{ color: skill.color }}
                        >
                          {skill.icon}
                        </span>
                        <span className="font-medium">{skill.name}</span>
                      </div>

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
  );
};

export default TechStack;
