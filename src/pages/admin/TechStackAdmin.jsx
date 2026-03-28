import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaSpinner, FaGripHorizontal } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CATEGORIES = ["Frontend", "Backend", "Tools"];
const EMPTY = { name: "", category: "Frontend", level: 80, color: "#22d3ee", order: 0 };

function SortableStackCard({ item, onEdit, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <motion.div
            ref={setNodeRef} style={style}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 hover:border-white/20 transition relative group"
        >
            <div
                {...attributes}
                {...listeners}
                className="absolute -top-3 -right-3 z-10 p-1.5 bg-black/80 border border-white/10 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition cursor-grab active:cursor-grabbing"
            >
                <FaGripHorizontal size={12} />
            </div>

            <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-white">{item.name}</span>
                <span className="text-xs font-mono text-gray-400">{item.level}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                <div className="h-full rounded-full" style={{ width: `${item.level}%`, backgroundColor: item.color }} />
            </div>
            <div className="flex gap-2">
                <button onClick={() => onEdit(item)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-white/10 text-xs hover:border-green-400/50 hover:text-green-400 transition">
                    <FaEdit size={10} /> Edit
                </button>
                <button onClick={() => onDelete(item.id)} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-white/10 text-xs hover:border-red-500/50 hover:text-red-400 transition">
                    <FaTrash size={10} /> Delete
                </button>
            </div>
        </motion.div>
    );
}

export default function TechStackAdmin() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const fetchItems = async () => {
        setLoading(true);
        const { query, orderBy } = await import("firebase/firestore");
        const q = query(collection(db, "techStack"), orderBy("order", "asc"));
        try {
            const snap = await getDocs(q);
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const snap = await getDocs(collection(db, "techStack"));
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const openAdd = () => { setForm({ ...EMPTY, order: items.length }); setEditId(null); setModal("add"); };
    const openEdit = (item) => {
        setForm({ name: item.name || "", category: item.category || "Frontend", level: item.level || 80, color: item.color || "#22d3ee", order: item.order || 0 });
        setEditId(item.id); setModal("edit");
    };
    const closeModal = () => { setModal(null); setEditId(null); };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.name) return toast.error("Name is required.");
        setSaving(true);
        try {
            const data = { name: form.name.trim(), category: form.category, level: Number(form.level), color: form.color, order: form.order, updatedAt: new Date() };
            if (modal === "add") {
                await addDoc(collection(db, "techStack"), { ...data, createdAt: new Date() });
                toast.success("Tech added!");
            } else {
                await updateDoc(doc(db, "techStack", editId), data);
                toast.success("Updated!");
            }
            closeModal(); fetchItems();
        } catch (err) { toast.error(err.message || "Failed."); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        await deleteDoc(doc(db, "techStack", deleteId));
        setDeleteId(null); toast.success("Deleted."); fetchItems();
    };

    // Group by category for display
    const grouped = CATEGORIES.reduce((acc, cat) => {
        acc[cat] = items.filter((i) => i.category === cat);
        return acc;
    }, {});

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;
        if (active.id !== over.id) {
            const oldIndex = items.findIndex((p) => p.id === active.id);
            const newIndex = items.findIndex((p) => p.id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex);

            // Allow cross-category moving by adopting the over item's category
            if (items[oldIndex].category !== items[newIndex].category) {
                newItems[newIndex].category = items[newIndex].category;
            }

            setItems([...newItems]);

            try {
                const { writeBatch } = await import("firebase/firestore");
                const batch = writeBatch(db);
                newItems.forEach((itm, i) => {
                    batch.update(doc(db, "techStack", itm.id), { order: i, category: itm.category });
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
                    <h1 className="text-xl font-bold flex-1">Tech Stack</h1>
                    <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition text-sm">
                        <FaPlus /> Add Skill
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                <p className="text-gray-400 mb-6 flex items-center gap-2">
                    <FaGripHorizontal /> Drag the top right corner of any card to reorder skills. Moving between categories is supported.
                </p>
                {loading ? (
                    <div className="flex justify-center py-20"><FaSpinner className="text-green-400 text-3xl animate-spin" /></div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No skills yet. Add them via "Add Skill".</div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <div className="space-y-10">
                            {CATEGORIES.map((cat) => (
                                grouped[cat]?.length > 0 && (
                                    <div key={cat}>
                                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">{cat}</h2>
                                        <SortableContext items={grouped[cat].map(i => i.id)} strategy={rectSortingStrategy}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {grouped[cat].map((item) => (
                                                    <SortableStackCard
                                                        key={item.id}
                                                        item={item}
                                                        onEdit={openEdit}
                                                        onDelete={setDeleteId}
                                                    />
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </div>
                                )
                            ))}
                        </div>
                    </DndContext>
                )}
            </div>

            <AnimatePresence>
                {modal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4"
                        onClick={closeModal}>
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-lg font-bold">{modal === "add" ? "Add Skill" : "Edit Skill"}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1 font-medium">Skill Name *</label>
                                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. React"
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-green-400/60 transition" />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1 font-medium">Category</label>
                                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none transition">
                                        {CATEGORIES.map((c) => <option key={c} value={c} className="bg-[#111]">{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1 font-medium">Proficiency Level ({form.level}%)</label>
                                    <input type="range" min={10} max={100} value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}
                                        className="w-full accent-green-400" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Bar Color</label>
                                        <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                                            className="w-10 h-10 rounded-lg border border-white/10 bg-transparent cursor-pointer" />
                                    </div>
                                    <div className="flex-1 h-2 rounded-full mt-5" style={{ backgroundColor: form.color, opacity: 0.7 }} />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition">Cancel</button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-green-500 text-black font-bold hover:bg-green-400 transition disabled:opacity-50 flex items-center justify-center gap-2">
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
                            <h3 className="text-xl font-bold mb-2">Delete Skill?</h3>
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
