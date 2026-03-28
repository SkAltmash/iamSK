import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaSpinner, FaArrowRight, FaNewspaper } from "react-icons/fa";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                setBlogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Error fetching blogs", err);
            }
            setLoading(false);
        };

        fetchBlogs();
    }, []);

    return (
        <section className="min-h-screen relative pt-32 pb-20 bg-[#050505] text-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">Articles</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Thoughts, tutorials, and deep dives into web development and software engineering.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <FaSpinner className="text-pink-500 text-4xl animate-spin" />
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <FaNewspaper size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No articles published yet. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, idx) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-[#111] border border-white/10 flex flex-col rounded-2xl overflow-hidden hover:border-pink-500/30 transition-all duration-300 group shadow-xl"
                            >
                                <Link to={`/blogs/${blog.slug || blog.id}`} className="block relative aspect-video overflow-hidden border-b border-white/10 bg-white/5">
                                    {blog.image ? (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                            <FaNewspaper size={48} />
                                        </div>
                                    )}
                                    {/* Overlay shadow */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>

                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {blog.tags?.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link to={`/blogs/${blog.slug || blog.id}`} className="group-hover:text-pink-400 transition-colors">
                                        <h2 className="text-xl font-bold mb-3 line-clamp-2 leading-snug">{blog.title}</h2>
                                    </Link>

                                    <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                                        {blog.description}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                        <div className="flex items-center text-xs text-gray-500 font-medium">
                                            <FaCalendarAlt className="mr-2 text-pink-500/50" />
                                            {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                                        </div>
                                        <Link to={`/blogs/${blog.slug || blog.id}`} className="text-pink-400 text-sm font-bold flex items-center group-hover:text-pink-300 transition-colors">
                                            Read <FaArrowRight className="ml-1 text-xs group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
