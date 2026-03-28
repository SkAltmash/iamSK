import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { FaArrowLeft, FaFilePdf, FaSpinner, FaCloudUploadAlt, FaCheckCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function ResumeAdmin() {
    const [currentResume, setCurrentResume] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);

    const fetchResume = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, "globals", "resume");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && docSnap.data().url) {
                setCurrentResume(docSnap.data().url);
            }
        } catch (error) {
            console.error("Error fetching resume:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchResume();
    }, []);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;
        if (selected.type !== "application/pdf") {
            toast.error("Please select a valid PDF file");
            return;
        }
        setFile(selected);
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            await setDoc(doc(db, "globals", "resume"), { url, updatedAt: new Date() }, { merge: true });
            setCurrentResume(url);
            setFile(null);
            toast.success("Resume updated successfully!");
        } catch (error) {
            toast.error("Failed to upload resume.");
            console.error(error);
        }
        setUploading(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Toaster position="top-center" />

            <div className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link to="/admin" className="text-gray-400 hover:text-white transition">
                        <FaArrowLeft />
                    </Link>
                    <h1 className="text-xl font-bold flex-1">Resume Management</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex justify-center py-20"><FaSpinner className="text-red-500 text-3xl animate-spin" /></div>
                ) : (
                    <div className="space-y-8">
                        {/* Current Resume Display */}
                        <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg">
                            <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                                <FaFilePdf size={32} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Current Resume</h2>

                            {currentResume ? (
                                <div className="space-y-4">
                                    <p className="text-gray-400 text-sm">Your visitors download this PDF when they click "Download CV".</p>
                                    <div className="flex justify-center flex-wrap gap-4 mt-6">
                                        <a href={currentResume} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl border border-white/10 hover:border-red-500/50 hover:bg-white/5 transition flex items-center gap-2 font-medium">
                                            View Current PDF
                                        </a>
                                        <button onClick={() => {
                                            navigator.clipboard.writeText(currentResume);
                                            toast.success("Link copied!");
                                        }} className="px-6 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition flex items-center gap-2 font-medium">
                                            Copy Link
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">No resume is currently uploaded to the database.</p>
                            )}
                        </div>

                        {/* Upload Section */}
                        <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-xl">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <FaCloudUploadAlt className="text-red-500" /> Upload New Resume
                            </h3>

                            <label className={`block cursor-pointer p-10 border-2 border-dashed rounded-xl transition-all duration-300 text-center ${file ? 'border-green-500/50 bg-green-500/5' : 'border-white/20 hover:border-red-500/50 hover:bg-red-500/5'}`}>
                                <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} disabled={uploading} />

                                {file ? (
                                    <div className="flex flex-col items-center">
                                        <FaCheckCircle className="text-green-500 text-4xl mb-3" />
                                        <p className="font-bold text-white mb-1">{file.name}</p>
                                        <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        <p className="text-xs text-green-400 mt-4">Click to select a different file</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <FaCloudUploadAlt className="text-5xl mb-4 text-gray-500" />
                                        <p className="font-bold text-white mb-2">Click or drag PDF here</p>
                                        <p className="text-sm">Only .pdf files are supported</p>
                                    </div>
                                )}
                            </label>

                            <button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className={`w-full mt-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${!file ? 'bg-white/5 text-gray-500 cursor-not-allowed' : uploading ? 'bg-red-500/50 text-white cursor-wait' : 'bg-red-600 text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20'}`}
                            >
                                {uploading ? <><FaSpinner className="animate-spin" /> Uploading...</> : 'Save New Resume'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
