import React from "react";
import { motion } from "framer-motion";
import CountUp from './CountUp';

const About = () => {
  return (
    <section className="w-full mt-18 min-h-screen bg-black text-white flex justify-center items-center px-4">
      <div className="max-w-[600px] w-full text-center">
        {/* Profile Photo */}
        <motion.img
          src="logo.png" // Replace with your actual photo path
          alt="Altamash"
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-[#00ffff] object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          About <span style={{ color: "#00ffff" }}>Me</span>
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          className="text-lg sm:text-xl font-medium text-gray-400 mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Creative Thinker • Full Stack Developer • Problem Solver
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          I’m Altamash, a passionate full stack developer skilled in building
          both web and mobile applications. With expertise in React, React
          Native, Node.js, Firebase, and SQL, I transform innovative ideas into
          scalable, high-performance solutions that deliver seamless user
          experiences.
        </motion.p>

        {/* Highlights / Stats */}
        <motion.div
          className="grid grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {/* Years of Experience */}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#00ffff]">
              <CountUp from={0} to={3} duration={1} className="count-up-text" />+
            </span>
            <span className="text-sm text-gray-400">Years Learning</span>
          </div>

          {/* Projects Completed */}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#00ffff]">
              <CountUp from={0} to={15} duration={1} className="count-up-text" />+
            </span>
            <span className="text-sm text-gray-400">Projects Completed</span>
          </div>

          {/* Full Stack Technologies */}
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-[#00ffff]">
              <CountUp from={0} to={10} duration={1} className="count-up-text" />+
            </span>
            <span className="text-sm text-gray-400">Full Stack Technologies</span>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.a
          href="/contact"
          className="inline-block px-8 py-3 rounded-full text-black font-medium"
          style={{ backgroundColor: "#00ffff" }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          Let’s Connect
        </motion.a>
      </div>
    </section>
  );
};

export default About;
