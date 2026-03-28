import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaImage, FaSpinner } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const EMPTY = {
    title: "", slug: "", description: "", image: "",
    technologies: "", link: "", github: "", youtube: "",
};

export default function PersonalProjectsAdmin() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        const snap = await getDocs(collection(db, "personalProjects"));
        setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
    };

    useEffect(() => { fetchProjects(); }, []);

    const openAdd = () => {
        setForm(EMPTY); setImageFile(null); setImagePreview(""); setEditId(null); setModal("add");
    };
    const openEdit = (p) => {
        setForm({
            title: p.title || "", slug: p.slug || "", description: p.description || "",
            image: p.image || "", technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : "",
            link: p.link || "", github: p.github || "", youtube: p.youtube || "",
        });
        setImagePreview(p.image || ""); setImageFile(null); setEditId(p.id); setModal("edit");
    };
    const closeModal = () => { setModal(null); setEditId(null); };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title || !form.slug) return toast.error("Title and Slug are required.");
        setSaving(true);
        try {
            let imageUrl = form.image;
            if (imageFile) imageUrl = await uploadToCloudinary(imageFile);
            const data = {
                title: form.title.trim(), slug: form.slug.trim().replace(/\s+/g, "-"),
                description: form.description.trim(), image: imageUrl,
                technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
                link: form.link.trim(), github: form.github.trim(), youtube: form.youtube.trim(),
                updatedAt: new Date(),
            };
            if (modal === "add") {
                await addDoc(collection(db, "personalProjects"), { ...data, createdAt: new Date() });
                toast.success("Project added!");
            } else {
                await updateDoc(doc(db, "personalProjects", editId), data);
                toast.success("Updated!");
            }
            closeModal(); fetchProjects();
        } catch (err) {
            toast.error(err.message || "Failed to save.");
        } finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        await deleteDoc(doc(db, "personalProjects", deleteId));
        setDeleteId(null); toast.success("Deleted."); fetchProjects();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />
            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition"><FaArrowLeft /></Link>
                    <h1 className="text-xl font-bold flex-1">Personal Projects</h1>
                    <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition text-sm">
                        <FaPlus /> Add Project
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex justify-center py-20"><FaSpinner className="text-cyan-400 text-3xl animate-spin" /></div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No personal projects yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((p) => (
                            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition">
                                <div className="aspect-[16/9] bg-white/5 overflow-hidden">
                                    {p.image && <img src={p.image} alt={p.title} className="w-full h-full object-cover" />}
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-white line-clamp-1">{p.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1 font-mono">/{p.slug}</p>
                                    <div className="flex gap-2 mt-4">
                                        <button onClick={() => openEdit(p)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition">
                                            <FaEdit size={12} /> Edit
                                        </button>
                                        <button onClick={() => setDeleteId(p.id)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-sm hover:border-red-500/50 hover:text-red-400 transition">
                                            <FaTrash size={12} /> Delete
                                        </button>
                                    </div>
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
                            className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-lg font-bold">{modal === "add" ? "Add Personal Project" : "Edit Project"}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4">
                                <label className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-white/10 hover:border-cyan-400/40 rounded-xl overflow-hidden aspect-[16/9] relative group transition-colors">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
                                                <FaImage size={32} /><span className="text-sm">Click to upload image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white text-sm font-bold">Change Image</span>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2"><FieldInput label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} /></div>
                                    <FieldInput label="Slug *" value={form.slug} placeholder="my-project" onChange={(v) => setForm({ ...form, slug: v })} />
                                    <FieldInput label="Live URL" value={form.link} placeholder="https://..." onChange={(v) => setForm({ ...form, link: v })} />
                                    <div className="col-span-2"><FieldArea label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} /></div>
                                    <div className="col-span-2"><FieldInput label="Technologies (comma separated)" value={form.technologies} placeholder="React, Firebase" onChange={(v) => setForm({ ...form, technologies: v })} /></div>
                                    <FieldInput label="GitHub URL" value={form.github} placeholder="https://github.com/..." onChange={(v) => setForm({ ...form, github: v })} />
                                    <FieldInput label="YouTube Embed URL" value={form.youtube} placeholder="https://www.youtube.com/embed/..." onChange={(v) => setForm({ ...form, youtube: v })} />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition disabled:opacity-50 flex items-center justify-center gap-2">
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
                            <h3 className="text-xl font-bold mb-2">Delete Project?</h3>
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

const FieldInput = ({ label, value, onChange, placeholder = "" }) => (
    <div>
        <label className="block text-xs text-gray-400 mb-1 font-medium">{label}</label>
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition" />
    </div>
);
const FieldArea = ({ label, value, onChange, rows = 3, placeholder = "" }) => (
    <div>
        <label className="block text-xs text-gray-400 mb-1 font-medium">{label}</label>
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} placeholder={placeholder}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition resize-none" />
    </div>
);
