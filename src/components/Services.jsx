import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  X,
  Server,
  Globe,
  Code,
  Smartphone,
  Zap,
  Layout,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Star
} from "lucide-react";

/* ---------------- PRICING DATA (WEB DEV) ---------------- */
const webPackages = [
  {
    title: "Starter",
    price: "₹9,999",
    desc: "Perfect for personal portfolios or landing pages.",
    gradient: "from-blue-500 to-cyan-400",
    popular: false,
    features: [
      { name: "1 Page Responsive Website", included: true },
      { name: "Free .com / .in Domain", included: true },
      { name: "Free Fast Hosting (1 Year)", included: true },
      { name: "Contact Form Integration", included: true },
      { name: "Social Media Links", included: true },
      { name: "Basic SEO Setup", included: true },
      { name: "Admin Dashboard", included: false },
      { name: "Database Integration", included: false },
    ]
  },
  {
    title: "Business",
    price: "₹16,999",
    desc: "Ideal for small businesses and service providers.",
    gradient: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      { name: "3-5 Pages Website", included: true },
      { name: "Free .com / .in Domain", included: true },
      { name: "Free Fast Hosting (1 Year)", included: true },
      { name: "WhatsApp Chat Button", included: true },
      { name: "Google Maps Integration", included: true },
      { name: "Advanced SEO & Speed Optimization", included: true },
      { name: "Admin Dashboard", included: false },
      { name: "Database Integration", included: false },
    ]
  },
  {
    title: "Premium",
    price: "₹19,999",
    desc: "Dynamic websites with content management capabilities.",
    gradient: "from-orange-400 to-red-500",
    popular: false,
    features: [
      { name: "Up to 8 Pages / Dynamic", included: true },
      { name: "Free Domain & SSL", included: true },
      { name: "Premium Cloud Hosting", included: true },
      { name: "Admin Panel (CMS)", included: true },
      { name: "Blog / News Section", included: true },
      { name: "Advanced Animations", included: true },
      { name: "1 Month Free Maintenance", included: true },
      { name: "Analytics Dashboard", included: true },
    ]
  }
];

/* ---------------- OTHER SERVICES ---------------- */
const otherServices = [
  {
    icon: <Smartphone size={28} />,
    title: "Mobile Apps",
    desc: "Android & iOS apps using React Native with high performance.",
  },
  {
    icon: <Layout size={28} />,
    title: "Custom Web Apps",
    desc: "Inventory management, CRMs, and internal business tools.",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Maintenance",
    desc: "Bug fixes, security updates, and regular content changes.",
  },
];

/* ---------------- COMPONENTS ---------------- */

const PricingCard = ({ pkg, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative flex flex-col p-1 rounded-2xl ${
        pkg.popular ? "md:-mt-4 md:mb-4 z-10 shadow-[0_0_40px_rgba(168,85,247,0.3)]" : "border border-white/10 bg-[#0a0a0a]"
      }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider z-20 shadow-lg">
          Most Popular
        </div>
      )}

      {/* Gradient Border Background for Popular Card */}
      {pkg.popular ? (
        <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} rounded-2xl opacity-100 p-[1px]`}>
           <div className="h-full w-full bg-[#0a0a0a] rounded-2xl" />
        </div>
      ) : null}

      <div className="relative h-full bg-[#0a0a0a] rounded-xl p-8 flex flex-col z-10">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-300 mb-2">{pkg.title}</h3>
          <div className="flex justify-center items-baseline gap-1">
             <span className="text-4xl font-bold text-white tracking-tight">{pkg.price}</span>
          </div>
          <p className="text-xs text-gray-500 mt-3">{pkg.desc}</p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-6" />

        {/* Features List */}
        <ul className="space-y-4 mb-8 flex-1">
          {pkg.features.map((feature, i) => (
            <li key={i} className={`flex items-start gap-3 text-sm ${feature.included ? 'text-gray-300' : 'text-gray-700'}`}>
              {feature.included ? (
                <Check size={16} className={`mt-0.5 shrink-0 bg-clip-text ${pkg.popular ? 'text-purple-400' : 'text-cyan-400'}`} />
              ) : (
                <X size={16} className="mt-0.5 shrink-0" />
              )}
              <span className={feature.included ? "" : "line-through decoration-white/10"}>{feature.name}</span>
            </li>
          ))}
        </ul>

        {/* Action */}
        <Link
          to="/contact"
          className={`w-full py-3.5 flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-95 ${
            pkg.popular 
            ? `bg-gradient-to-r ${pkg.gradient} text-white hover:shadow-lg hover:shadow-purple-500/20` 
            : "bg-white/5 border border-white/5 text-white hover:bg-white/10"
          }`}
        >
          Choose {pkg.title}
        </Link>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="min-h-screen bg-[#050505] text-white pt-32 pb-20 overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-cyan-900/10 via-purple-900/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* 🔹 HEADER SECTION */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-bold tracking-wider mb-6 uppercase"
          >
            Web Development Plans
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Transparent Pricing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              No Hidden Costs.
            </span>
          </motion.h1>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Choose the perfect package for your business. Whether you need a simple landing page or a full-scale CMS, we have you covered.
          </motion.p>
        </div>

        {/* 🔹 MAIN PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-32 items-start">
          {webPackages.map((pkg, i) => (
            <PricingCard key={i} pkg={pkg} index={i} />
          ))}
        </div>

        {/* 🔹 ADDITIONAL SERVICES (COMPACT) */}
        <div className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">Other Services</h2>
            <p className="text-gray-400">Looking for something else?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] border border-white/5 p-6 rounded-xl hover:border-cyan-500/30 transition-colors group"
              >
                <div className="mb-4 text-gray-400 group-hover:text-cyan-400 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-500">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🔹 WHY CHOOSE US / FEATURES */}
        <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/5 mb-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Why hire me?</h2>
              <div className="space-y-6">
                {[
                  { title: "Fast Delivery", desc: "Most websites are live within 3-5 days." },
                  { title: "Mobile First", desc: "100% responsive designs that look great on phones." },
                  { title: "SEO Ready", desc: "Built with best practices to help you rank on Google." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-cyan-900/20 text-cyan-400 flex items-center justify-center shrink-0">
                      <Zap size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 relative">
               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-[80px] opacity-20" />
               <div className="relative bg-[#050505] border border-white/10 rounded-xl p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                      <Globe size={24} className="text-gray-300" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Project Status</div>
                      <div className="text-green-400 font-bold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live & Healthy
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-gray-800 rounded-full w-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-cyan-500" 
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Performance Score</span>
                      <span className="text-white">98/100</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* 🔹 CTA BANNER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 p-12 text-center"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
               Not sure which plan is right?
             </h2>
             <p className="text-gray-300 mb-8 text-lg">
               Contact me directly via WhatsApp. I'll help you select the best package for your budget.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <a
                 href="https://wa.me/9823856261"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="px-8 py-3.5 rounded-full bg-[#25D366] text-black font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2"
               >
                 <MessageSquare size={18} /> Chat on WhatsApp
               </a>
               <Link
                 to="/contact"
                 className="px-8 py-3.5 rounded-full border border-white/20 hover:bg-white/10 transition-all font-medium text-white"
               >
                 Send an Email
               </Link>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
