import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, writeBatch
} from "firebase/firestore";
import { db } from "../../firebase";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaSpinner, FaGripVertical, FaCheck } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const EMPTY = {
    title: "", price: "", desc: "", gradient: "from-blue-500 to-cyan-400", popular: false, features: [], order: 0
};

// Sortable Item Component
function SortablePlan({ plan, onEdit, onDelete }) {
    const {
        attributes, listeners, setNodeRef, transform, transition,
    } = useSortable({ id: plan.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center p-4 gap-4 hover:border-white/20 transition mb-3">
            <div {...attributes} {...listeners} className="cursor-grab text-gray-500 hover:text-white p-2 shrink-0">
                <FaGripVertical />
            </div>

            <div className={`w-3 h-12 rounded-full bg-gradient-to-b ${plan.gradient} shrink-0`} />

            <div className="flex-1">
                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-white text-lg">{plan.title}</h3>
                    {plan.popular && <span className="px-2 py-0.5 text-[10px] bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded uppercase font-bold tracking-wider">Popular</span>}
                </div>
                <p className="text-cyan-400 font-bold">{plan.price}</p>
                <p className="text-sm text-gray-500 line-clamp-1">{plan.desc}</p>
            </div>
            <div className="flex gap-2 shrink-0">
                <button
                    onClick={() => onEdit(plan)}
                    className="p-3 rounded-lg bg-white/5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(plan.id)}
                    className="p-3 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default function PricingAdmin() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null); // null | "add" | "edit"
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const fetchPlans = async () => {
        setLoading(true);
        const q = query(collection(db, "pricingPlans"), orderBy("order", "asc"));
        try {
            const snap = await getDocs(q);
            setPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const snap = await getDocs(collection(db, "pricingPlans"));
            setPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchPlans(); }, []);

    const openAdd = () => {
        setForm({ ...EMPTY, order: plans.length, features: [{ name: "", included: true }] });
        setEditId(null);
        setModal("add");
    };

    const openEdit = (p) => {
        setForm({
            title: p.title || "",
            price: p.price || "",
            desc: p.desc || "",
            gradient: p.gradient || "from-blue-500 to-cyan-400",
            popular: p.popular || false,
            features: p.features || [],
            order: p.order || 0
        });
        setEditId(p.id);
        setModal("edit");
    };

    const closeModal = () => { setModal(null); setEditId(null); };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title) return toast.error("Title is required.");
        setSaving(true);

        try {
            // filter out empty features
            const cleanedFeatures = form.features.filter(f => f.name.trim() !== "");

            const data = {
                title: form.title.trim(),
                price: form.price.trim(),
                desc: form.desc.trim(),
                gradient: form.gradient,
                popular: form.popular,
                features: cleanedFeatures,
                order: form.order,
                updatedAt: new Date(),
            };

            if (modal === "add") {
                await addDoc(collection(db, "pricingPlans"), { ...data, createdAt: new Date() });
                toast.success("Pricing plan added!");
            } else {
                await updateDoc(doc(db, "pricingPlans", editId), data);
                toast.success("Pricing plan updated!");
            }

            closeModal();
            fetchPlans();
        } catch (err) {
            toast.error(err.message || "Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteDoc(doc(db, "pricingPlans", deleteId));
            setDeleteId(null);
            toast.success("Deleted.");
            fetchPlans();
        } catch {
            toast.error("Delete failed.");
        }
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = plans.findIndex((s) => s.id === active.id);
            const newIndex = plans.findIndex((s) => s.id === over.id);

            const newPlans = arrayMove(plans, oldIndex, newIndex);
            setPlans(newPlans);

            try {
                const batch = writeBatch(db);
                newPlans.forEach((plan, index) => {
                    if (plan.order !== index) {
                        const ref = doc(db, "pricingPlans", plan.id);
                        batch.update(ref, { order: index });
                    }
                });
                await batch.commit();
                toast.success("Order saved");
            } catch (err) {
                toast.error("Failed to save order");
                fetchPlans();
            }
        }
    };

    const handleFeatureChange = (index, field, value) => {
        const newFeatures = [...form.features];
        newFeatures[index][field] = value;
        setForm({ ...form, features: newFeatures });
    }

    const addFeature = () => setForm({ ...form, features: [...form.features, { name: "", included: true }] });
    const removeFeature = (index) => setForm({ ...form, features: form.features.filter((_, i) => i !== index) });

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />

            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-xl font-bold flex-1">Pricing Packages</h1>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition text-sm"
                    >
                        <FaPlus /> Add Plan
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10">
                <p className="text-gray-400 mb-6 flex items-center gap-2">
                    <FaGripVertical /> Drag and drop to reorder pricing plans.
                </p>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <FaSpinner className="text-cyan-400 text-3xl animate-spin" />
                    </div>
                ) : plans.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No pricing plans yet. Click "Add Plan" to create one.
                    </div>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={plans.map(s => s.id)} strategy={verticalListSortingStrategy}>
                            {plans.map((plan) => (
                                <SortablePlan key={plan.id} plan={plan} onEdit={openEdit} onDelete={setDeleteId} />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>

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
                            className="w-full max-w-xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
                                <h2 className="text-lg font-bold">{modal === "add" ? "Add Plan" : "Edit Plan"}</h2>
                                <button type="button" onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Title *" value={form.title} placeholder="e.g. Starter" onChange={(v) => setForm({ ...form, title: v })} />
                                    <InputField label="Price" value={form.price} placeholder="e.g. ₹3,999" onChange={(v) => setForm({ ...form, price: v })} />
                                </div>
                                <TextareaField label="Description" value={form.desc} placeholder="Perfect for..." onChange={(v) => setForm({ ...form, desc: v })} rows={2} />

                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Gradient Class" value={form.gradient} placeholder="from-blue-500 to-cyan-400" onChange={(v) => setForm({ ...form, gradient: v })} />
                                    <div className="flex flex-col justify-center pt-5">
                                        <label className="flex items-center gap-2 cursor-pointer text-sm font-bold">
                                            <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="w-4 h-4 rounded bg-white/5 border-white/10 text-purple-500 focus:ring-0" />
                                            Mark as "Most Popular"
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-white/10 pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-bold text-gray-300">Features</label>
                                        <button type="button" onClick={addFeature} className="text-xs bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded hover:bg-cyan-500/30 transition">
                                            + Add Feature
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {form.features.map((feat, idx) => (
                                            <div key={idx} className="flex gap-2 items-center">
                                                <input
                                                    type="text"
                                                    value={feat.name}
                                                    onChange={(e) => handleFeatureChange(idx, "name", e.target.value)}
                                                    placeholder="Feature name..."
                                                    className="flex-1 px-3 py-2 border border-white/10 rounded-lg bg-white/5 text-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleFeatureChange(idx, "included", !feat.included)}
                                                    className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center border transition ${feat.included ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-red-500/10 text-red-500 border-red-500/20 opacity-50'}`}
                                                    title={feat.included ? "Included" : "Not Included"}
                                                >
                                                    {feat.included ? <FaCheck /> : <span>✕</span>}
                                                </button>
                                                <button type="button" onClick={() => removeFeature(idx)} className="text-gray-500 hover:text-red-400 p-2">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-6 shrink-0">
                                    <button type="button" onClick={closeModal} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition flex justify-center items-center gap-2">
                                        {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : "Save Plan"}
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
                            <h3 className="text-xl font-bold mb-2">Delete Plan?</h3>
                            <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteId(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white">Cancel</button>
                                <button onClick={handleDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-400">Delete</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const InputField = ({ label, value, onChange, placeholder = "", type = "text" }) => (
    <div>
        <label className="block text-xs text-gray-400 mb-1 font-medium">{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400/60"
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
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400/60 resize-none"
        />
    </div>
);
