import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query, writeBatch
} from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaImage, FaSpinner, FaGripVertical } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const EMPTY = {
    title: "", description: "", icon: "", order: 0
};

// Sortable Item Component
function SortableService({ service, onEdit, onDelete }) {
    const {
        attributes, listeners, setNodeRef, transform, transition,
    } = useSortable({ id: service.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center p-4 gap-4 hover:border-white/20 transition mb-3">
            <div {...attributes} {...listeners} className="cursor-grab text-gray-500 hover:text-white p-2">
                <FaGripVertical />
            </div>
            {service.icon ? (
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                    <img src={service.icon} alt={service.title} className="w-full h-full object-cover" />
                </div>
            ) : (
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center shrink-0 text-cyan-500 font-bold">
                    {service.title.charAt(0)}
                </div>
            )}
            <div className="flex-1">
                <h3 className="font-bold text-white text-lg">{service.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(service)}
                    className="p-3 rounded-lg bg-white/5 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(service.id)}
                    className="p-3 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition"
                >
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default function ServicesAdmin() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null); // null | "add" | "edit"
    const [form, setForm] = useState(EMPTY);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const fetchServices = async () => {
        setLoading(true);
        const q = query(collection(db, "services"), orderBy("order", "asc"));
        try {
            const snap = await getDocs(q);
            setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const snap = await getDocs(collection(db, "services"));
            setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchServices(); }, []);

    const openAdd = () => {
        setForm({ ...EMPTY, order: services.length });
        setImageFile(null);
        setImagePreview("");
        setEditId(null);
        setModal("add");
    };

    const openEdit = (s) => {
        setForm({
            title: s.title || "",
            description: s.description || "",
            icon: s.icon || "",
            order: s.order || 0
        });
        setImagePreview(s.icon || "");
        setImageFile(null);
        setEditId(s.id);
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
        if (!form.title) return toast.error("Title is required.");
        setSaving(true);

        try {
            let iconUrl = form.icon;
            if (imageFile) {
                iconUrl = await uploadToCloudinary(imageFile);
            }

            const data = {
                title: form.title.trim(),
                description: form.description.trim(),
                icon: iconUrl,
                order: form.order,
                updatedAt: new Date(),
            };

            if (modal === "add") {
                await addDoc(collection(db, "services"), { ...data, createdAt: new Date() });
                toast.success("Service added!");
            } else {
                await updateDoc(doc(db, "services", editId), data);
                toast.success("Service updated!");
            }

            closeModal();
            fetchServices();
        } catch (err) {
            toast.error(err.message || "Failed to save.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteDoc(doc(db, "services", deleteId));
            setDeleteId(null);
            toast.success("Deleted.");
            fetchServices();
        } catch {
            toast.error("Delete failed.");
        }
    };

    // Handle Drag End event
    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = services.findIndex((s) => s.id === active.id);
            const newIndex = services.findIndex((s) => s.id === over.id);

            const newServices = arrayMove(services, oldIndex, newIndex);

            // Optimistically update UI
            setServices(newServices);

            // Save new order to Firebase using a batch write
            try {
                const batch = writeBatch(db);
                newServices.forEach((service, index) => {
                    if (service.order !== index) {
                        const ref = doc(db, "services", service.id);
                        batch.update(ref, { order: index });
                    }
                });
                await batch.commit();
                toast.success("Order saved");
            } catch (err) {
                toast.error("Failed to save order");
                fetchServices(); // revert UI if fail
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />

            {/* Header */}
            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-xl font-bold flex-1">Services Management</h1>
                    <button
                        onClick={openAdd}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition text-sm"
                    >
                        <FaPlus /> Add Service
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <p className="text-gray-400 mb-6 flex items-center gap-2">
                    <FaGripVertical /> Drag and drop to reorder services. Real-time updating enabled.
                </p>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <FaSpinner className="text-cyan-400 text-3xl animate-spin" />
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No services yet. Click "Add Service" to seed your first entry.
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={services.map(s => s.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {services.map((service) => (
                                <SortableService
                                    key={service.id}
                                    service={service}
                                    onEdit={openEdit}
                                    onDelete={setDeleteId}
                                />
                            ))}
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
                            className="w-full max-w-md bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-lg font-bold">{modal === "add" ? "Add Service" : "Edit Service"}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                {/* Image Upload */}
                                <label className="block cursor-pointer">
                                    <div className="border-2 border-dashed border-white/10 hover:border-cyan-400/40 rounded-xl overflow-hidden aspect-video relative group transition-colors">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
                                                <FaImage size={24} />
                                                <span className="text-xs">Upload Icon</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <span className="text-white text-xs font-bold">Change Icon</span>
                                        </div>
                                    </div>
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                </label>

                                <InputField label="Title *" value={form.title} placeholder="e.g. Web Development" onChange={(v) => setForm({ ...form, title: v })} />
                                <TextareaField label="Description" value={form.description} placeholder="Describe the service..." onChange={(v) => setForm({ ...form, description: v })} rows={3} />

                                <div className="flex gap-3 pt-4 border-t border-white/10 mt-4">
                                    <button type="button" onClick={closeModal} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition text-sm">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 py-2.5 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <><FaSpinner className="animate-spin" /> Saving...</> : "Save Service"}
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
                            <h3 className="text-xl font-bold mb-2">Delete Service?</h3>
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
