import React from "react";
import { Link } from "react-router-dom";

export default function CallToActionSection() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-[#111] border border-white/10 p-12 md:p-24 text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />

                <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
                        Ready to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-blue-500">Elevate</span> your Brand?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_20px_50px_rgba(6,182,212,0.3)]">
                            Start A Project
                        </Link>
                        <a href="mailto:skaltmash3@gmail.com" className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
                            Copy Email
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
