import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaImage, FaSpinner, FaQuoteLeft, FaStar } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const EMPTY = { name: "", role: "", company: "", content: "", rating: 5, avatar: "" };

export default function TestimonialsAdmin() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const snap = await getDocs(collection(db, "testimonials"));
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const openAdd = () => { setForm(EMPTY); setImageFile(null); setImagePreview(""); setEditId(null); setModal("add"); };
    const openEdit = (item) => {
        setForm({
            name: item.name || "",
            role: item.role || "",
            company: item.company || "",
            content: item.content || "",
            rating: item.rating || 5,
            avatar: item.avatar || ""
        });
        setImagePreview(item.avatar || ""); setImageFile(null); setEditId(item.id); setModal("edit");
    };
    const closeModal = () => { setModal(null); setEditId(null); };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; if (!file) return;
        setImageFile(file); setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.name || !form.content) return toast.error("Name and Content are required.");
        setSaving(true);
        try {
            let avatarUrl = form.avatar;
            if (imageFile) avatarUrl = await uploadToCloudinary(imageFile);
            const data = {
                name: form.name.trim(),
                role: form.role.trim(),
                company: form.company.trim(),
                content: form.content.trim(),
                rating: Number(form.rating),
                avatar: avatarUrl,
                updatedAt: new Date()
            };
            if (modal === "add") {
                await addDoc(collection(db, "testimonials"), { ...data, createdAt: new Date() });
                toast.success("Testimonial added!");
            } else {
                await updateDoc(doc(db, "testimonials", editId), data);
                toast.success("Updated successfully!");
            }
            closeModal(); fetchItems();
        } catch (err) { toast.error(err.message || "Failed to save."); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        await deleteDoc(doc(db, "testimonials", deleteId));
        setDeleteId(null); toast.success("Deleted."); fetchItems();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />
            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition"><FaArrowLeft /></Link>
                    <h1 className="text-xl font-bold flex-1">Testimonials</h1>
                    <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-400 transition text-sm">
                        <FaPlus /> Add Testimonial
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex justify-center py-20"><FaSpinner className="text-purple-400 text-3xl animate-spin" /></div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No testimonials yet. Add your first one!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-[#111] border border-white/10 rounded-2xl p-6 relative flex flex-col hover:border-white/20 transition group">
                                <FaQuoteLeft className="text-white/5 text-6xl absolute top-4 right-4 z-0" />
                                <div className="flex gap-1 mb-4 text-yellow-400 relative z-10">
                                    {[...Array(5)].map((_, idx) => (
                                        <FaStar key={idx} className={idx < item.rating ? "" : "text-gray-600"} size={14} />
                                    ))}
                                </div>
                                <p className="text-gray-300 text-sm line-clamp-4 flex-1 mb-6 relative z-10 italic">
                                    "{item.content}"
                                </p>
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.role} {item.company ? `@ ${item.company}` : ''}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6 relative z-10 border-t border-white/5 pt-4">
                                    <button onClick={() => openEdit(item)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-xs hover:border-purple-400/50 hover:text-purple-400 transition">
                                        <FaEdit size={12} /> Edit
                                    </button>
                                    <button onClick={() => setDeleteId(item.id)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-xs hover:border-red-500/50 hover:text-red-400 transition">
                                        <FaTrash size={12} /> Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {modal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6"
                        onClick={closeModal}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-lg font-bold">{modal === "add" ? "Add Testimonial" : "Edit Testimonial"}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4">
                                <div className="flex items-center gap-6">
                                    <label className="block cursor-pointer shrink-0">
                                        <div className="w-20 h-20 border-2 border-dashed border-white/20 hover:border-purple-400/40 rounded-full overflow-hidden relative group transition-colors">
                                            {imagePreview ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" /> : (
                                                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                                    <FaImage size={24} />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <span className="text-white text-[10px] font-bold">Upload</span>
                                            </div>
                                        </div>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                    <div className="text-sm text-gray-400">
                                        <p className="text-white font-bold mb-1">Client Avatar</p>
                                        <p className="text-xs">Upload a square image for best results. Optional.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Client Name *</label>
                                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400/60 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Rating (1-5)</label>
                                        <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none transition [&>option]:bg-[#111]">
                                            {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Role / Title</label>
                                        <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. CEO"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400/60 transition" />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Company Name</label>
                                        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. TechCorp"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400/60 transition" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1 font-medium">Testimonial Content *</label>
                                    <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={4}
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-400/60 transition resize-none" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition disabled:opacity-50 flex items-center justify-center gap-2">
                                        {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : "Save"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteId && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center px-4">
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
                            <FaTrash className="text-red-400 text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Delete Testimonial?</h3>
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
