import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Rocket, Code2, Zap } from "lucide-react";

const STATS = [
    { val: 3, suffix: "+", label: "Years Exp", icon: <Rocket size={20} />, color: "from-cyan-400 to-blue-500" },
    { val: 25, suffix: "+", label: "Projects", icon: <Code2 size={20} />, color: "from-blue-400 to-indigo-500" },
    { val: 12, suffix: "+", label: "Frameworks", icon: <Zap size={20} />, color: "from-emerald-400 to-cyan-500" },
];

function CountUp({ to }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const spring = useSpring(0, { mass: 1, stiffness: 60, damping: 20 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (isInView) spring.set(to);
    }, [isInView, spring, to]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function AboutPreviewSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-32 px-6 max-w-7xl mx-auto overflow-hidden bg-[#050505]">
            <div className="grid lg:grid-cols-2 gap-20 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                        <Sparkles size={14} className="animate-pulse" /> My Philosophy
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
                        Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Design</span> & Engineering
                    </h2>

                    <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-xl font-medium">
                        I don't just write code; I architect solutions that scale. Like my mission states, I aim to bridge the gap between human intuition and technical execution.
                    </p>

                    <Link to="/about" className="group relative inline-flex items-center gap-4 px-10 py-4 bg-white text-black font-extrabold rounded-2xl overflow-hidden transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        <span className="relative z-10">Read Full Story</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Right Stats Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-5"
                >
                    {STATS.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className={`group relative bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center transition-all hover:border-cyan-500/30 hover:bg-[#0f0f0f] ${index === 2 ? "col-span-2 md:col-span-1" : ""
                                }`}
                        >
                            {/* Subtle Inner Glow on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />

                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>

                            <div className={`text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-3 tracking-tighter`}>
                                <CountUp to={stat.val} />{stat.suffix}
                            </div>

                            <div className="text-[10px] text-gray-500 uppercase font-black tracking-[0.15em] transition-colors group-hover:text-gray-300">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}

                    {/* Decorative element to fill the 4th spot if needed, or just let the 3rd stretch */}
                    <motion.div
                        variants={itemVariants}
                        className="hidden md:flex bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/10 p-8 rounded-[2.5rem] items-center justify-center text-center italic text-gray-500 text-sm font-medium"
                    >
                        "Code is poetry in motion"
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
