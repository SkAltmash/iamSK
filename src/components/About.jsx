import React from "react";
import { motion } from "framer-motion";

const ACCENT = "#15AABF";

const About = () => {
  return (
    <section className="relative bg-black text-gray-200 py-20 px-6 md:px-12 lg:px-16 w-screen">
      <motion.div
        className="max-w-[600px] mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          About <span style={{ color: ACCENT }}>Me</span>
        </h2>

        <p className="text-gray-400 leading-relaxed text-lg">
          I am a passionate developer who loves building seamless, interactive, and scalable web and mobile applications. With experience across frontend, backend, and modern development tools, I thrive on creating digital solutions that make an impact.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
