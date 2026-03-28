import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import {
  SiReact, SiTailwindcss, SiJavascript, SiTypescript,
  SiNodedotjs, SiExpress, SiFirebase, SiMongodb,
  SiGit, SiGithub, SiNetlify, SiPostman,
} from "react-icons/si";
import { FaLayerGroup, FaServer, FaTools, FaCode, FaSpinner } from "react-icons/fa";

// Icon map
const ICON_MAP = {
  React: <SiReact />,
  "React Native": <SiReact />,
  "Tailwind CSS": <SiTailwindcss />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  "Node.js": <SiNodedotjs />,
  Express: <SiExpress />,
  Firebase: <SiFirebase />,
  MongoDB: <SiMongodb />,
  Git: <SiGit />,
  GitHub: <SiGithub />,
  Netlify: <SiNetlify />,
  Postman: <SiPostman />,
};

const CATEGORY_ICONS = {
  Frontend: <FaCode />,
  Backend: <FaServer />,
  Tools: <FaTools />,
};

const CATEGORIES = ["All", "Frontend", "Backend", "Tools"];

const TechStack = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "techStack"), orderBy("order", "asc"));
      const snap = await getDocs(q);
      setSkills(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };
    fetch();
  }, []);

  // Group skills by category
  const grouped = CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  const displayGroups =
    activeTab === "All"
      ? CATEGORIES.slice(1).map((cat) => ({ category: cat, skills: grouped[cat] || [] })).filter((g) => g.skills.length > 0)
      : [{ category: activeTab, skills: grouped[activeTab] || [] }];

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-10 flex justify-center">
        <FaSpinner className="text-cyan-400 text-3xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md overflow-x-auto">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300 z-10 whitespace-nowrap ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-white"
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

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {displayGroups.map((group) => (
            <motion.div
              key={group.category}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-colors duration-500 group/card relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
                <div className="p-2 bg-cyan-400/10 rounded-lg text-cyan-400">
                  {CATEGORY_ICONS[group.category] || <FaLayerGroup />}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">{group.category}</h3>
              </div>

              <div className="space-y-6">
                {group.skills.map((skill, index) => (
                  <div key={skill.id} className="group/skill">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-2xl text-gray-500 transition-all duration-300 group-hover/skill:text-white"
                          style={{ filter: "grayscale(100%)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.filter = "none";
                            e.currentTarget.style.color = skill.color || "#22d3ee";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.filter = "grayscale(100%)";
                            e.currentTarget.style.color = "";
                          }}
                        >
                          {ICON_MAP[skill.name] || <FaCode />}
                        </span>
                        <span className="font-medium text-gray-300 group-hover/skill:text-white transition-colors">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: skill.color || "rgb(34, 211, 238)",
                          boxShadow: `0 0 10px ${skill.color || "rgba(34, 211, 238, 0.5)"}40`,
                        }}
                      />
                    </div>
                  </div>
                ))}
                {group.skills.length === 0 && (
                  <p className="text-gray-600 text-sm">No skills in this category yet.</p>
                )}
              </div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover/card:bg-cyan-500/10 transition-colors duration-500" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TechStack;