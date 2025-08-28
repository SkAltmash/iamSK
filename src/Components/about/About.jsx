import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="relative bg-black text-gray-200 py-24 px-6 md:px-16 lg:px-28 overflow-hidden w-screen"
    >
      {/* Static background gradient */}
      <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[#15AABF] opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Profile image */}
        <div className="relative flex-shrink-0">
          <div className="absolute -inset-3 bg-[#15AABF] opacity-30 blur-2xl rounded-3xl"></div>
          <img
            src="public/logo.png"
            alt="Altamash Sheikh"
            className="relative w-52 h-52 rounded-3xl object-cover border-4 border-[#15AABF] shadow-[0_10px_40px_rgba(21,170,191,0.4)]"
          />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-snug">
            Hi, I'm <span className="text-[#15AABF]">Altamash Sheikh</span>
          </h2>

          <p className="mt-6 text-lg text-gray-300 max-w-2xl">
            I’m a passionate full-stack developer specializing in creating
            dynamic and high-performance digital experiences. With a strong
            foundation in <span className="text-[#15AABF]">React</span>,{" "}
            <span className="text-[#15AABF]">React Native</span>,{" "}
            <span className="text-[#15AABF]">Firebase</span>, and{" "}
            <span className="text-[#15AABF]">Node.js</span>, I craft seamless
            applications for web and mobile platforms.
          </p>

          <p className="mt-4 text-base text-gray-400">
            I focus on scalability, performance, and user-centric design —
            turning complex challenges into simple, elegant solutions.
          </p>

          {/* Social Icons */}
          <div className="mt-10 flex justify-center md:justify-start gap-6 text-3xl text-white">
            {[
              { icon: FaLinkedin, link: "https://linkedin.com/in/altamash-sheikh-1ba6a72aa", title: "LinkedIn" },
              { icon: FaGithub, link: "https://github.com/SkAltmash", title: "GitHub" },
              { icon: FaEnvelope, link: "mailto:skaltmash3@gmail.com", title: "Email" },
              { icon: FaFileAlt, link: "/resume.pdf", title: "Resume" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#15AABF] transition"
                >
                  <Icon title={item.title} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
