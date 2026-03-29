import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Hero from "./hero/Hero";
import AboutPreviewSection from "./home/AboutPreviewSection";
import ServicesSection from "./home/ServicesSection";
import SelectedWorkSection from "./home/SelectedWorkSection";
import Testimonials from "./home/Testimonials";
import CallToActionSection from "./home/CallToActionSection";

export default function Home() {
    const [projects, setProjects] = useState([]);

    const safeSrc = (src) => {
        if (!src) return null;
        const trimmed = typeof src === 'string' ? src.trim() : src;
        return trimmed === '' ? null : trimmed;
    };

    useEffect(() => {
        const fetchPreviews = async () => {
            try {
                const qProj = query(collection(db, "clientProjects"), orderBy("order", "asc"), limit(3));
                const pSnap = await getDocs(qProj);
                setProjects(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
            } catch (err) {
                console.error("Error fetching previews:", err);
            }
        };
        fetchPreviews();
    }, []);

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-pink-500/30">
            <Hero />
            <AboutPreviewSection />
            <ServicesSection />
            <SelectedWorkSection projects={projects} safeSrc={safeSrc} />
            <Testimonials />
            <CallToActionSection />
        </div>
    );
}
