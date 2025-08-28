import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";

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

  return (
    <section id="contact" className="py-20 w-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">
          Send a <span className="text-[#15AABF]"> Message</span>
        </h2>

        {/* Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6 bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20"
        >
          <div>
            <label htmlFor="user_name" className="block mb-1 text-[#15AABF]">Your Name</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              required
              className="w-full p-3 rounded-lg bg-black/70 text-white border border-[#15AABF] focus:outline-none focus:ring-2 focus:ring-[#15AABF] focus:border-[#15AABF] transition"
            />
          </div>

          <div>
            <label htmlFor="user_email" className="block mb-1 text-[#15AABF]">Your Email</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              required
              className="w-full p-3 rounded-lg bg-black/70 text-white border border-[#15AABF] focus:outline-none focus:ring-2 focus:ring-[#15AABF] focus:border-[#15AABF] transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 text-[#15AABF]">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full p-3 rounded-lg bg-black/70 text-white border border-[#15AABF] focus:outline-none focus:ring-2 focus:ring-[#15AABF] focus:border-[#15AABF] transition"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold flex justify-center items-center gap-2 transition ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-[#15AABF] hover:bg-[#1297a8]'
            } text-white`}
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
          </button>

          {sent && (
            <p className="text-green-400 text-center font-medium mt-4">
              Message launched successfully!
            </p>
          )}
        </form>

        {/* Social Icons */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-300">Or connect with me on:</p>
          <div className="flex justify-center gap-6 text-white text-2xl">
            <a
              href="mailto:skaltmash3@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#15AABF] transition"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://linkedin.com/in/altamash-sheikh-1ba6a72aa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#15AABF] transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/SkAltmash"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#15AABF] transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
