import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaImage, FaSpinner, FaGripHorizontal } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const EMPTY = {
    title: "", slug: "", description: "", image: "", status: "Delivered to Client",
    technologies: "", impact: "", live: "", youtube: "", order: 0
};

function SortableProjectCard({ project, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition relative group"
        >
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 right-2 z-10 p-2 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing"
            >
                <FaGripHorizontal />
            </div>

            <div className="aspect-[16/9] bg-white/5 overflow-hidden">
                {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                )}
            </div>
            <div className="p-4">
                <p className="text-xs text-cyan-400 font-bold mb-1 uppercase tracking-wider">{project.status}</p>
                <h3 className="font-bold text-white line-clamp-1">{project.title}</h3>
                <p className="text-xs text-gray-500 mt-1 font-mono">/{project.slug}</p>
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => onEdit(project)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition"
                    >
                        <FaEdit size={12} /> Edit
                    </button>
                    <button
                        onClick={() => onDelete(project.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-sm hover:border-red-500/50 hover:text-red-400 transition"
                    >
                        <FaTrash size={12} /> Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function ClientProjectsAdmin() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null); // null | "add" | "edit"
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const fetchProjects = async () => {
        setLoading(true);
        const q = query(collection(db, "clientProjects"), orderBy("order", "asc"));
        try {
            const snap = await getDocs(q);
            setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const fallbackQ = query(collection(db, "clientProjects"), orderBy("createdAt", "desc"));
            try {
                const snap2 = await getDocs(fallbackQ);
                setProjects(snap2.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch {
                const snap = await getDocs(collection(db, "clientProjects"));
                setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            }
        }
        setLoading(false);
    };

    useEffect(() => { fetchProjects(); }, []);

    const openAdd = () => {
        setForm({ ...EMPTY, order: projects.length });
        setImageFile(null);
        setImagePreview("");
        setEditId(null);
        setModal("add");
    };

    const openEdit = (p) => {
        setForm({
            title: p.title || "",
            slug: p.slug || "",
            description: p.description || "",
            image: p.image || "",
            status: p.status || "Delivered to Client",
            technologies: Array.isArray(p.technologies) ? p.technologies.join(", ") : "",
            impact: Array.isArray(p.impact) ? p.impact.join("\n") : "",
            live: p.live || "",
            youtube: p.youtube || "",
            order: p.order || 0,
        });
        setImagePreview(p.image || "");
        setImageFile(null);
        setEditId(p.id);
        setModal("edit");
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
            if (imageFile) {
                imageUrl = await uploadToCloudinary(imageFile);
            }

            const data = {
                title: form.title.trim(),
                slug: form.slug.trim().replace(/\s+/g, "-"),
                description: form.description.trim(),
                image: imageUrl,
                status: form.status,
                technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
                impact: form.impact.split("\n").map((i) => i.trim()).filter(Boolean),
                live: form.live.trim(),
                youtube: form.youtube.trim(),
                order: form.order,
                updatedAt: new Date(),
            };

            if (modal === "add") {
                await addDoc(collection(db, "clientProjects"), { ...data, createdAt: new Date() });
                toast.success("Project added!");
            } else {
                await updateDoc(doc(db, "clientProjects", editId), data);
                toast.success("Project updated!");
            }

            closeModal();
            fetchProjects();
        } catch (err) {
            toast.error(err.message || "Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteDoc(doc(db, "clientProjects", deleteId));
            setDeleteId(null);
            toast.success("Deleted.");
            fetchProjects();
        } catch {
            toast.error("Delete failed.");
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = projects.findIndex((p) => p.id === active.id);
            const newIndex = projects.findIndex((p) => p.id === over.id);

            const newProjects = arrayMove(projects, oldIndex, newIndex);
            setProjects(newProjects);

            try {
                const { writeBatch } = await import("firebase/firestore");
                const batch = writeBatch(db);
                newProjects.forEach((proj, i) => {
                    if (proj.order !== i) {
                        batch.update(doc(db, "clientProjects", proj.id), { order: i });
                    }
                });
                await batch.commit();
                toast.success("Order saved");
            } catch (err) {
                toast.error("Failed to save order");
                fetchProjects();
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />
            {/* Header */}
            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-xl font-bold flex-1">Client Projects</h1>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition text-sm"
                    >
                        <FaPlus /> Add Project
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <p className="text-gray-400 mb-6 flex items-center gap-2">
                    <FaGripHorizontal /> Drag the top right corner of any card to reorder projects. Real-time updating enabled.
                </p>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <FaSpinner className="text-cyan-400 text-3xl animate-spin" />
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No projects yet. Click "Add Project" to seed your first entry.
                    </div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={projects.map(p => p.id)} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {projects.map((p) => (
                                    <SortableProjectCard
                                        key={p.id}
                                        project={p}
                                        onEdit={openEdit}
                                        onDelete={setDeleteId}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>

            {/* Add / Edit Modal */}
            <AnimatePresence>
                {modal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
                        >
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-lg font-bold">{modal === "add" ? "Add Client Project" : "Edit Project"}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4">
                                {/* Image Upload */}
                                <label className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-white/10 hover:border-cyan-400/40 rounded-xl overflow-hidden aspect-[16/9] relative group transition-colors">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
                                                <FaImage size={32} />
                                                <span className="text-sm">Click to upload image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white text-sm font-bold">Change Image</span>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <InputField label="Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
                                    </div>
                                    <InputField label="Slug *" value={form.slug} placeholder="my-project-slug" onChange={(v) => setForm({ ...form, slug: v })} />
                                    <InputField label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })} />
                                    <div className="col-span-2">
                                        <TextareaField label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} rows={3} />
                                    </div>
                                    <div className="col-span-2">
                                        <InputField label="Technologies (comma separated)" value={form.technologies} placeholder="React, Firebase, Tailwind CSS" onChange={(v) => setForm({ ...form, technologies: v })} />
                                    </div>
                                    <div className="col-span-2">
                                        <TextareaField label="Impact (one per line)" value={form.impact} placeholder="Streamlined operations&#10;Reduced errors by 40%" onChange={(v) => setForm({ ...form, impact: v })} rows={3} />
                                    </div>
                                    <InputField label="Live URL" value={form.live} placeholder="https://..." onChange={(v) => setForm({ ...form, live: v })} />
                                    <InputField label="YouTube Embed URL" value={form.youtube} placeholder="https://www.youtube.com/embed/..." onChange={(v) => setForm({ ...form, youtube: v })} />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : "Save Project"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirm */}
            <AnimatePresence>
                {deleteId && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center px-4"
                    >
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
                            <FaTrash className="text-red-400 text-3xl mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Delete Project?</h3>
                            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
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

/* Reusable mini input components */
const InputField = ({ label, value, onChange, placeholder = "", type = "text" }) => (
    <div>
        <label className="block text-xs text-gray-400 mb-1 font-medium">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition"
        />
    </div>
);

const TextareaField = ({ label, value, onChange, rows = 3, placeholder = "" }) => (
    <div>
        <label className="block text-xs text-gray-400 mb-1 font-medium">{label}</label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-400/60 transition resize-none"
        />
    </div>
);
