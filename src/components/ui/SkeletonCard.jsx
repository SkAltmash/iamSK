import React from "react";

/**
 * Reusable skeleton card for loading states.
 * Pass `aspect` prop: "video" (16/9) | "square" | "tall"
 */
const SkeletonCard = ({ aspect = "video" }) => {
    const aspectClass =
        aspect === "square"
            ? "aspect-square"
            : aspect === "tall"
                ? "aspect-[3/4]"
                : "aspect-[16/9]";

    return (
        <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden animate-pulse">
            <div className={`${aspectClass} bg-white/5`} />
            <div className="p-5 space-y-3">
                <div className="h-5 bg-white/5 rounded w-3/4" />
                <div className="h-3 bg-white/5 rounded w-full" />
                <div className="h-3 bg-white/5 rounded w-5/6" />
                <div className="flex gap-2 pt-1">
                    <div className="h-5 w-12 bg-white/5 rounded" />
                    <div className="h-5 w-16 bg-white/5 rounded" />
                    <div className="h-5 w-10 bg-white/5 rounded" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
