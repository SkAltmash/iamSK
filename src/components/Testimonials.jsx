import React, { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // 🔥 safer query (handles missing createdAt)
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          rating: 0, // default fallback
          ...doc.data(),
        }));

        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);

        // fallback if orderBy fails
        try {
          const snap = await getDocs(collection(db, "testimonials"));
          const data = snap.docs.map((doc) => ({
            id: doc.id,
            rating: 0,
            ...doc.data(),
          }));
          setTestimonials(data);
        } catch (e) {
          console.error("Fallback fetch failed:", e);
        }
      }
      setLoading(false);
    };

    fetchTestimonials();
  }, []);

  // ✅ Better UX instead of returning null
  if (loading) {
    return (
      <section className="py-20 text-center text-gray-400">
        Loading testimonials...
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 text-center text-gray-500">
        No testimonials yet.
      </section>
    );
  }

  return (
    <section className="py-20 relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Testimonials
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here's what people are saying about working with me.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-16 scroll-smooth">
          {testimonials?.map((item) => (
            <div key={item.id} className="min-w-full snap-center h-full bg-white/5 border border-white/10 rounded-2xl p-8 relative flex flex-col transition-colors hover:border-cyan-500/30">
              <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-white/10" />

              <div className="flex gap-1 mb-6 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    className={i < (item.rating || 0) ? "" : "text-gray-600"}
                  />
                ))}
              </div>

              <p className="text-gray-300 italic mb-8 leading-relaxed flex-1">
                "{item.content || "No feedback provided."}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-cyan-500/20 border-2 border-cyan-500/30 shrink-0">
                  {item.avatar ? (
                    <img
                      src={item.avatar}
                      alt={item.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-xl">
                      {(item.name || "U").charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-white">
                    {item.name || "Anonymous"}
                  </h4>
                  <p className="text-sm text-cyan-400">
                    {item.role || "Client"}
                    {item.company && (
                      <span className="text-gray-500"> @ {item.company}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}