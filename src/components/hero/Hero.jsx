import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import RotatingText from "./RotatingText";

/* ---------------- Magnetic Wrapper ---------------- */
const Magnetic = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    };

    const reset = () => (el.style.transform = "translate(0,0)");

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div ref={ref} className="inline-block transition-transform duration-150">
      {children}
    </div>
  );
};

// Simple Typewriter Effect
const Typewriter = ({ text, speed = 80 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-cyan-400"
      >
        |
      </motion.span>
    </span>
  );
};

// Clean Floating Particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
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
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// Simple Social Links
const SocialLinks = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/SkAltmash", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/skaltamash18", label: "LinkedIn" },
    { icon: Mail, href: "mailto:skaltmash3@gmail.com", label: "Email" },
  ];

  return (
    <motion.div
      className="flex gap-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-black/50 backdrop-blur-sm border border-cyan-400/20 rounded-full text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </motion.div>
  );
};



const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const glowRef = useRef(null);

  /* Cursor Glow Effect */
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

      {/* Cursor Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-0 w-72 h-72 bg-cyan-500/20 blur-[140px] rounded-full -translate-x-1/2 -translate-y-1/2"
      />

      {/* Clean Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <FloatingParticles />

        {/* Center Spotlight */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px]" />
        </div>

        {/* Simple Gradient Blobs */}
        <motion.div
          className="absolute -top-32 -left-32 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-140px] right-[-140px] w-[350px] h-[350px] bg-blue-500/20 rounded-full blur-[110px]"
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-[700px] w-full text-center px-4"
        initial={!prefersReducedMotion && { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        

        {/* Heading with Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-2">
            <Typewriter text="Hi, I'm Altamash" />
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.h2
          className="mt-4 text-xl sm:text-2xl lg:text-3xl font-medium flex flex-wrap justify-center items-center gap-2 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>I <span className="text-cyan-400 font-semibold">specialize</span> in</span>
          <RotatingText
            texts={["Full Stack Development", "Modern UI/UX Design", "Creative Problem Solving", "Scalable Solutions"]}
            mainClassName="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg font-semibold"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Full Stack Developer & Designer crafting modern and minimal web experiences
          with cutting-edge technologies.
        </motion.p>

        {/* Social Links */}
        <SocialLinks />

        {/* Action Buttons */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <Magnetic>
            <Link
              to="/projects"
              className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
            >
              View My Work
            </Link>
          </Magnetic>

          <Magnetic>
            <Link
              to="/contact"
              className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 rounded-xl"
            >
              Get In Touch
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
    </section>
  );
};

export default Hero;
