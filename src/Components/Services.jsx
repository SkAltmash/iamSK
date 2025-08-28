import React from "react";
import { FaLaptopCode, FaMobileAlt, FaServer } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" },
  }),
};

const services = [
  {
    icon: <FaLaptopCode />,
    title: "Web Development",
    description:
      "Building responsive and modern web applications using React, Node.js, and other technologies.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Mobile Apps",
    description:
      "Creating cross-platform mobile apps with React Native that are fast, smooth, and user-friendly.",
  },
  {
    icon: <FaServer />,
    title: "Backend & APIs",
    description:
      "Developing robust backends and APIs with Node.js, Express, and Firebase for scalable solutions.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 w-screen bg-black text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          My <span className="text-[#15AABF]">Services</span>
        </h2>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto">
          I offer a range of services to help you build web and mobile solutions that are fast, scalable, and visually appealing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-16">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 flex flex-col items-center text-center cursor-pointer"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0.1 + index * 0.1}
            whileHover={{ scale: 1.05, y: -5, boxShadow: "0 15px 30px rgba(21,170,191,0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div className="text-5xl text-[#15AABF] mb-4" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
              {service.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-300">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
