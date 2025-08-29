import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "./CountUp";
import ElectricBorder from './ElectricBorder'
const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabContentVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <section
      className={`w-full ${
        activeTab === "about" ? "mt-25" : "mt-15"
      } min-h-screen bg-black text-white flex justify-center items-center px-4`}
    >
      <div className="max-w-[700px] w-full text-center">
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "about"
                ? "bg-[#00ffff] text-black"
                : "bg-[#111] text-gray-400 border border-[#00ffff] hover:bg-[#00ffff] hover:text-black"
            }`}
            onClick={() => setActiveTab("about")}
          >
            About Me
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "education"
                ? "bg-[#00ffff] text-black"
                : "bg-[#111] text-gray-400 border border-[#00ffff] hover:bg-[#00ffff] hover:text-black"
            }`}
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
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
                className="w-35 h-35 rounded-lg mx-auto mb-6  object-cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              </ElectricBorder>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                About <span style={{ color: "#00ffff" }}>Me</span>
              </h1>
              <h2 className="text-lg sm:text-xl font-medium text-gray-400 mb-6">
                Creative Thinker • Full Stack Developer • Problem Solver
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                I’m Altamash, a passionate full stack developer skilled in
                building both web and mobile applications. With expertise in
                React, React Native, Node.js, Firebase, and SQL, I transform
                innovative ideas into scalable, high-performance solutions that
                deliver seamless user experiences.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#00ffff]">
                    <CountUp from={0} to={3} duration={1} />+
                  </span>
                  <span className="text-sm text-gray-400">Years Learning</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#00ffff]">
                    <CountUp from={0} to={15} duration={1} />+
                  </span>
                  <span className="text-sm text-gray-400">
                    Projects Completed
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-[#00ffff]">
                    <CountUp from={0} to={10} duration={1} />+
                  </span>
                  <span className="text-sm text-gray-400">
                    Full Stack Technologies
                  </span>
                </div>
              </div>
              <a
                href="/contact"
                className="inline-block px-8 py-3 rounded-full text-black font-medium"
                style={{ backgroundColor: "#00ffff" }}
              >
                Let’s Connect
              </a>
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
              className="text-left"
            >
              <h1 className="text-3xl font-bold mb-6 text-center">
                Education <span style={{ color: "#00ffff" }}>Journey</span>
              </h1>
              <ul className="space-y-4">
                <li className="bg-[#111] p-4 rounded-lg flex gap-4 items-center">
                  <img
                    src="SSC - Maharashtra Board.webp"
                    alt="SSC - Maharashtra Board"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-[#00ffff]">
                      SSC - Maharashtra Board
                    </h2>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                   Sangay Gandhi High School, Hinganghat
                    </p>
                    <p className="text-gray-400 text-sm">Completed: 2019</p>
                  </div>
                </li>

                <li className="bg-[#111] p-4 rounded-lg flex gap-4 items-center">
                    <img
                    src="SSC - Maharashtra Board.webp"
                    alt="SSC - Maharashtra Board"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-[#00ffff]">
                      HSC (CS) - Maharashtra Board
                    </h2>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                   Dr. B.R. Ambedkar Jr. College,
                      Hinganghat
                    </p>
                    <p className="text-gray-400 text-sm">Completed: 2021</p>
                  </div>
                </li>

                <li className="bg-[#111] p-4 rounded-lg flex gap-4 items-center">
                  <img
                    src="RTMNU.jpg"
                    alt="RTMNU Nagpur"
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-[#00ffff]">
                      BCA - RTMNU University
                    </h2>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                     RAICSIT, Wardha
                    </p>
                    <p className="text-gray-400 text-sm">
                      Duration: 2022 – 2026 (Currently in 3rd Year)
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
