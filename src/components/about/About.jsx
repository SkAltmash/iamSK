import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Rocket, Code, Zap } from "lucide-react";
import CountUp from "./CountUp";
import ElectricBorder from './ElectricBorder'

// Typewriter Effect Component
const Typewriter = ({ text, speed = 50, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed]);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setCurrentIndex(0);
      setDisplayText('');
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [delay]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-[#00ffff]"
      >
        |
      </motion.span>
    </span>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-[#00ffff] rounded-full opacity-30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Interactive Stat Card
const StatCard = ({ value, label, icon, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-2xl border border-[#00ffff]/20 hover:border-[#00ffff]/50 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl mb-2 text-[#00ffff]"
      >
        {icon}
      </motion.div>
      <span className="text-3xl font-bold text-[#00ffff] mb-1">
        <CountUp from={0} to={value} duration={2} />
        {label.includes('+') ? '+' : ''}
      </span>
      <span className="text-sm text-gray-400 text-center">{label.replace('+', '')}</span>
    </motion.div>
  );
};

// Timeline Component for Education
const TimelineItem = ({ item, index, isLast }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      className="relative flex items-start mb-8"
      initial={{ opacity: 0, x: -50 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline Line */}
      <div className="flex flex-col items-center mr-6">
        <motion.div
          className="w-4 h-4 bg-[#00ffff] rounded-full border-4 border-black"
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        />
        {!isLast && (
          <motion.div
            className="w-0.5 h-16 bg-gradient-to-b from-[#00ffff] to-transparent mt-2"
            initial={{ height: 0 }}
            animate={isVisible ? { height: 64 } : { height: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="bg-gradient-to-r from-[#111] to-[#0a0a0a] p-6 rounded-2xl border border-[#00ffff]/20 flex-1 hover:border-[#00ffff]/50 transition-all duration-300"
        whileHover={{ scale: 1.02, x: 10 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-start gap-4">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 rounded-lg object-cover"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#00ffff] mb-1">{item.title}</h3>
            <p className="text-gray-300 text-sm mb-1">{item.institution}</p>
            <p className="text-gray-400 text-xs">{item.duration}</p>
            {item.grade && (
              <motion.div
                className="mt-2 inline-block px-3 py-1 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full text-xs text-[#00ffff]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 1 }}
              >
                {item.grade}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabContentVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <section className="relative w-full mt-25 pt-5 min-h-screen bg-black text-white flex justify-center items-center px-4 overflow-hidden">
      <FloatingParticles />

      <div className="max-w-[700px] w-full text-center relative z-10">
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          <motion.button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "about"
                ? "bg-[#00ffff] text-black shadow-lg shadow-[#00ffff]/50"
                : "bg-[#111] text-gray-400 border border-[#00ffff] hover:bg-[#00ffff] hover:text-black"
            }`}
            onClick={() => setActiveTab("about")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About Me
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === "education"
                ? "bg-[#00ffff] text-black shadow-lg shadow-[#00ffff]/50"
                : "bg-[#111] text-gray-400 border border-[#00ffff] hover:bg-[#00ffff] hover:text-black"
            }`}
            onClick={() => setActiveTab("education")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Education
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div
              key="about"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
            >
              <ElectricBorder
                color="#7df9ff"
                speed={1}
                chaos={0.5}
                thickness={2}
                className="w-35 h-35 mx-auto mb-2"
              >
                <motion.img
                  src="logo.png"
                  alt="Altamash"
                  className="w-35 h-35 rounded-lg mx-auto mb-6 object-cover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                />
              </ElectricBorder>

              <motion.h1
                className="text-4xl sm:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                About <span style={{ color: "#00ffff" }}>Me</span>
              </motion.h1>

              <motion.h2
                className="text-lg sm:text-xl font-medium text-gray-400 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Typewriter
                  text="Creative Thinker • Full Stack Developer • Problem Solver"
                  speed={100}
                  delay={800}
                />
              </motion.h2>

              <motion.p
                className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                I&apos;m Altamash, a passionate full stack developer skilled in
                building both web and mobile applications. With expertise in
                React, React Native, Node.js, Firebase, and SQL, I transform
                innovative ideas into scalable, high-performance solutions that
                deliver seamless user experiences.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <StatCard
                  value={3}
                  label="Years Learning+"
                  icon={<Rocket className="w-6 h-6" />}
                  delay={1.0}
                />
                <StatCard
                  value={15}
                  label="Projects Completed+"
                  icon={<Code className="w-6 h-6" />}
                  delay={1.2}
                />
                <StatCard
                  value={10}
                  label="Full Stack Technologies+"
                  icon={<Zap className="w-6 h-6" />}
                  delay={1.4}
                />
              </motion.div>

              <motion.a
                href="/contact"
                className="inline-block px-8 py-3 rounded-full text-black font-medium shadow-lg"
                style={{ backgroundColor: "#00ffff" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Connect
              </motion.a>
            </motion.div>
          )}

          {activeTab === "education" && (
            <motion.div
              key="education"
              variants={tabContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="text-left max-w-4xl mx-auto"
            >
              <motion.h1
                className="text-3xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Education <span style={{ color: "#00ffff" }}>Journey</span>
              </motion.h1>

              <div className="relative">
                {[
                  {
                    title: "Bachelor of Computer Applications (BCA)",
                    institution: "RAICSIT, Wardha - RTMNU University",
                    duration: "2022 – 2026 (Currently in 3rd Year)",
                    image: "RTMNU.jpg",
                    grade: "Pursuing"
                  },
                  {
                    title: "HSC (Computer Science)",
                    institution: "Dr. B.R. Ambedkar Jr. College, Hinganghat",
                    duration: "Completed: 2021",
                    image: "SSC - Maharashtra Board.webp",
                    grade: "CS Stream"
                  },
                  {
                    title: "SSC - Maharashtra Board",
                    institution: "Sangay Gandhi High School, Hinganghat",
                    duration: "Completed: 2019",
                    image: "SSC - Maharashtra Board.webp",
                    grade: "Distinction"
                  }
                ].map((item, index) => (
                  <TimelineItem
                    key={index}
                    item={item}
                    index={index}
                    isLast={index === 2}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
