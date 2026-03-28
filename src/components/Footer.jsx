import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUpRight, MessageCircle, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Stagger container for entrance animation
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="w-full bg-[#030303] border-t border-white/5 text-gray-400 pt-24 pb-12 relative overflow-hidden">

            {/* 🔹 Dual-Tone Background Decor */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                className="max-w-7xl mx-auto px-6 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* 1. Brand Section */}
                    <div className="md:col-span-4">
                        <Link to="/home" className="group flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 p-[1px]">
                                <div className="w-full h-full bg-black rounded-xl flex items-center justify-center overflow-hidden">
                                    <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
                                </div>
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                ALTAMASH<span className="text-cyan-400">.</span>
                            </span>
                        </Link>
                        <p className="text-base text-gray-500 mb-8 leading-relaxed max-w-sm">
                            Architecting high-performance digital solutions. Specializing in
                            <span className="text-white"> React Ecosystems</span> and
                            <span className="text-white"> Scalable Cloud Apps</span>.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: Github, href: "https://github.com/SkAltmash", label: "Github" },
                                { icon: Linkedin, href: "https://linkedin.com/in/skaltamash18", label: "LinkedIn" },
                                { icon: Twitter, href: "#", label: "Twitter" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all duration-300 group"
                                >
                                    <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 2. Navigation Columns */}
                    <div className="md:col-span-2">
                        <h3 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Explore</h3>
                        <ul className="space-y-4">
                            {["Home", "About", "Projects", "Services", "Blogs"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase()}`}
                                        className="group flex items-center gap-1 hover:text-cyan-400 transition-colors"
                                    >
                                        {item}
                                        <ArrowUpRight size={14} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Services</h3>
                        <ul className="space-y-4">
                            {["Web Dev", "UI/UX Design", "Mobile Apps", "Consulting"].map((item) => (
                                <li key={item} className="hover:text-pink-400 transition-colors cursor-pointer flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 scale-0 group-hover:scale-100 transition-transform" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Contact Info */}
                    <div className="md:col-span-4">
                        <h3 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">Get In Touch</h3>
                        <div className="space-y-6">
                            <a href="mailto:skaltmash3@gmail.com" className="flex items-start gap-4 group">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:text-cyan-400 transition-colors">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Email Me</span>
                                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">skaltmash3@gmail.com</span>
                                </div>
                            </a>
                            <a href="https://wa.me/9823856261" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:text-green-400 transition-colors">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">WhatsApp</span>
                                    <span className="text-gray-200 font-medium group-hover:text-white transition-colors">+91 9823856261</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 🔹 Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
                        <p>© {currentYear} SK Altamash . All rights reserved.</p>
                        <div className="hidden md:block w-1 h-1 rounded-full bg-gray-700" />
                        <p className="flex items-center gap-2">
                            Built with <Heart size={14} className="text-pink-500 animate-pulse" /> & React
                        </p>
                    </div>

                    <div className="flex gap-8 text-xs font-bold uppercase tracking-widest">
                        <Link to="#" className="text-gray-500 hover:text-white transition">Privacy</Link>
                        <Link to="#" className="text-gray-500 hover:text-white transition">Terms</Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-cyan-400 hover:text-cyan-300 transition"
                        >
                            Back to Top ↑
                        </button>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}