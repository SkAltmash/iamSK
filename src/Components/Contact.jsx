import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ignny5q",
        "template_lto1r2d",
        form.current,
        "dce5ax0pBBQNz2sE-"
      )
      .then(() => {
        setSent(true);
        form.current.reset();
        setLoading(false);
        setTimeout(() => setSent(false), 5000);
      })
      .catch((error) => {
        console.error("FAILED TO SEND", error);
        alert("Something went wrong. Please try again.");
        setLoading(false);
      });
  };

  // Motion variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const inputVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };

  const iconVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <section id="contact" className="py-20 w-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0" />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-white"
          variants={fadeUpVariant}
        >
          Send a <span className="text-[#15AABF]"> Message</span> 
        </motion.h2>

        {/* Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6 bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20"
          variants={staggerContainer}
        >
          <motion.div variants={inputVariant}>
            <label htmlFor="user_name" className="block mb-1 text-[#15AABF]">Your Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              required
              className="w-full p-3 rounded-lg bg-black/70 text-white border border-[#15AABF] focus:outline-none focus:ring-2 focus:ring-[#15AABF] focus:border-[#15AABF] transition"
            />
          </motion.div>

          <motion.div variants={inputVariant}>
            <label htmlFor="user_email" className="block mb-1 text-[#15AABF]">Your Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              required
              className="w-full p-3 rounded-lg bg-black/70 text-white border border-[#15AABF] focus:outline-none focus:ring-2 focus:ring-[#15AABF] focus:border-[#15AABF] transition"
            />
          </motion.div>

          <motion.div variants={inputVariant}>
            <label htmlFor="message" className="block mb-1 text-[#15AABF]">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full p-3 rounded-lg bg-black/70 text-white border border-[#15AABF] focus:outline-none focus:ring-2 focus:ring-[#15AABF] focus:border-[#15AABF] transition"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-[#15AABF] hover:bg-[#1297a8]'
            } text-white`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeUpVariant}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane /> Send Your Message
              </>
            )}
          </motion.button>

          {sent && (
            <motion.p
              className="text-green-400 text-center font-medium mt-4"
              variants={fadeUpVariant}
            >
              Message launched successfully!
            </motion.p>
          )}
        </motion.form>

        {/* Social Icons */}
        <div className="mt-12 text-center space-y-4">
          <motion.p
            className="text-gray-300"
            variants={fadeUpVariant}
          >
            Or connect with me on:
          </motion.p>
          <div className="flex justify-center gap-6 text-white text-2xl">
            {[FaEnvelope, FaLinkedin, FaGithub].map((Icon, i) => (
              <motion.a
                key={i}
                href={i === 0 ? "mailto:skaltmash3@gmail.com" : i === 1 ? "https://linkedin.com/in/altamash-sheikh-1ba6a72aa" : "https://github.com/SkAltmash"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#15AABF] transition"
                custom={i}
                variants={iconVariant}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
