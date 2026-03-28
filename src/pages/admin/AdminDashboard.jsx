import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import {
    FaBriefcase, FaCode, FaTrophy, FaLayerGroup, FaSignOutAlt, FaHome, FaTools, FaEnvelope, FaFilePdf, FaQuoteLeft, FaNewspaper, FaChartLine, FaTags
} from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import toast, { Toaster } from "react-hot-toast";

const cards = [
    {
        title: "Client Projects",
        desc: "Add, edit, delete client work entries",
        icon: <FaBriefcase size={28} />,
        to: "/admin/client-projects",
        gradient: "from-cyan-500 to-blue-600",
    },
    {
        title: "Services",
        desc: "Manage the services you offer",
        icon: <FaTools size={28} />,
        to: "/admin/services",
        gradient: "from-purple-500 to-pink-600",
    },
    {
        title: "Pricing Packages",
        desc: "Manage pricing plans and packages",
        icon: <FaTags size={28} />,
        to: "/admin/pricing",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        title: "Messages",
        desc: "Read client inquiries & contacts",
        icon: <FaEnvelope size={28} />,
        to: "/admin/messages",
        gradient: "from-blue-500 to-indigo-600",
    },
    {
        title: "Resume",
        desc: "Upload dynamic PDF resume",
        icon: <FaFilePdf size={28} />,
        to: "/admin/resume",
        gradient: "from-red-500 to-orange-600",
    },
    {
        title: "Achievements",
        desc: "Update certificates & accomplishments",
        icon: <FaTrophy size={28} />,
        to: "/admin/achievements",
        gradient: "from-yellow-500 to-orange-500",
    },
    {
        title: "Tech Stack",
        desc: "Edit skills and proficiency levels",
        icon: <FaLayerGroup size={28} />,
        to: "/admin/tech-stack",
        gradient: "from-green-500 to-teal-600",
    },
    {
        title: "Testimonials",
        desc: "Manage client reviews & ratings",
        icon: <FaQuoteLeft size={28} />,
        to: "/admin/testimonials",
        gradient: "from-yellow-400 to-orange-500",
    },
    {
        title: "Blogs",
        desc: "Write & publish articles",
        icon: <FaNewspaper size={28} />,
        to: "/admin/blogs",
        gradient: "from-pink-500 to-rose-600",
    }
];

export default function AdminDashboard() {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ projects: 0, msgs: 0, blogs: 0 });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [projSnap, msgSnap, blogSnap] = await Promise.all([
                    getDocs(collection(db, "clientProjects")),
                    getDocs(query(collection(db, "messages"), where("read", "==", false))),
                    getDocs(collection(db, "blogs"))
                ]);

                setStats({
                    projects: projSnap.size,
                    msgs: msgSnap.size, // Unread messages
                    blogs: blogSnap.size
                });
            } catch (err) {
                console.error("Failed to load stats", err);
            }
            setLoadingStats(false);
        };
        fetchStats();
    }, []);

    const handleLogout = async () => {
        await logout();
        toast.success("Logged out");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />

            {/* Header */}
            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                        <p className="text-xs text-gray-500">{currentUser?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            to="/home"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:border-white/30 transition"
                        >
                            <FaHome size={14} /> View Site
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 border border-red-900/40 rounded-lg hover:border-red-500/40 transition"
                        >
                            <FaSignOutAlt size={14} /> Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
                    <p className="text-gray-400 mt-1">Manage your portfolio content</p>
                </div>

                {/* Quick Stats */}
                {!loadingStats && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Total Projects</p>
                                <h3 className="text-3xl font-bold text-white">{stats.projects}</h3>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                                <FaBriefcase size={20} />
                            </div>
                        </div>
                        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Unread Messages</p>
                                <h3 className="text-3xl font-bold text-white">{stats.msgs}</h3>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <FaEnvelope size={20} />
                            </div>
                        </div>
                        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Published Blogs</p>
                                <h3 className="text-3xl font-bold text-white">{stats.blogs}</h3>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center">
                                <FaNewspaper size={20} />
                            </div>
                        </div>
                    </div>
                )}

                <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-4">Management Modules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, i) => (
                        <motion.div
                            key={card.to}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <Link
                                to={card.to}
                                className="group flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div
                                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 text-white`}
                                >
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
