import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import RotatingText from "./RotatingText";
import LiquidEther from "./LiquidEther";

/* ---------------- Magnetic Button ---------------- */
const Magnetic = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const reset = () => {
      el.style.transform = "translate(0,0)";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={ref} className="inline-block transition-transform duration-150">
      {children}
    </div>
  );
};

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const glowRef = useRef(null);

  /* 🌈 Cursor Glow */
  useEffect(() => {
    const move = (e) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative w-full h-screen flex justify-center items-center bg-black overflow-hidden text-white">

      {/* 🌈 Cursor Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-80 h-80 bg-cyan-500/20 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2"
      />

      {/* 🌊 Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={["#22D3EE", "#67E8F9", "#A5F3FC"]}
          mouseForce={20}
          cursorSize={100}
          resolution={0.5}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10 max-w-[640px] w-full text-center px-4"
        initial={!prefersReducedMotion && { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hi, I’m{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Altamash
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.h2
          className="mt-5 text-2xl sm:text-3xl font-medium flex flex-wrap justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span>I specialize in</span>
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Full Stack Developer crafting modern, fast & scalable digital
          experiences.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Magnetic>
            <Link
              to="/projects"
              className="px-6 py-3 rounded-xl bg-cyan-400 text-black font-medium hover:scale-105 transition"
            >
              View Work
            </Link>
          </Magnetic>

          <Magnetic>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
            >
              Contact Me
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
