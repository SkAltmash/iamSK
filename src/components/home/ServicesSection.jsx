import React from "react";
import { motion } from "framer-motion";
import { Code, Layout, Smartphone } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const SERVICES = [
    {
        title: "Web Architecture",
        desc: "High performance, fully responsive websites built with React and Tailwind.",
        icon: Code,
        color: "cyan",
    },
    {
        title: "UI/UX Experience",
        desc: "Intuitive interfaces focusing on conversion and user-centric flows.",
        icon: Layout,
        color: "pink",
    },
    {
        title: "Mobile Systems",
        desc: "Cross-platform applications that deliver native performance.",
        icon: Smartphone,
        color: "cyan",
    },
];

export default function ServicesSection() {
    return (
        <section className="py-24 bg-[#080808] border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">What I Do</h2>
                    <p className="text-gray-400">Tailored digital solutions for the modern web.</p>
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x no-scrollbar">
                    {SERVICES.map((service) => (
                        <motion.div key={service.title} className="min-w-[85vw] md:min-w-0 snap-center">
                            <SpotlightCard color={service.color} className="p-8 h-full">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${service.color === "pink" ? "bg-pink-500/10 text-pink-400" : "bg-cyan-500/10 text-cyan-400"}`}>
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">{service.desc}</p>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
