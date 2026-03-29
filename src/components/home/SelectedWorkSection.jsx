import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export default function SelectedWorkSection({ projects, safeSrc }) {
    const navigate = useNavigate();

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
                <h2 className="text-3xl md:text-5xl font-bold">Selected Work</h2>
                <Link to="/projects" className="text-cyan-400 font-bold hover:underline">View All</Link>
            </div>

            <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-10 snap-x no-scrollbar">
                {projects.map((project) => (
                    <div key={project.id} className="min-w-[85vw] md:min-w-0 snap-center">
                        <div
                            onClick={() => navigate(`/projects/${project.slug}`)}
                            className="group block cursor-pointer"
                        >
                            <div className="relative rounded-[2rem] overflow-hidden mb-6 bg-white/5">
                                <img src={safeSrc(project.image)} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center">
                                        <span className="font-bold">Explore Project</span>
                                        <ExternalLink size={18} />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                            <p className="text-pink-500 font-mono text-xs uppercase tracking-widest">{project.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
