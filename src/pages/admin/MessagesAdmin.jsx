import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, updateDoc, deleteDoc, doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaArrowLeft, FaSpinner, FaEnvelope, FaEnvelopeOpenText } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function MessagesAdmin() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMessage, setViewMessage] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const snap = await getDocs(collection(db, "messages"));
            setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleToggleRead = async (msg) => {
        try {
            await updateDoc(doc(db, "messages", msg.id), { read: !msg.read });
            setMessages(messages.map(m => m.id === msg.id ? { ...m, read: !m.read } : m));
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteDoc(doc(db, "messages", deleteId));
            toast.success("Message deleted");
            setMessages(messages.filter(m => m.id !== deleteId));
            setDeleteId(null);
            setViewMessage(null);
        } catch {
            toast.error("Delete failed");
        }
    };

    const openMessage = async (msg) => {
        setViewMessage(msg);
        if (!msg.read) {
            await handleToggleRead(msg); // Auto mark as read when opened
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />

            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-xl font-bold flex-1">Inbox</h1>
                    <div className="text-sm font-bold bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30">
                        {messages.filter(m => !m.read).length} Unread
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex justify-center py-20"><FaSpinner className="text-cyan-400 text-3xl animate-spin" /></div>
                ) : messages.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        <FaEnvelopeOpenText size={48} className="mx-auto mb-4 opacity-50" />
                        No messages in your inbox.
                    </div>
                ) : (
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                        {messages.map((msg, i) => (
                            <div
                                key={msg.id}
                                className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5 transition border-b border-white/5 last:border-0 ${msg.read ? 'opacity-70' : 'bg-cyan-900/10'}`}
                                onClick={() => openMessage(msg)}
                            >
                                <div className={`w-2 h-2 rounded-full shrink-0 ${msg.read ? 'bg-transparent' : 'bg-cyan-400'}`} />
                                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                                    <div className="font-bold truncate w-32 shrink-0">{msg.name}</div>
                                    <div className="text-sm text-gray-300 truncate w-48 shrink-0">{msg.subject || "(No Subject)"}</div>
                                    <div className="text-sm text-gray-500 truncate flex-1">{msg.message}</div>
                                </div>
                                <div className="text-xs text-gray-600 shrink-0 hidden md:block">
                                    {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setDeleteId(msg.id); }}
                                    className="p-2 text-gray-500 hover:text-red-400 transition ml-2"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Read Message Modal */}
            <AnimatePresence>
                {viewMessage && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
                        onClick={() => setViewMessage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl max-h-[90vh]"
                        >
                            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h2 className="font-bold text-lg">Message details</h2>
                                <button onClick={() => setViewMessage(null)} className="text-gray-400 hover:text-white">✕</button>
                            </div>
                            <div className="p-6 overflow-y-auto">
                                <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                                    <div>
                                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                                            {viewMessage.subject || "No Subject"}
                                        </h3>
                                        <div className="text-sm mt-2 font-medium text-white">
                                            From: <span className="text-cyan-400">{viewMessage.name}</span> &lt;{viewMessage.email}&gt;
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {viewMessage.createdAt?.toDate ? viewMessage.createdAt.toDate().toLocaleString() : 'Just now'}
                                    </div>
                                </div>
                                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap bg-white/5 p-6 rounded-xl border border-white/5 text-sm md:text-base">
                                    {viewMessage.message}
                                </div>
                            </div>
                            <div className="px-6 py-4 border-t border-white/10 bg-white/5 flex gap-3 justify-end items-center">
                                <button
                                    onClick={() => handleToggleRead(viewMessage)}
                                    className="text-sm px-4 py-2 border border-white/10 text-white rounded-lg hover:border-white/30 transition shadow-sm bg-black"
                                >
                                    Mark as {viewMessage.read ? 'Unread' : 'Read'}
                                </button>
                                <a
                                    href={`mailto:${viewMessage.email}?subject=Re: ${viewMessage.subject}`}
                                    className="text-sm px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition"
                                >
                                    <FaEnvelope className="inline mr-2" />
                                    Reply via Email
                                </a>
                                <button
                                    onClick={() => setDeleteId(viewMessage.id)}
                                    className="text-sm px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 font-bold rounded-lg transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteId && !viewMessage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center px-4">
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
                            <FaTrash className="text-red-400 text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Delete Message?</h3>
                            <p className="text-gray-400 text-sm mb-6">This cannot be undone.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl border border-white/10 hover:border-white/30 transition text-gray-400 hover:text-white">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-400 transition">Delete</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
