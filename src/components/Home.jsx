import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Hero from "./hero/Hero";
import AboutPreviewSection from "./home/AboutPreviewSection";
import ServicesSection from "./home/ServicesSection";
import SelectedWorkSection from "./home/SelectedWorkSection";
import Testimonials from "./home/Testimonials";
import CallToActionSection from "./home/CallToActionSection";
import { Helmet } from "react-helmet-async";

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
            <Helmet>
                <title>Altamash Sheikh | Full Stack & React Native Developer</title>
                <meta name="description" content="Portfolio of Altamash Sheikh, a Full Stack Developer specializing in React, React Native, Node.js, and scalable cloud solutions. Check out my client projects and achievements." />
                <meta name="keywords" content="Altamash Sheikh, Portfolio, Full Stack Developer, React Native, React, Node.js, Firebase, Freelancer" />
                <link rel="canonical" href="https://www.altamash.xyz/home" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.altamash.xyz/home" />
                <meta property="og:title" content="Altamash Sheikh | Full Stack & React Native Developer" />
                <meta property="og:description" content="Portfolio of Altamash Sheikh, a Full Stack Developer specializing in React, React Native, Node.js, and scalable cloud solutions." />
                <meta property="og:image" content="https://www.altamash.xyz/logo.png" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://www.altamash.xyz/home" />
                <meta property="twitter:title" content="Altamash Sheikh | Full Stack & React Native Developer" />
                <meta property="twitter:description" content="Portfolio of Altamash Sheikh, a Full Stack Developer specializing in React, React Native, Node.js, and scalable cloud solutions." />
                <meta property="twitter:image" content="https://www.altamash.xyz/logo.png" />

                {/* Structured Data / JSON-LD */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        "name": "Altamash Sheikh",
                        "url": "https://www.altamash.xyz",
                        "image": "https://www.altamash.xyz/logo.png",
                        "sameAs": [
                            "https://github.com/SkAltmash",
                            "https://linkedin.com/in/altamash-sheikh-1ba6a72aa"
                        ],
                        "jobTitle": "Full Stack & React Native Developer",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Freelance"
                        },
                        "description": "Full Stack Developer and React Native Specialist building high-performance web and mobile solutions.",
                        "knowsAbout": ["React", "React Native", "Firebase", "Node.js", "JavaScript", "Software Architecture", "Tailwind CSS", "Framer Motion"]
                    })}
                </script>
            </Helmet>
            <Hero />
            <AboutPreviewSection />
            <ServicesSection />
            <SelectedWorkSection projects={projects} safeSrc={safeSrc} />
            <Testimonials />
            <CallToActionSection />
        </div>
    );
}
