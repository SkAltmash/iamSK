import React, { useState } from "react";
import ClientProjects from "./projects/ClientProjects";
import PersonalProjects from "./projects/PersonalProjects";
import Certificates from "./projects/Certificates";
import TechStack from "./projects/TechStack";

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
            className={`px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap
              ${
                activeTab === tab.key
                  ? "bg-[#00ffff] text-black"
                  : "border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "client" && <ClientProjects />}

      {activeTab === "projects" && <PersonalProjects />}

      {activeTab === "certificates" && <Certificates />}

      {activeTab === "techstack" && <TechStack />}
    </section>
  );
};

export default Projects;
