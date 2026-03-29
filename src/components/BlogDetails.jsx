import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaCalendarAlt, FaArrowLeft, FaShareAlt, FaLink, FaCheck } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

/**
 * CUSTOM HOOK: useBlogPost
 * Handles the logic of fetching by slug or ID
 */
const useBlogPost = (id) => {
    const [data, setData] = useState({ blog: null, loading: true, error: null });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // 1. Try Slug
                const q = query(collection(db, "blogs"), where("slug", "==", id));
                const snap = await getDocs(q);

                if (!snap.empty) {
                    setData({ blog: { id: snap.docs[0].id, ...snap.docs[0].data() }, loading: false, error: null });
                } else {
                    // 2. Fallback to ID
                    const docRef = doc(db, "blogs", id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setData({ blog: { id: docSnap.id, ...docSnap.data() }, loading: false, error: null });
                    } else {
                        setData({ blog: null, loading: false, error: "Not Found" });
                    }
                }
            } catch (err) {
                setData({ blog: null, loading: false, error: err.message });
            }
        };
        fetchBlog();
    }, [id]);

    return data;
};

export default function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { blog, loading, error } = useBlogPost(id);
    const [copied, setCopied] = useState(false);

    // Reading Progress Logic
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const handleShare = async () => {
        const shareData = {
            title: blog?.title,
            text: blog?.description,
            url: window.location.href,
        };

        if (navigator.share) {
            try { await navigator.share(shareData); } catch (err) { console.log(err); }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (loading) return <BlogSkeleton />;
    if (error || !blog) return <BlogError />;

    return (
        <article className="min-h-screen overflow-x-hidden bg-[#050505] text-white pb-20 selection:bg-pink-500/30">
            <Helmet>
                <title>{blog.title} | Altamash Portfolio</title>
                <meta name="description" content={blog.description || `Read ${blog.title}`} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:image" content={blog.image} />
            </Helmet>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-pink-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <header className="relative pt-32 pb-16 w-full border-b border-white/5 bg-[#080808]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent opacity-50" />

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="group inline-flex items-center text-gray-400 hover:text-white transition-colors mb-10 text-sm font-medium"
                    >
                        <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Articles
                    </button>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {blog.tags?.map((tag, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight"
                    >
                        {blog.title}
                    </motion.h1>

                    <div className="flex items-center justify-between border-t border-white/5 pt-8">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <FaCalendarAlt className="text-pink-500/50" />
                            {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
                        </div>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm font-medium border border-white/10"
                        >
                            {copied ? <><FaCheck className="text-green-400" /> Copied</> : <><FaShareAlt /> Share</>}
                        </button>
                    </div>
                </div>
            </header>

            {/* Featured Image */}
            {blog.image && (
                <div className="max-w-5xl mx-auto px-6 -mt-12 relative z-20 mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                        className="aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 ring-1 ring-white/5"
                    >
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            )}

            {/* Content Body */}
            <div className={`max-w-3xl mx-auto px-6 ${!blog.image ? 'mt-16' : ''}`}>
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-pink max-w-none overflow-hidden
                        prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed
                        prose-headings:text-white prose-headings:font-bold
                        prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:bg-[#0d0d0d] prose-pre:border prose-pre:border-white/10
                        prose-img:max-w-full prose-img:h-auto prose-img:rounded-2xl prose-img:shadow-2xl
                        prose-a:no-underline prose-a:border-b prose-a:border-pink-500/50 hover:prose-a:border-pink-500 transition-all
                        [&_*]:max-w-full [&_*]:break-words [&_iframe]:w-full [&_table]:block [&_table]:overflow-x-auto"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Author Footer */}
                <footer className="mt-24 p-8 rounded-3xl bg-gradient-to-b from-[#0a0a0a] to-transparent border border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <img src="/logo.png" alt="Altamash" className="relative w-16 h-16 rounded-full object-cover border-2 border-[#050505]" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Written by</p>
                            <h3 className="text-xl font-bold text-white">Altamash Sheikh</h3>
                            <p className="text-gray-500 text-sm">Crafting digital experiences through code.</p>
                        </div>
                    </div>
                    <Link to="/blogs" className="px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-xl shadow-white/5">
                        More Stories
                    </Link>
                </footer>
            </div>
        </article>
    );
}

const BlogSkeleton = () => (
    <div className="min-h-screen bg-[#050505] pt-32 px-6">
        <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-4 w-24 bg-white/5 rounded mb-10" />
            <div className="h-12 w-3/4 bg-white/5 rounded mb-6" />
            <div className="h-12 w-1/2 bg-white/5 rounded mb-12" />
            <div className="aspect-video w-full bg-white/5 rounded-2xl mb-16" />
            <div className="space-y-4 max-w-3xl mx-auto">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-4 bg-white/5 rounded" style={{ width: `${Math.random() * 40 + 60}%` }} />)}
            </div>
        </div>
    </div>
);

const BlogError = () => (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-black text-white/10 mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-white mb-2">Lost in the void?</h2>
        <p className="text-gray-400 mb-10 max-w-xs">We couldn't find the article you were looking for. It might have been moved or deleted.</p>
        <Link to="/blogs" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform">
            Return Home
        </Link>
    </div>
);
