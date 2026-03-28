import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaImage, FaSpinner, FaTrophy, FaGripHorizontal } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const EMPTY = { title: "", description: "", image: "", rank: 1, order: 0 };

function SortableAchievementCard({ item, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <motion.div
            ref={setNodeRef} style={style}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition relative group"
        >
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 left-2 z-10 p-2 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing"
            >
                <FaGripHorizontal />
            </div>

            <div className="aspect-[16/9] bg-white/5 overflow-hidden relative">
                {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                    <FaTrophy size={10} /> Rank {item.rank}
                </span>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-white line-clamp-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                <div className="flex gap-2 mt-4">
                    <button onClick={() => onEdit(item)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-sm hover:border-yellow-400/50 hover:text-yellow-400 transition">
                        <FaEdit size={12} /> Edit
                    </button>
                    <button onClick={() => onDelete(item.id)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-sm hover:border-red-500/50 hover:text-red-400 transition">
                        <FaTrash size={12} /> Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function AchievementsAdmin() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
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

    const fetchItems = async () => {
        setLoading(true);
        const { query, orderBy } = await import("firebase/firestore");
        const q = query(collection(db, "achievements"), orderBy("order", "asc"));
        try {
            const snap = await getDocs(q);
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const snap = await getDocs(collection(db, "achievements"));
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const openAdd = () => { setForm({ ...EMPTY, order: items.length }); setImageFile(null); setImagePreview(""); setEditId(null); setModal("add"); };
    const openEdit = (item) => {
        setForm({ title: item.title || "", description: item.description || "", image: item.image || "", rank: item.rank || 1, order: item.order || 0 });
        setImagePreview(item.image || ""); setImageFile(null); setEditId(item.id); setModal("edit");
    };
    const closeModal = () => { setModal(null); setEditId(null); };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; if (!file) return;
        setImageFile(file); setImagePreview(URL.createObjectURL(file));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title) return toast.error("Title is required.");
        setSaving(true);
        try {
            let imageUrl = form.image;
            if (imageFile) imageUrl = await uploadToCloudinary(imageFile);
            const data = { title: form.title.trim(), description: form.description.trim(), image: imageUrl, rank: Number(form.rank), order: form.order, updatedAt: new Date() };
            if (modal === "add") {
                await addDoc(collection(db, "achievements"), { ...data, createdAt: new Date() });
                toast.success("Achievement added!");
            } else {
                await updateDoc(doc(db, "achievements", editId), data);
                toast.success("Updated!");
            }
            closeModal(); fetchItems();
        } catch (err) { toast.error(err.message || "Failed."); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        await deleteDoc(doc(db, "achievements", deleteId));
        setDeleteId(null); toast.success("Deleted."); fetchItems();
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((p) => p.id === active.id);
            const newIndex = items.findIndex((p) => p.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);
            setItems(newItems);

            try {
                const { writeBatch } = await import("firebase/firestore");
                const batch = writeBatch(db);
                newItems.forEach((itm, i) => {
                    if (itm.order !== i) {
                        batch.update(doc(db, "achievements", itm.id), { order: i });
                    }
                });
                await batch.commit();
                toast.success("Order saved");
            } catch (err) {
                toast.error("Failed to save order");
                fetchItems();
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />
            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition"><FaArrowLeft /></Link>
                    <h1 className="text-xl font-bold flex-1">Achievements</h1>
                    <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition text-sm">
                        <FaPlus /> Add Achievement
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                <p className="text-gray-400 mb-6 flex items-center gap-2">
                    <FaGripHorizontal /> Drag the top left corner of any card to reorder achievements. Real-time updating enabled.
                </p>
                {loading ? (
                    <div className="flex justify-center py-20"><FaSpinner className="text-yellow-400 text-3xl animate-spin" /></div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No achievements yet.</div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={items.map(p => p.id)} strategy={rectSortingStrategy}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <SortableAchievementCard
                                        key={item.id}
                                        item={item}
                                        onEdit={openEdit}
                                        onDelete={setDeleteId}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
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
                                <h2 className="text-lg font-bold">{modal === "add" ? "Add Achievement" : "Edit Achievement"}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4">
                                <label className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-white/10 hover:border-yellow-400/40 rounded-xl overflow-hidden aspect-[16/9] relative group transition-colors">
                                        {imagePreview ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" /> : (
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
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1 font-medium">Title *</label>
                                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400/60 transition" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1 font-medium">Description</label>
                                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400/60 transition resize-none" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1 font-medium">Rank</label>
                                    <input type="number" min={1} max={10} value={form.rank} onChange={(e) => setForm({ ...form, rank: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-yellow-400/60 transition" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition disabled:opacity-50 flex items-center justify-center gap-2">
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
                            <h3 className="text-xl font-bold mb-2">Delete Achievement?</h3>
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
