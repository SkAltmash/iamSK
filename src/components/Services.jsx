import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Code,
  Smartphone,
  LayoutDashboard,
  Wrench,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Zap,
  Globe,
  Database,
  Quote
} from "lucide-react";

/* ---------------- SERVICES DATA ---------------- */
const services = [
  {
    icon: <Globe size={32} />,
    title: "Website Development",
    desc: "Modern, fast & responsive websites tailored for brands and startups.",
    price: "₹500",
    start: "Starting from",
    points: [
      "Landing Pages & Portfolios",
      "SEO Optimized & Fast Loading",
      "Mobile-First Responsive Design",
      "Free Deployment Setup",
    ],
    gradient: "from-blue-500 to-cyan-400"
  },
  {
    icon: <LayoutDashboard size={32} />,
    title: "Web Applications",
    desc: "Custom dashboards and automation systems for business operations.",
    price: "₹1,500",
    start: "Starting from",
    points: [
      "Admin Dashboards & POS",
      "Inventory & CRM Solutions",
      "Secure Backend & APIs",
      "Scalable Architecture",
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Smartphone size={32} />,
    title: "Mobile App Development",
    desc: "High-performance Android & iOS apps using React Native.",
    price: "₹2,500",
    start: "Starting from",
    points: [
      "Business & Utility Apps",
      "Firebase / API Integration",
      "Play Store Ready Builds",
      "Cross-Platform Performance",
    ],
    gradient: "from-green-400 to-emerald-600"
  },
  {
    icon: <Wrench size={32} />,
    title: "Maintenance & Support",
    desc: "Reliable ongoing support to keep your digital assets running smoothly.",
    price: "₹500",
    start: "Monthly",
    points: [
      "Bug Fixes & Security Updates",
      "Feature Enhancements",
      "Performance Monitoring",
      "Priority Support",
    ],
    gradient: "from-orange-400 to-red-500"
  },
];

/* ---------------- HOW I WORK ---------------- */
const steps = [
  {
    id: "01",
    title: "Discovery",
    desc: "We dive deep into your requirements, goals, and target audience.",
  },
  {
    id: "02",
    title: "Strategy & Design",
    desc: "Planning the architecture, UI flow, and selecting the right tech stack.",
  },
  {
    id: "03",
    title: "Development",
    desc: "Writing clean, scalable code with regular progress updates.",
  },
  {
    id: "04",
    title: "Launch",
    desc: "Rigorous testing, final deployment, and handover.",
  },
];

/* ---------------- TESTIMONIALS ---------------- */
const testimonials = [
  {
    name: "Local Business Owner",
    role: "Retail",
    text: "Altamash built a complete POS system for our shop. Billing became faster and tracking inventory is effortless now.",
  },
  {
    name: "Startup Client",
    role: "SaaS",
    text: "Very professional workflow. The communication was clear, and the final delivery exceeded our expectations.",
  },
  {
    name: "Creative Agency",
    role: "Partner",
    text: "Our agency website looks modern and loads instantly. Highly recommended for frontend work.",
  },
];

/* ---------------- COMPONENTS ---------------- */

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-1 overflow-hidden hover:border-white/20 transition-colors"
    >
      {/* Gradient Border Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />
      
      <div className="relative h-full bg-[#0a0a0a] rounded-xl p-8 flex flex-col z-10">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${service.gradient} bg-opacity-10 text-white shadow-lg`}>
            {service.icon}
          </div>
          <div className="text-right">
             <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{service.start}</span>
             <h4 className="text-2xl font-bold text-white">{service.price}</h4>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {service.desc}
        </p>

        {/* Features List */}
        <ul className="space-y-3 mb-8 flex-1">
          {service.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
              <CheckCircle size={16} className="text-cyan-500 mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>

        {/* Action */}
        <Link
          to="/contact"
          className="w-full py-3 flex items-center justify-center gap-2 rounded-lg bg-white/5 border border-white/5 text-white font-medium hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all active:scale-95"
        >
          Start Project <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* 🔹 HEADER SECTION */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-semibold tracking-wide mb-6"
          >
            What I Offer
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Premium Services, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Transparent Pricing
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            From simple landing pages to complex full-stack applications.
            High-quality development tailored to your business needs.
          </motion.p>
        </div>

        {/* 🔹 SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>

        {/* 🔹 PROCESS SECTION */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">My Workflow</h2>
            <p className="text-gray-400 mt-2">From concept to deployment in 4 simple steps.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-white/10 -z-10" />

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-[#050505] p-4 text-center group"
              >
                <div className="w-24 h-24 mx-auto bg-[#0a0a0a] rounded-full border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-cyan-500 transition-colors duration-300">
                   <span className="text-2xl font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">
                     {step.id}
                   </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🔹 TESTIMONIALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {testimonials.map((t, i) => (
             <motion.div
               key={i}
               className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl relative"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
             >
               <Quote className="text-cyan-500/20 absolute top-6 right-6" size={40} />
               <p className="text-gray-300 mb-6 italic leading-relaxed">"{t.text}"</p>
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white text-sm">
                    {t.name[0]}
                 </div>
                 <div>
                   <h4 className="font-bold text-white text-sm">{t.name}</h4>
                   <span className="text-xs text-cyan-400">{t.role}</span>
                 </div>
               </div>
             </motion.div>
           ))}
        </div>

        {/* 🔹 CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 p-12 text-center"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
               Have an idea in mind?
             </h2>
             <p className="text-gray-300 mb-8 text-lg">
               Let's discuss your project requirements and budget tailored just for you.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Link
                 to="/contact"
                 className="px-8 py-3.5 rounded-full bg-cyan-400 text-black font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
               >
                 Start Discussion
               </Link>
               <a
                 href="https://wa.me/9823856261"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/10 transition-all font-medium flex items-center justify-center gap-2"
               >
                 <MessageSquare size={18} /> WhatsApp Chat
               </a>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;