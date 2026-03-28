import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaImage, FaSpinner, FaNewspaper, FaTags } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const EMPTY = { title: "", slug: "", description: "", content: "", image: "", tags: "" };

const generateSlug = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'code-block'],
        ['clean']
    ],
};

const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'image', 'code-block'
];

export default function BlogsAdmin() {
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
            const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } catch {
            const snap = await getDocs(collection(db, "blogs"));
            setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        }
        setLoading(false);
    };

    useEffect(() => { fetchItems(); }, []);

    const openAdd = () => { setForm(EMPTY); setImageFile(null); setImagePreview(""); setEditId(null); setModal("add"); };

    const openEdit = (item) => {
        setForm({
            title: item.title || "",
            slug: item.slug || "",
            description: item.description || "",
            content: item.content || "",
            image: item.image || "",
            tags: item.tags?.join(", ") || ""
        });
        setImagePreview(item.image || "");
        setImageFile(null);
        setEditId(item.id);
        setModal("edit");
    };

    const closeModal = () => { setModal(null); setEditId(null); };

    const handleImageChange = (e) => {
        const file = e.target.files[0]; if (!file) return;
        setImageFile(file); setImagePreview(URL.createObjectURL(file));
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        if (modal === "add") {
            setForm({ ...form, title, slug: generateSlug(title) });
        } else {
            setForm({ ...form, title });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title || !form.content) return toast.error("Title and Content are required.");

        setSaving(true);
        try {
            let imageUrl = form.image;
            if (imageFile) imageUrl = await uploadToCloudinary(imageFile);

            const tagsArray = form.tags.split(",").map(t => t.trim()).filter(t => t !== "");

            const data = {
                title: form.title.trim(),
                slug: form.slug.trim() || generateSlug(form.title),
                description: form.description.trim(),
                content: form.content, // Quill content is HTML
                image: imageUrl,
                tags: tagsArray,
                updatedAt: new Date()
            };

            if (modal === "add") {
                await addDoc(collection(db, "blogs"), { ...data, createdAt: new Date() });
                toast.success("Blog post added!");
            } else {
                await updateDoc(doc(db, "blogs", editId), data);
                toast.success("Blog updated!");
            }
            closeModal(); fetchItems();
        } catch (err) { toast.error(err.message || "Failed."); }
        finally { setSaving(false); }
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        await deleteDoc(doc(db, "blogs", deleteId));
        setDeleteId(null); toast.success("Deleted."); fetchItems();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />
            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition"><FaArrowLeft /></Link>
                    <h1 className="text-xl font-bold flex-1">Blogs & Articles</h1>
                    <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white font-bold rounded-xl hover:bg-pink-400 transition text-sm">
                        <FaPlus /> Write Post
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="flex justify-center py-20"><FaSpinner className="text-pink-400 text-3xl animate-spin" /></div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No blog posts yet. Start writing!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition flex flex-col">
                                <div className="aspect-video bg-white/5 relative overflow-hidden group">
                                    {item.image ? (
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-white/5">
                                            <FaNewspaper size={32} className="mb-2" />
                                            <span className="text-xs">No Cover Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        {item.tags?.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="font-bold text-lg text-white mb-2 line-clamp-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{item.description}</p>

                                    <div className="flex gap-2 pt-4 border-t border-white/10 mt-auto text-xs text-gray-500 justify-between items-center">
                                        <span>{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString() : 'Draft'}</span>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(item)} className="p-2 bg-white/5 rounded hover:bg-pink-500/20 hover:text-pink-400 transition" title="Edit">
                                                <FaEdit />
                                            </button>
                                            <button onClick={() => setDeleteId(item.id)} className="p-2 bg-white/5 rounded hover:bg-red-500/20 hover:text-red-400 transition" title="Delete">
                                                <FaTrash />
                                            </button>
                                        </div>
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
                            className="w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[90vh] flex flex-col">
                            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-white/5">
                                <h2 className="text-lg font-bold">{modal === "add" ? "Write New Post" : "Edit Post"}</h2>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white text-xl">✕</button>
                            </div>
                            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
                                {/* Left Column: Editor */}
                                <div className="flex-1 flex flex-col space-y-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Post Title *</label>
                                        <input value={form.title} onChange={handleTitleChange} placeholder="Enter a catchy title..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white font-bold text-lg focus:outline-none focus:border-pink-500/60 transition" />
                                    </div>
                                    <div className="flex-1 flex flex-col min-h-[400px]">
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Content *</label>
                                        <div className="flex-1 rounded-lg overflow-hidden border border-white/10 focus-within:border-pink-500/60 transition bg-white/5 [&_.ql-toolbar]:bg-[#1a1a1a] [&_.ql-toolbar]:border-none [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-white/10 [&_.ql-container]:border-none [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-white [&_.ql-picker]:text-gray-300 [&_.ql-stroke]:stroke-gray-300 [&_.ql-fill]:fill-gray-300">
                                            <ReactQuill
                                                theme="snow"
                                                value={form.content}
                                                onChange={(content) => setForm({ ...form, content })}
                                                modules={quillModules}
                                                formats={quillFormats}
                                                className="h-full flex flex-col"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Meta */}
                                <div className="w-full md:w-72 shrink-0 space-y-6">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-2 font-medium">Cover Image</label>
                                        <label className="block cursor-pointer">
                                            <div className="border-2 border-dashed border-white/20 hover:border-pink-500/40 rounded-xl overflow-hidden aspect-video relative group transition-colors">
                                                {imagePreview ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" /> : (
                                                    <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
                                                        <FaImage size={24} /><span className="text-xs">Upload Cover</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <span className="text-white text-xs font-bold px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">Change</span>
                                                </div>
                                            </div>
                                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">URL Slug</label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-white/10 bg-white/5 text-gray-500 text-xs shrink-0">/blog/</span>
                                            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-r-lg text-white text-xs focus:outline-none focus:border-pink-500/60 transition" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium">Short Summary</label>
                                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Brief description for SEO & card..."
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500/60 transition resize-none" />
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1 font-medium"><FaTags className="inline mr-1" /> Tags (comma separated)</label>
                                        <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, Frontend, Tips"
                                            className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-pink-500/60 transition" />
                                    </div>

                                    <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                                        <button type="submit" disabled={saving} className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-pink-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2">
                                            {saving ? <><FaSpinner className="animate-spin" /> Publishing...</> : "Publish Post"}
                                        </button>
                                        <button type="button" onClick={closeModal} className="w-full py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition bg-white/5">
                                            Cancel
                                        </button>
                                    </div>
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
                            <h3 className="text-xl font-bold mb-2">Delete Blog Post?</h3>
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
