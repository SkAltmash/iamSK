import React, { useRef, useState } from "react";

export default function SpotlightCard({ children, className = "", color = "cyan" }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const glowColor = color === "pink" ? "rgba(236, 72, 153, 0.15)" : "rgba(34, 211, 238, 0.15)";

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] transition-all duration-500 hover:border-white/20 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
}
