import React, { useRef } from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiFirebase,
  SiNodedotjs,
  SiMysql,
  SiGit,
  SiGithub,
  SiNetlify,
  SiVercel,
  SiC,
  SiCplusplus,
  SiPython,
} from "react-icons/si";
import { MdPhoneIphone } from "react-icons/md";

const ACCENT = "#15AABF";

// Tech groups
const techGroups = [
  {
    category: "Frontend",
    items: [
      { label: "HTML5", Icon: SiHtml5, color: "#e34f26" },
      { label: "CSS3", Icon: SiCss3, color: "#1572B6" },
      { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
      { label: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8" },
      { label: "React Native", Icon: MdPhoneIphone, color: "#61DAFB" },
    ],
  },
  {
    category: "Backend",
    items: [
      { label: "Node.js", Icon: SiNodedotjs, color: "#83CD29" },
      { label: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
      { label: "SQL", Icon: SiMysql, color: "#00758F" },
    ],
  },
  {
    category: "Tools",
    items: [
      { label: "Git", Icon: SiGit, color: "#F05032" },
      { label: "GitHub", Icon: SiGithub, color: "#ffffff" },
      { label: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
      { label: "Vercel", Icon: SiVercel, color: "#ffffff" },
    ],
  },
  {
    category: "Languages",
    items: [
      { label: "C", Icon: SiC, color: "#A8B9CC" },
      { label: "C++", Icon: SiCplusplus, color: "#00599C" },
      { label: "Python", Icon: SiPython, color: "#3776AB" },
    ],
  },
];

function useTilt() {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 10;
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return { ref, onMove, onLeave };
}

const TechStack = () => {
  return (
    <section className="relative bg-black text-gray-200 py-20 px-6 md:px-16 lg:px-24 overflow-hidden w-screen">
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-64 blur-3xl opacity-20"
        style={{ background: `radial-gradient(600px 200px at 50% 0%, ${ACCENT}, transparent 60%)` }}
      />

      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
          Tech <span style={{ color: ACCENT }}>Stack</span>
        </h3>

        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
          Here's the technology I use across frontend, backend, tools, and languages to build powerful apps.
        </p>

        <div className="space-y-12">
          {techGroups.map((group) => (
            <div key={group.category}>
              <h4 className="text-2xl font-semibold mb-6 text-center" style={{ color: ACCENT }}>
                {group.category}
              </h4>

              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                {group.items.map(({ label, Icon, color }) => {
                  const { ref, onMove, onLeave } = useTilt();
                  return (
                    <li key={label}>
                      <div
                        ref={ref}
                        onMouseMove={onMove}
                        onMouseLeave={onLeave}
                        className="relative group rounded-2xl p-4 h-[110px] md:h-[120px] flex items-center justify-center bg-[#0b0b0b] border border-white/5
                                   shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-[box-shadow,transform] duration-200"
                      >
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            boxShadow: `0 0 50px 10px ${ACCENT}20 inset, 0 0 30px ${ACCENT}30`,
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{ boxShadow: `0 0 0 1px ${ACCENT}15 inset` }}
                        />
                        <div className="relative flex flex-col items-center gap-2">
                          <Icon
                            className="transition-transform duration-300 group-hover:scale-110"
                            size={36}
                            style={{ color }}
                            aria-hidden="true"
                          />
                          <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                            {label}
                          </span>
                        </div>
                        <span
                          className="pointer-events-none absolute -top-1 -right-1 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-40"
                          style={{ background: ACCENT }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
