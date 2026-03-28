import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                setTestimonials(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            } catch (err) {
                console.error("Error fetching testimonials", err);
            }
            setLoading(false);
        };

        fetchTestimonials();
    }, []);

    if (loading || testimonials.length === 0) {
        return null; // Don't render anything if loading or empty
    }

    return (
        <section className="py-20 relative w-full overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Testimonials</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Here's what people are saying about working with me.
                    </p>
                </motion.div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="pb-16"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id} className="h-auto">
                            <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 relative flex flex-col hover:border-cyan-500/30 transition-colors group">
                                <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-white/5 group-hover:text-cyan-500/10 transition-colors" />

                                <div className="flex gap-1 mb-6 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < item.rating ? "" : "text-gray-600"} size={16} />
                                    ))}
                                </div>

                                <p className="text-gray-300 italic mb-8 leading-relaxed flex-1">
                                    "{item.content}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-cyan-500/20 border-2 border-cyan-500/30 shrink-0">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-xl">
                                                {item.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{item.name}</h4>
                                        <p className="text-sm text-cyan-400">
                                            {item.role} {item.company && <span className="text-gray-500">@ {item.company}</span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
