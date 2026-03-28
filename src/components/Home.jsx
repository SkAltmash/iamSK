import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Hero from "./hero/Hero";
import { ArrowRight, Code, Layout, Smartphone, Rocket, Calendar, ExternalLink, Sparkles } from "lucide-react";

/* ------------------- PRO COMPONENTS ------------------- */

// 1. Interactive Spotlight Card
const SpotlightCard = ({ children, className = "", color = "cyan" }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const glowColor = color === "pink" ? "rgba(236, 72, 153, 0.15)" : "rgba(34, 211, 238, 0.15)";

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] transition-all duration-500 hover:border-white/20 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
};

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchPreviews = async () => {
            try {
                const qProj = query(collection(db, "clientProjects"), orderBy("order", "asc"), limit(3));
                const pSnap = await getDocs(qProj);
                setProjects(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));

                const qBlog = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3));
                const bSnap = await getDocs(qBlog);
                setBlogs(bSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            } catch (err) {
                console.error("Error fetching previews:", err);
            }
        };
        fetchPreviews();
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-pink-500/30">
            <Hero />

            {/* 2. ABOUT PREVIEW (Refined) */}
            <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={14} /> My Philosophy
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">Design</span> & Engineering
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                            I transform complex logic into fluid digital experiences. My approach combines the precision of high-end engineering with the soul of modern design.
                        </p>
                        <Link to="/about" className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-bold rounded-full overflow-hidden transition-all">
                            <span className="relative z-10">Read Full Story</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { val: "3+", label: "Years Exp", color: "from-cyan-500" },
                            { val: "25+", label: "Projects", color: "from-pink-500" }
                        ].map((stat, i) => (
                            <div key={i} className={`bg-white/5 border border-white/10 p-10 rounded-[2.5rem] text-center ${i === 1 ? 'mt-12' : ''}`}>
                                <div className={`text-5xl font-black bg-gradient-to-br ${stat.color} to-white bg-clip-text text-transparent mb-2`}>{stat.val}</div>
                                <div className="text-xs text-gray-500 uppercase font-black tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. WHAT I DO (Services with Pink Accents + Mobile Scroll) */}
            <section className="py-24 bg-[#080808] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">What I Do</h2>
                        <p className="text-gray-400">Tailored digital solutions for the modern web.</p>
                    </div>

                    <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 snap-x no-scrollbar">
                        {[
                            { title: "Web Architecture", desc: "High performance, fully responsive websites built with React and Tailwind.", icon: Code, color: "cyan" },
                            { title: "UI/UX Experience", desc: "Intuitive interfaces focusing on conversion and user-centric flows.", icon: Layout, color: "pink" },
                            { title: "Mobile Systems", desc: "Cross-platform applications that deliver native performance.", icon: Smartphone, color: "cyan" },
                        ].map((srv, i) => (
                            <motion.div key={i} className="min-w-[85vw] md:min-w-0 snap-center">
                                <SpotlightCard color={srv.color} className="p-8 h-full">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${srv.color === 'pink' ? 'bg-pink-500/10 text-pink-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                                        <srv.icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{srv.title}</h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">{srv.desc}</p>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. SELECTED WORK (Enhanced Hover + Mobile Scroll) */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold">Selected Work</h2>
                    <Link to="/projects" className="text-cyan-400 font-bold hover:underline">View Gallery</Link>
                </div>

                <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-10 snap-x no-scrollbar">
                    {projects.map((proj, i) => (
                        <div key={proj.id} className="min-w-[85vw] md:min-w-0 snap-center">
                            <Link to={proj.liveLink || "#"} target="_blank" className="group block">
                                <div className="relative rounded-[2rem] overflow-hidden mb-6 bg-white/5">
                                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center">
                                            <span className="font-bold">Explore Project</span>
                                            <ExternalLink size={18} />
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{proj.title}</h3>
                                <p className="text-pink-500 font-mono text-xs uppercase tracking-widest">{proj.category}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. INSIGHTS & ARTICLES (Pink Accents + Mobile Scroll) */}
            <section className="py-24 bg-[#080808] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-black">Insights & Articles</h2>
                    </div>

                    <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-10 snap-x no-scrollbar">
                        {blogs.map((blog, i) => (
                            <div key={blog.id} className="min-w-[80vw] md:min-w-0 snap-center">
                                <SpotlightCard color="pink" className="h-full">
                                    <Link to={`/blogs/${blog.id}`} className="block p-4">
                                        <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                                            <img src={blog.image} className="w-full h-full object-cover" alt={blog.title} />
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-black text-pink-500 uppercase tracking-tighter mb-4">
                                            <Calendar size={14} />
                                            {blog.createdAt?.seconds ? new Date(blog.createdAt.seconds * 1000).toDateString() : 'Mar 2026'}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-cyan-400 transition-colors">{blog.title}</h3>
                                        <p className="text-gray-500 text-sm line-clamp-2">{blog.description}</p>
                                    </Link>
                                </SpotlightCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CTA (Cyberpunk Pro Style) */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-[#111] border border-white/10 p-12 md:p-24 text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                            Ready to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-blue-500">Elevate</span> your Brand?
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(6,182,212,0.3)]">
                                Start A Project
                            </Link>
                            <a href="mailto:skaltmash3@gmail.com" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
                                Copy Email
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}