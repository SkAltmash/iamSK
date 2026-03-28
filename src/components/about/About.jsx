import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform, useInView } from "framer-motion";
import { Rocket, Code, Zap, Briefcase, GraduationCap, ExternalLink } from "lucide-react";

/* ------------------- UTILS & CONSTANTS ------------------- */

const EDUCATION_DATA = [
  {
    title: "Bachelor of Computer Applications",
    institution: "RAICSIT, Wardha (RTMNU)",
    duration: "2022 – 2025",
    image: "/RTMNU.jpg",
    grade: "Major: Software Engineering",
    desc: "Focusing on advanced data structures, cloud computing, and full-stack architecture."
  },
  {
    title: "Higher Secondary Certificate",
    institution: "Dr. B.R. Ambedkar Jr. College",
    duration: "2020 – 2022",
    image: "/ssc.webp",
    grade: "Computer Science Specialization",
    desc: "Achieved excellence in C++ programming and electronics foundations."
  }
];

/* ------------------- SUB-COMPONENTS ------------------- */

const CountUp = ({ to }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) spring.set(to);
  }, [isInView, to, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
};

const MultiTypewriter = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 70);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="font-mono text-cyan-400/90 tracking-tight">
      {words[index].substring(0, subIndex)}
      <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-5 ml-1 bg-cyan-500 align-middle" />
    </span>
  );
};

const ProCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
    setMouseY(e.clientY - rect.top);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-white/20 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(34, 211, 238, 0.1), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

/* ------------------- MAIN COMPONENT ------------------- */

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <section className="relative w-full min-h-screen py-24 bg-[#030303] text-white flex flex-col items-center px-6 overflow-hidden">

      {/* Background Layering */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05)_0%,transparent_50%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>

      <div className="max-w-5xl w-full relative z-10">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-8"
          >
            <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-b from-cyan-400 to-transparent shadow-2xl">
              <img src="/logo.png" alt="Profile" className="w-full h-full rounded-full object-cover bg-black" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4"
          >
            ALTAMASH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Sheikh</span>
          </motion.h1>

          <div className="h-6 mb-12">
            <MultiTypewriter words={["Full Stack Developer", "UI/UX Designer", "Software Architect", "Problem Solver"]} />
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-inner">
            {["about", "education"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-10 py-2.5 rounded-full text-sm font-bold transition-all duration-500 capitalize z-10
                  ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-white"}`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-cyan-400 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "about" ? (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Main Bio Card */}
                <ProCard className="md:col-span-3 p-8 md:p-12 text-center md:text-left">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-center md:justify-start">
                        <Briefcase className="text-cyan-400" size={24} /> The Mission
                      </h2>
                      <p className="text-gray-400 text-lg leading-relaxed italic">
                        "I don't just write code; I architect solutions that scale. My goal is to bridge the gap between human intuition and technical execution."
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                        Download CV
                      </button>
                    </div>
                  </div>
                </ProCard>

                {/* Stat Cards */}
                {[
                  { icon: Rocket, val: 3, label: "Years Experience", color: "text-orange-400" },
                  { icon: Code, val: 25, label: "Projects Delivered", color: "text-cyan-400" },
                  { icon: Zap, val: 12, label: "Modern Frameworks", color: "text-purple-400" },
                ].map((stat, i) => (
                  <ProCard key={i} className="p-8 flex flex-col items-center justify-center text-center group">
                    <stat.icon size={32} className={`${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
                    <div className="text-4xl font-black mb-1">
                      <CountUp to={stat.val} />+
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">{stat.label}</p>
                  </ProCard>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="education"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                {EDUCATION_DATA.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <ProCard className="p-6">
                      <div className="flex gap-6 items-start">
                        <div className="hidden sm:block p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                          <GraduationCap className="text-cyan-400" size={28} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-white">{edu.title}</h3>
                              <p className="text-cyan-400 font-medium">{edu.institution}</p>
                            </div>
                            <span className="text-xs font-mono py-1 px-3 bg-white/5 rounded-md border border-white/10 text-gray-400">
                              {edu.duration}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed mb-4">{edu.desc}</p>
                          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-cyan-500" />
                            {edu.grade}
                          </div>
                        </div>
                      </div>
                    </ProCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default About;