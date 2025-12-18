import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    /* Progress animation */
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 60); // ~3 sec

    /* Redirect */
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <section className="relative min-h-screen bg-black flex flex-col justify-center items-center overflow-hidden">

      {/* 🌈 Subtle Background Glow */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[500px] h-[500px] bg-cyan-400/10 blur-[160px] rounded-full" />
      </div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo */}
        <motion.img
          src="logo.png"
          alt="Altamash Logo"
          className="w-28 h-28 mb-10"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />

        {/* Loading Text */}
        <motion.p
          className="text-gray-400 text-sm tracking-widest mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          LOADING EXPERIENCE
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Percentage */}
        <motion.span
          className="mt-3 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress}%
        </motion.span>
      </motion.div>

      {/* Bottom Hint */}
      <motion.span
        className="absolute bottom-6 text-gray-600 text-xs"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        Preparing your experience…
      </motion.span>
    </section>
  );
};

export default Splash;
