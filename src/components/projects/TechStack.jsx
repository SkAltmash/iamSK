import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FaLayerGroup, FaServer, FaTools, FaCode } from "react-icons/fa";

const TechStack = () => {
  const [activeTab, setActiveTab] = useState("All");

  const techStack = [
    {
      category: "Frontend",
      icon: <FaCode />,
      skills: [
        { name: "React", level: 90, icon: <SiReact />, color: "#61DAFB" },
        { name: "React Native", level: 80, icon: <SiReact />, color: "#61DAFB" }, // Using React icon for Native
        { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "JavaScript", level: 85, icon: <SiJavascript />, color: "#F7DF1E" },
        { name: "TypeScript", level: 70, icon: <SiTypescript />, color: "#3178C6" },
      ],
    },
    {
      category: "Backend",
      icon: <FaServer />,
      skills: [
        { name: "Node.js", level: 85, icon: <SiNodedotjs />, color: "#339933" },
        { name: "Express", level: 80, icon: <SiExpress />, color: "#ffffff" },
        { name: "Firebase", level: 90, icon: <SiFirebase />, color: "#FFCA28" },
        { name: "MongoDB", level: 75, icon: <SiMongodb />, color: "#47A248" },
      ],
    },
    {
      category: "Tools",
      icon: <FaTools />,
      skills: [
        { name: "Git", level: 85, icon: <SiGit />, color: "#F05032" },
        { name: "GitHub", level: 85, icon: <SiGithub />, color: "#ffffff" },
        { name: "Netlify", level: 80, icon: <SiNetlify />, color: "#00C46A" },
        { name: "Postman", level: 75, icon: <SiPostman />, color: "#FF6C37" },
      ],
    },
  ];

  const tabs = ["All", "Frontend", "Backend", "Tools"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      
      {/* 🔹 SLIDING TAB NAVIGATION */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 z-10 ${
                activeTab === tab ? "text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyan-400 rounded-full -z-10 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 SKILLS GRID */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {techStack
            .filter(
              (section) => activeTab === "All" || section.category === activeTab
            )
            .map((section, sectionIndex) => (
              <motion.div
                key={section.category}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-colors duration-500 group/card relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                  <div className="p-2 bg-cyan-400/10 rounded-lg text-cyan-400">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {section.category}
                  </h3>
                </div>

                {/* Skill List */}
                <div className="space-y-6">
                  {section.skills.map((skill, index) => (
                    <div key={skill.name} className="group/skill">
                      <div className="flex justify-between items-center mb-2">
                        {/* Icon & Name */}
                        <div className="flex items-center gap-3">
                          <span
                            className="text-2xl text-gray-500 transition-colors duration-300 group-hover/skill:text-white"
                            style={{
                              filter: "grayscale(100%)",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = "none";
                              e.currentTarget.style.color = skill.color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = "grayscale(100%)";
                              e.currentTarget.style.color = ""; // reset to class styling
                            }}
                          >
                            {skill.icon}
                          </span>
                          <span className="font-medium text-gray-300 group-hover/skill:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        {/* Percentage Text */}
                        <span className="text-xs font-mono text-gray-500">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar Container */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full rounded-full relative"
                          style={{ 
                            backgroundColor: "rgb(34, 211, 238)", // Cyan-400
                            boxShadow: "0 0 10px rgba(34, 211, 238, 0.5)" 
                          }}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite] skew-x-12 -translate-x-full" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Background Glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover/card:bg-cyan-500/10 transition-colors duration-500" />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TechStack;