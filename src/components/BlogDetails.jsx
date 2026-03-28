import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaArrowLeft, FaSpinner, FaTags } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

// Notice: We do NOT want react-quill's CSS here, we just render HTML directly.
// But we might need standard styles for prose. Tailwind Typography plugin is ideal.
// We will use standard basic CSS classes for formatting.

export default function BlogDetails() {
    const { id } = useParams(); // 'id' here is actually the slug
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true);
            try {
                // Try finding by slug first
                const q = query(collection(db, "blogs"), where("slug", "==", id));
                const snap = await getDocs(q);

                if (!snap.empty) {
                    setBlog({ id: snap.docs[0].id, ...snap.docs[0].data() });
                } else {
                    // Fallback to fetch by ID if slug not found
                    const docRef = doc(db, "blogs", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setBlog({ id: docSnap.id, ...docSnap.data() });
                    }
                }
            } catch (err) {
                console.error("Error fetching blog post", err);
            }
            setLoading(false);
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <FaSpinner className="text-pink-500 text-4xl animate-spin" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">404 - Article Not Found</h1>
                <p className="text-gray-400 mb-8">The exact post you were looking for is not here.</p>
                <Link to="/blogs" className="px-6 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-500 transition">
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#050505] text-white pb-20">
            <Helmet>
                <title>{blog.title} | Altamash Portfolio</title>
                <meta name="description" content={blog.description || `Read ${blog.title} by Altamash Sheikh`} />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.description} />
                {blog.image && <meta property="og:image" content={blog.image} />}
            </Helmet>

            {/* Hero Section */}
            <div className="relative pt-32 pb-16 w-full border-b border-white/10 bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <Link to="/blogs" className="inline-flex items-center text-gray-400 hover:text-pink-400 transition mb-8 text-sm font-semibold">
                        <FaArrowLeft className="mr-2" /> Back to Articles
                    </Link>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.tags?.map((tag, i) => (
                            <span key={i} className="text-xs font-bold px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
                    >
                        {blog.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-center text-gray-400 text-sm font-medium"
                    >
                        <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-pink-500/50" />
                            {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently Published'}
                        </div>
                    </motion.div>
                </div>
            </div>

            {blog.image && (
                <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-20 mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
                        className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#111]"
                    >
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            )}

            {/* Main Content */}
            <div className={`max-w-3xl mx-auto px-6 ${!blog.image ? 'mt-16' : ''}`}>
                {/*
          Using global prose-like classes for the raw HTML.
          We sanitize innerHTML by trusting Firestore (assuming only admin writes to it).
        */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                    className="prose prose-invert prose-pink max-w-none
                     [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-4 [&>h1]:text-white
                     [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-white
                     [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-white
                     [&>p]:text-gray-300 [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-lg
                     [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-gray-300 [&>ul>li]:mb-2
                     [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-gray-300 [&>ol>li]:mb-2
                     [&>blockquote]:border-l-4 [&>blockquote]:border-pink-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-400 [&>blockquote]:mb-6 [&>blockquote]:bg-pink-500/5 [&>blockquote]:py-2 [&>blockquote]:pr-4 [&>blockquote]:rounded-r-lg
                     [&>pre]:bg-[#111] [&>pre]:border [&>pre]:border-white/10 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre]:text-sm
                     [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-pink-300 [&_code]:text-sm
                     [&>pre_code]:bg-transparent [&>pre_code]:p-0 [&>pre_code]:text-gray-300
                     [&_a]:text-pink-400 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-pink-300
                     [&_img]:rounded-xl [&_img]:my-8 [&_img]:border [&_img]:border-white/10 [&_img]:shadow-xl"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-500/20 border-2 border-pink-500/30 rounded-full flex items-center justify-center font-bold text-pink-400 text-xl overflow-hidden shadow-lg">
                            <img src="/logo.png" alt="Author" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <div className="text-white font-bold">Altamash Sheikh</div>
                            <div className="text-gray-500 text-sm">Full Stack Developer</div>
                        </div>
                    </div>
                    <Link to="/blogs" className="px-6 py-3 rounded-xl border border-white/10 hover:border-pink-400/50 hover:bg-pink-500/10 transition text-sm font-bold flex items-center gap-2 text-white group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-pink-500" /> Read More Articles
                    </Link>
                </div>
            </div>
        </article>
    );
}
