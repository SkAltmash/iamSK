import React from "react";
import { motion } from "framer-motion";
import Squares from "./Squares";
import RotatingText from "./RotatingText";
import TargetCursor from "./TargetCursor";
const Hero = () => {
  return (
    <div>
    
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
    <section className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden text-white">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <Squares
          speed={1}
          squareSize={80}
          direction="diagonal"
          borderColor="#ffffff"
          hoverFillColor="#00ffff"
        />
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-[600px] w-full text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Hi, I’m <span style={{ color: "#00ffff" }}>Altamash</span>
        </motion.h1>

        {/* Subheading with Rotating Text */}
        <motion.h2
          className="mt-4 text-2xl sm:text-3xl font-medium flex flex-wrap justify-center items-center gap-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span>
            I <span className="text-[#00ffff]">specialize</span> in
          </span>
          <RotatingText
            texts={["Coding", "Thinking", "Crafting", "Designing"]}
            mainClassName="px-3 py-1 bg-cyan-300 text-black rounded-lg"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Full Stack Developer & Designer crafting modern and minimal web
          experiences.
        </motion.p>

        {/* Quick Links (Two Buttons) */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a
            href="/projects"
            className="cursor-target px-5 py-2 border border-[#00ffff] rounded-lg text-black bg-[#00ffff] hover:text-black transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Work
          </motion.a>
          <motion.a
            href="/contact"
            className="cursor-target px-5 py-2 border border-[#00ffff] rounded-lg text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
    </div>
  );
};

export default Hero;
