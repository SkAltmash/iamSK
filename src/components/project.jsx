import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientProjects from "./projects/ClientProjects";
import Certificates from "./projects/Certificates";
import TechStack from "./projects/TechStack";
import { Helmet } from "react-helmet-async";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("client");

  const tabs = [
    { key: "client", label: "Client Work" },
    { key: "certificates", label: "Achievements" },
    { key: "techstack", label: "Tech Stack" },
  ];

  return (
    <section className="relative bg-[#050505] text-white min-h-screen py-15 px-4 overflow-hidden">
      <Helmet>
        <title>Projects & Achievements | Altamash Sheikh</title>
        <meta name="description" content="Explore a curated showcase of client work, full-stack applications, and React Native mobile apps built by Altamash Sheikh, alongside tech stack details and professional achievements." />
        <meta name="keywords" content="Altamash Sheikh Projects, Client Work, Portfolio Projects, POS Systems, React Native Apps, Achievements, Certificates" />
        <link rel="canonical" href="https://www.altamash.xyz/projects" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.altamash.xyz/projects" />
        <meta property="og:title" content="Projects & Achievements | Altamash Sheikh" />
        <meta property="og:description" content="Explore a curated showcase of client work, full-stack applications, and React Native mobile apps built by Altamash Sheikh." />
        <meta property="og:image" content="https://www.altamash.xyz/logo.png" />
      </Helmet>

      {/* 🔹 Background Decor (Subtle Glows) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">


        {/* 🔹 SLIDING TABS NAVIGATION */}
        <div className="flex justify-center mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-0 bg-white/5 p-1.5 rounded-2xl sm:rounded-full border border-white/10 backdrop-blur-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-2.5 rounded-xl sm:rounded-full text-sm font-semibold transition-colors duration-300 z-10 flex-1 sm:flex-none text-center
                  ${activeTab === tab.key ? "text-black" : "text-gray-400 hover:text-white"}`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="activeTabMain"
                    className="absolute inset-0 bg-cyan-400 rounded-xl sm:rounded-full -z-10 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🔹 ANIMATED CONTENT AREA */}
        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "client" && <ClientProjects />}
              {activeTab === "certificates" && <Certificates />}
              {activeTab === "techstack" && <TechStack />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Projects;