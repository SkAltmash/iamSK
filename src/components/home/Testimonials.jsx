import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Sparkles } from "lucide-react";

const StarRating = ({ rating }) => (
    <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
            <FaStar
                key={i}
                size={13}
                className={i < rating ? "text-yellow-400" : "text-white/10"}
            />
        ))}
    </div>
);

const Avatar = ({ avatar, name }) => {
    if (avatar) {
        return (
            <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
            />
        );
    }
    return (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-pink-500/30 border border-white/10 flex items-center justify-center text-xl font-black text-white">
            {name?.charAt(0)?.toUpperCase()}
        </div>
    );
};

const TestimonialCard = ({ item, isActive }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: isActive ? 1 : 0.92, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: -10 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`relative rounded-3xl border p-8 flex flex-col gap-4 transition-all duration-500
            ${isActive
                ? "bg-gradient-to-br from-[#111] to-[#0d0d0d] border-white/20 shadow-[0_0_60px_rgba(34,211,238,0.06)]"
                : "bg-[#0a0a0a] border-white/8 opacity-60"
            }`}
    >
        {/* Decorative quote */}
        <FaQuoteLeft className="absolute top-6 right-6 text-white/5 text-5xl pointer-events-none" />

        <StarRating rating={item.rating} />

        <p className="text-gray-300 text-sm md:text-base leading-relaxed italic flex-1 relative z-10">
            "{item.content}"
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <Avatar avatar={item.avatar} name={item.name} />
            <div>
                <p className="font-bold text-white text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">
                    {item.role}
                    {item.company ? ` @ ${item.company}` : ""}
                </p>
            </div>
        </div>
    </motion.div>
);

// Skeleton loader
const SkeletonCard = () => (
    <div className="rounded-3xl border border-white/8 bg-[#0a0a0a] p-8 animate-pulse">
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-full bg-white/10" />
            ))}
        </div>
        <div className="space-y-2 mb-6">
            <div className="h-3 bg-white/10 rounded-full w-full" />
            <div className="h-3 bg-white/10 rounded-full w-5/6" />
            <div className="h-3 bg-white/10 rounded-full w-4/6" />
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <div className="w-12 h-12 rounded-full bg-white/10" />
            <div className="space-y-2">
                <div className="h-3 bg-white/10 rounded-full w-24" />
                <div className="h-2 bg-white/5 rounded-full w-20" />
            </div>
        </div>
    </div>
);

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const autoPlayRef = useRef(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch {
                const snap = await getDocs(collection(db, "testimonials"));
                setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    // Auto-play
    useEffect(() => {
        if (testimonials.length <= 1 || isHovered) return;
        autoPlayRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(autoPlayRef.current);
    }, [testimonials.length, isHovered]);

    const prev = () => setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
    const next = () => setActiveIndex((i) => (i + 1) % testimonials.length);

    // Show 3 cards on desktop (centered + neighbours)
    const getVisible = () => {
        if (testimonials.length === 0) return [];
        if (testimonials.length === 1) return [{ item: testimonials[0], isActive: true, key: `${testimonials[0].id}-0` }];
        const indices = [
            (activeIndex - 1 + testimonials.length) % testimonials.length,
            activeIndex,
            (activeIndex + 1) % testimonials.length,
        ];
        return indices.map((idx, pos) => ({
            item: testimonials[idx],
            isActive: pos === 1,
            key: `${testimonials[idx].id}-${idx}`,
        }));
    };

    if (loading) {
        return (
            <section className="py-24 bg-[#060606] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center space-y-4">
                        <div className="h-4 bg-white/10 rounded-full w-32 mx-auto animate-pulse" />
                        <div className="h-12 bg-white/10 rounded-full w-72 mx-auto animate-pulse" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                </div>
            </section>
        );
    }

    if (!loading && testimonials.length === 0) return null;

    const visible = getVisible();

    return (
        <section className="py-28 bg-[#060606] border-t border-white/5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={12} />
                        Client Love
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                        Words from{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
                            Happy Clients
                        </span>
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto text-sm">
                        Real results, real people. Here's what they say about working with me.
                    </p>
                </motion.div>

                {/* Cards */}
                <div
                    className={`relative ${testimonials.length >= 3 ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "max-w-lg mx-auto"}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <AnimatePresence mode="popLayout">
                        {visible.map(({ item, isActive, key }) => (
                            <TestimonialCard key={key} item={item} isActive={isActive} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                {testimonials.length > 1 && (
                    <div className="flex items-center justify-center gap-5 mt-12">
                        <button
                            onClick={prev}
                            aria-label="Previous testimonial"
                            className="w-10 h-10 rounded-full border border-white/10 hover:border-cyan-400/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all hover:scale-110"
                        >
                            <FaChevronLeft size={13} />
                        </button>

                        {/* Dot indicators */}
                        <div className="flex gap-2">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className={`rounded-full transition-all duration-300 ${i === activeIndex
                                            ? "w-8 h-2 bg-gradient-to-r from-cyan-400 to-pink-500"
                                            : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            aria-label="Next testimonial"
                            className="w-10 h-10 rounded-full border border-white/10 hover:border-pink-400/50 flex items-center justify-center text-gray-400 hover:text-pink-400 transition-all hover:scale-110"
                        >
                            <FaChevronRight size={13} />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
