import React from "react";
import { motion } from "framer-motion";

const Certificates = () => {
    const certificates = [
  {
    title: "Error Hunt (2nd place)",
    image: "aarohan.jpg",
    description:
      "2nd place in Aarohan 2024 Error Hunt coding challenge at RAICSIT Wardha.",
    rank: 2,
  },
  {
    title: "Coding Competition (1st place)",
    image: "aakurit.jpg",
    description:
      "1st place in Aakurit 2023 Coding Competition at RAICSIT Wardha.",
    rank: 1,
  },
];
  return (
    <div className="flex flex-wrap gap-10 justify-center">
      {certificates.map((cert, index) => (
        <motion.div
          key={index}
          className="bg-[#111] w-full max-w-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.03] transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.6 }}
        >
          <div className="relative">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-60 object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-[10px] uppercase font-bold">
              🏆 Rank {cert.rank}
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-semibold text-[#00ffff] mb-2">
              {cert.title}
            </h3>
            <p className="text-gray-400 text-sm">{cert.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Certificates;