import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Rocket, Code, Zap, GraduationCap, Briefcase, Award } from "lucide-react";

/* ------------------- SUB-COMPONENTS ------------------- */

// 1. Internal CountUp Component (Smooth Numbers)
const CountUp = ({ to }) => {
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(to);
  }, [spring, to]);

  return <motion.span>{display}</motion.span>;
};

// 2. Typewriter Effect
const Typewriter = ({ text, delay = 0 }) => {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className="font-mono">
      {displayed}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="text-cyan-400 ml-1"
      >
        |
      </motion.span>
    </span>
  );
};

// 3. Stat Card with Hover Glow
const StatCard = ({ value, label, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -5 }}
    className="relative group bg-white/5 border border-white/10 p-6 rounded-2xl overflow-hidden"
  >
    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    
    <div className="relative z-10 flex flex-col items-center">
      <div className="p-3 bg-cyan-500/20 text-cyan-400 rounded-lg mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1 flex">
        <CountUp to={value} />
        <span className="text-cyan-400">+</span>
      </div>
      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  </motion.div>
);

// 4. Timeline Item (Education)
const TimelineItem = ({ item, index, isLast }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
    className="relative pl-8 pb-12 group"
  >
    {/* Connecting Line */}
    {!isLast && (
      <div className="absolute left-[11px] top-4 bottom-0 w-0.5 bg-white/10 group-hover:bg-cyan-500/50 transition-colors duration-500">
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
          className="w-full bg-cyan-400 origin-top"
        />
      </div>
    )}

    {/* Dot */}
    <div className="absolute left-0 top-1.5 w-6 h-6 bg-[#0a0a0a] border-2 border-cyan-500 rounded-full flex items-center justify-center z-10 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
      <div className="w-2 h-2 bg-cyan-400 rounded-full" />
    </div>

    {/* Card Content */}
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-500/30 transition-all duration-300 hover:bg-white/10">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <img 
          src={item.image} 
          alt={item.institution} 
          className="w-12 h-12 rounded-lg object-cover bg-white/10"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <p className="text-cyan-400 text-sm font-medium">{item.institution}</p>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/5 whitespace-nowrap">
            {item.duration}
          </span>
          <div className="mt-1 text-xs text-gray-500 text-right">{item.grade}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ------------------- MAIN COMPONENT ------------------- */

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 bg-[#050505] text-white flex justify-center items-center px-4 overflow-hidden">
      
      {/* 🔹 Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10">
        
        {/* 🔹 Glass Container */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          
          {/* Header Section */}
          <div className="p-8 pb-0 text-center">
            {/* Animated Profile Glow */}
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 opacity-70 blur-md group-hover:opacity-100 transition-opacity"
              />
              <div className="relative w-full h-full rounded-full p-[2px] bg-black overflow-hidden">
                 <img
                  src="logo.png"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
            </h1>
            
            <div className="h-8 mb-8 text-gray-400">
               <Typewriter text="Creative Thinker • Full Stack Dev • Problem Solver" delay={500} />
            </div>

            {/* 🔹 Sliding Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
                {["about", "education"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-8 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 z-10 capitalize
                      ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-cyan-400 rounded-full -z-10 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 🔹 Dynamic Content Area */}
          <div className="p-8 pt-2 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* ABOUT TAB */}
              {activeTab === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <p className="text-gray-300 text-lg leading-relaxed text-center max-w-2xl mx-auto">
                    I&apos;m <span className="text-cyan-400 font-semibold">Altamash</span>, a passionate full stack developer crafting modern web & mobile experiences. 
                    I bridge the gap between complex backend logic and sleek frontend design.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <StatCard 
                      value={3} 
                      label="Years Exp" 
                      icon={<Rocket size={24} />} 
                      delay={0.1} 
                    />
                    <StatCard 
                      value={15} 
                      label="Projects" 
                      icon={<Code size={24} />} 
                      delay={0.2} 
                    />
                    <StatCard 
                      value={10} 
                      label="Tech Stack" 
                      icon={<Zap size={24} />} 
                      delay={0.3} 
                    />
                  </div>

                  <div className="text-center pt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-transform active:scale-95"
                    >
                      <Briefcase size={18} /> Let&apos;s Work Together
                    </a>
                  </div>
                </motion.div>
              )}

              {/* EDUCATION TAB */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl mx-auto"
                >
                  {[
                    {
                      title: "Bachelor of Computer Applications",
                      institution: "RAICSIT, Wardha (RTMNU)",
                      duration: "2022 – Present",
                      image: "RTMNU.jpg",
                      grade: "Pursuing"
                    },
                    {
                      title: "Higher Secondary Certificate",
                      institution: "Dr. B.R. Ambedkar Jr. College",
                      duration: "2021",
                      image: "SSC - Maharashtra Board.webp",
                      grade: "Computer Science"
                    },
                    {
                      title: "Secondary School Certificate",
                      institution: "Sangay Gandhi High School",
                      duration: "2019",
                      image: "SSC - Maharashtra Board.webp",
                      grade: "Distinction"
                    }
                  ].map((item, index, arr) => (
                    <TimelineItem 
                      key={index} 
                      item={item} 
                      index={index} 
                      isLast={index === arr.length - 1} 
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;