import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

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

  // Helper to determine rank styling
  const getRankStyle = (rank) => {
    if (rank === 1) return { color: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-500/10", icon: <FaTrophy /> };
    if (rank === 2) return { color: "text-gray-300", border: "border-gray-400/30", bg: "bg-gray-400/10", icon: <FaMedal /> };
    return { color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-500/10", icon: <FaAward /> };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-5xl mx-auto">
      {certificates.map((cert, index) => {
        const style = getRankStyle(cert.rank);
        
        return (
          <motion.div
            key={index}
            className="group relative bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden cursor-default
                       hover:border-cyan-400/30 transition-all duration-500 hover:shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            {/* 🔹 Image Section with Zoom */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-80" />
              
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
              />

              {/* Rank Badge */}
              <div className={`absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border ${style.border} ${style.bg} shadow-lg`}>
                <span className={`text-sm ${style.color}`}>{style.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${style.color}`}>
                  Rank {cert.rank}
                </span>
              </div>
            </div>

            {/* 🔹 Content Section */}
            <div className="relative p-6 pt-2 z-20">
              {/* Decorative Line */}
              <div className="w-12 h-1 bg-cyan-500 rounded-full mb-4 group-hover:w-24 transition-all duration-500" />

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
                {cert.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                {cert.description}
              </p>
            </div>

            {/* 🔹 Glow Effect on Hover */}
            <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_40px_rgba(34,211,238,0.05)]" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Certificates;