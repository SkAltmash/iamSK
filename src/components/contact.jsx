import React, { useRef, useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane, FaDownload } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Reusable Contact Card Component
const ContactCard = ({ Icon, title, description, link, linkText, subText, href, external }) => (
  <motion.div
    className="flex items-center gap-4 border border-[#00ffff]/40 p-4 rounded-xl hover:border-[#00ffff] hover:bg-[#00ffff]/10 transition cursor-pointer"
    whileHover={{ scale: 1.05 }}
  >
    <Icon className="text-[#00ffff] h-8 w-8" />
    <div>
      <p className="text-gray-100 text-sm">{description}</p>
      <a
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : undefined}
        className="flex items-center gap-3 hover:text-[#00ffff] text-lg font-medium transition"
      >
        {linkText}
      </a>
      <p className="text-gray-100 text-sm">{subText}</p>
    </div>
  </motion.div>
);

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_ignny5q", // Replace with your service ID
        "template_lto1r2d", // Replace with your template ID
        form.current,
        "dce5ax0pBBQNz2sE-" // Replace with your public key
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

  return (
    <section id="contact" className="relative pt-25 py-20 bg-black text-white">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      >
        <h2 className="text-4xl font-bold">
          Get In <span className="text-[#00ffff]">Touch</span>
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Ready to bring your next project to life? Let's create something extraordinary together.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left Column: Let's Connect */}
        <motion.div
          className="bg-gradient-to-br from-black/40 to-gray-900/40 p-8 rounded-2xl border border-[#00ffff]/20 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
        >
          <h3 className="text-3xl font-bold mb-6 text-[#00ffff]">Let's Connect</h3>
          <p className="text-gray-300 mb-6 text-lg">
            I'm always excited to discuss new opportunities, innovative projects, or potential collaborations.
            Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
          </p>

          <div className="space-y-4">
            <ContactCard
              Icon={FaEnvelope}
              description="Drop me a line anytime"
              linkText="skaltmash3@gmail.com"
              subText="Email"
              href="mailto:skaltmash3@gmail.com"
              external={false}
            />
            <ContactCard
              Icon={FaLinkedin}
              description="Connected professionally"
              linkText="skaltamash18"
              subText="LinkedIn Profile"
              href="https://linkedin.com/in/altamash-sheikh-1ba6a72aa"
              external={true}
            />
            <ContactCard
              Icon={FaGithub}
              description="See Code"
              linkText="SkAltmash"
              subText="GitHub Projects"
              href="https://github.com/SkAltmash"
              external={true}
            />
          </div>

          <div className="flex gap-4 mt-6 md:flex-row flex-col">
            <a
              href="mailto:skaltmash3@gmail.com"
              className="flex items-center gap-2 bg-[#00ffff] text-black px-4 py-2 rounded-lg hover:bg-[#00e6e6] transition font-semibold"
            >
              <FaEnvelope /> Email Me Directly
            </a>
            <a
              href="/resume.pdf"
              className="flex items-center gap-2 border border-[#00ffff]/40 px-4 py-2 rounded-lg hover:border-[#00ffff] transition font-semibold"
            >
              <FaDownload /> Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right Column: Send Message */}
        <motion.div
          className="bg-gradient-to-br from-black/40 to-gray-900/40 p-8 rounded-2xl border border-[#00ffff]/20 shadow-xl backdrop-blur-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0, transition: { duration: 0.6 } }}
        >
          <h3 className="text-3xl font-bold mb-6 text-[#00ffff]">Send a Message</h3>
          <form ref={form} onSubmit={sendEmail} className="space-y-5">
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-black/60 text-white border border-white/20 focus:outline-none focus:border-[#00ffff] focus:ring-2 focus:ring-[#00ffff]/50"
            />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg bg-black/60 text-white border border-white/20 focus:outline-none focus:border-[#00ffff] focus:ring-2 focus:ring-[#00ffff]/50"
            />
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              className="w-full p-3 rounded-lg bg-black/60 text-white border border-white/20 focus:outline-none focus:border-[#00ffff] focus:ring-2 focus:ring-[#00ffff]/50"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Tell me about your project, opportunity, or just say hello..."
              required
              className="w-full p-3 rounded-lg bg-black/60 text-white border border-white/20 focus:outline-none focus:border-[#00ffff] focus:ring-2 focus:ring-[#00ffff]/50"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition-all duration-300 ${
                loading ? "bg-[#00ffff]/40 cursor-not-allowed" : "bg-[#00ffff] hover:bg-[#00e6e6]"
              } text-black font-bold`}
            >
              {loading ? "Sending..." : <><FaPaperPlane /> Send Message</>}
            </button>

            {sent && (
              <p className="text-[#00ffff] text-center font-medium mt-4 animate-pulse">
                Message sent successfully!
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
