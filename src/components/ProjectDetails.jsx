import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

 const projects = [
  {
    slug: "Sales-Tracking-App",
    title: "Sales Tracking + Invoice Application",
    image: "smsAdmin.png",
    description: "Sales Management System for a retail business to track sales, manage inventory, and generate invoices with ease.",
    impact: [
      "Streamlined sales tracking and inventory management",
      "Automated invoice generation saving time and reducing errors",
    ],
    technologies: ["React Native", "Firebase", "Expo", "Expo-Share",  "Tailwind CSS"],
    status: "Delivered to Client",
  

  }
  ,
  {
    slug: "Smart-Fix-Services",
    title: "Smart Fix Services Website",
    image: "sms.png",
    description:
      "A sleek, modern website for Smart Fix Services, a tech repair business in hinganghat, showcasing services, pricing, and contact info with smooth animations.",
    impact: [
      "Enhanced online visibility for local business",
      "Professional branding with fast-loading UI",
    ],
    technologies: ["React", "Next.js", "Firebase" , "Tailwind CSS", "Framer Motion"],
    status: "Delivered to Client",
    live: "https://smartfixservices.help",
    
  },
  {
    slug: "pos-perfect-auto-parts",
    title: "Sales & Inventory Management System (POS)",
    image: "PerfectAutoParts.png",
    description:
      "A full POS system built for a live auto-parts business — includes real billing workflow, retailer management, inventory tracking, and statements panel.",
    impact: [
      "60% faster billing & cashflow tracking",
      "Used daily in real business operations",
    ],
    technologies: ["React", "Node.js", "Firebase", "Tailwind CSS", "Charts"],
    status: "Delivered to Client",
    youtube: "https://www.youtube.com/embed/vFygI_2ArP4",
    
  },

  {
    slug: "marco-teck",
    title: "MarcoTech E-Com Website",
    image: "marco.png",
    description:
      "A modern, responsive business website built for Marco Teck Hyderabad to showcase services, brand identity, and contact details with smooth animations.",
    impact: [
      "Improved online presence for local business",
      "Professional branding with fast-loading UI",
    ],
    technologies: ["React", "Next.js", "Firebase" , "Tailwind CSS", "Framer Motion"],
    status: "Delivered to Client",
    live: "https://marcotech.shop/",
    youtube: "https://www.youtube.com/embed/xQyEWSui1Xk",
  },

  {
    slug: "ecommerce-bdgc",
    title: "E-commerce Website – BDGC",
    image: "bgdc.png",
    description:
      "Shopping platform for Baby Care products with cart, secure checkout and inventory sync with admin panel.",
    impact: [
      "Online orders enabled for local customers",
      "Ready integrated online payments (UPI / Card)",
    ],
    technologies: ["React", "Node.js", "Firebase", "Tailwind CSS"],
    status: "Delivered to Client",
    live: "https://baby-daiper-and-genral-care.netlify.app/",
    youtube: "https://www.youtube.com/embed/z02s8ORQyv4",
  },

  {
    slug: "admin-app-bdgc",
    title: "Admin Application – BDGC",
    image: "BDGCAdmin.png",
    description:
      "Admin app to manage products, orders, retailers and analytics — fully connected with backend.",
    impact: [
      "Reduced manual workload by 50%",
      "Full control — mobile-friendly operations",
    ],
    technologies: ["React Native", "Node.js", "Firebase", "Telegram Bot"],
    status: "Delivered to Client",
    youtube: "https://www.youtube.com/embed/3JwjiZbYrmk",
    readMore:
      "https://www.linkedin.com/posts/skaltamash18_react-reactnative-expo-activity-7399686177215324160-ycsd",
  },
];
export default function ProjectDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <div className="text-white p-10">Project not found</div>;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      
      {/* 🔙 Back Button */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition"
        >
          <FaArrowLeft /> Back to Projects
        </button>
      </div>

      {/* 🎬 Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-4"
        >
          {project.title}
        </motion.h1>
        <p className="text-gray-400 max-w-2xl">{project.description}</p>
      </div>

      {/* 🎥 Media Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {project.youtube ? (
            <iframe
              src={project.youtube + "?autoplay=1"}
              className="w-full aspect-video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <img src={`/${project.image}`} alt={project.title} className="w-full" />
          )}
        </div>
      </div>

      {/* 📊 Details Section */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
        
        {/* LEFT */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-cyan-400 text-lg font-semibold mb-3">Project Overview</h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition"
            >
              Visit Live Website
            </a>
          )}
        </div>

        {/* RIGHT */}
        <div className="space-y-10">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.impact && (
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase mb-4">Impact</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {project.impact.map((item, i) => (
                  <li key={i}>▹ {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
