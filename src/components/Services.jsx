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
} from "lucide-react";

/* ---------------- SERVICES ---------------- */
const services = [
  {
    icon: <Code size={28} />,
    title: "Website Development",
    desc: "Modern, fast & responsive websites for businesses, startups and personal brands.",
    price: "Starting from ₹500",
    points: [
      "Business websites & landing pages",
      "SEO-friendly & fast loading",
      "Mobile-first responsive design",
      "Free deployment guidance",
    ],
  },
  {
    icon: <LayoutDashboard size={28} />,
    title: "Web Applications",
    desc: "Custom systems to automate and manage business operations.",
    price: "Starting from ₹1,500",
    points: [
      "Admin dashboards & POS systems",
      "Inventory / CRM solutions",
      "Secure backend & APIs",
      "Scalable architecture",
    ],
  },
  {
    icon: <Smartphone size={28} />,
    title: "Mobile App Development",
    desc: "High-performance Android apps using React Native.",
    price: "Starting from ₹2,500",
    points: [
      "Business & admin apps",
      "Firebase / API integration",
      "Play Store ready builds",
      "Performance optimized",
    ],
  },
  {
    icon: <Wrench size={28} />,
    title: "Maintenance & Support",
    desc: "Reliable ongoing support after project delivery.",
    price: "Starting from ₹500 / month",
    points: [
      "Bug fixes & improvements",
      "Feature updates",
      "Performance monitoring",
      "Priority support",
    ],
  },
];

/* ---------------- HOW I WORK ---------------- */
const steps = [
  {
    title: "Understand Requirements",
    desc: "We discuss your idea, goals, and expectations clearly.",
  },
  {
    title: "Plan & Design",
    desc: "System architecture, UI flow, and tech stack planning.",
  },
  {
    title: "Development",
    desc: "Clean, scalable development with regular updates.",
  },
  {
    title: "Testing & Delivery",
    desc: "Testing, final review, deployment & handover.",
  },
];

/* ---------------- TESTIMONIALS ---------------- */
const testimonials = [
  {
    name: "Local Business Owner",
    text: "Altamash built a complete POS system for our shop. Billing became faster and tracking is very easy now.",
  },
  {
    name: "Startup Client",
    text: "Very professional and clear communication. Delivered exactly what we needed.",
  },
  {
    name: "Website Client",
    text: "Our business website looks modern and loads very fast. Highly recommended.",
  },
];



const Services = () => {
  return (
    <section className="min-h-screen bg-black text-white px-4 py-20">
      <div className="max-w-[1100px] mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Services & <span className="text-cyan-400">Pricing</span>
          </h1>
          <p className="text-gray-400 max-w-[750px] mx-auto text-lg">
            Transparent pricing, clean development, and business-focused
            solutions — tailored to your needs.
          </p>
        </motion.div>

        {/* SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="bg-[#111] border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-cyan-400 font-medium mb-4">
                {service.price}
              </p>

              <p className="text-gray-400 mb-5">
                {service.desc}
              </p>

              <ul className="space-y-2 mb-6">
                {service.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="text-gray-300 text-sm flex items-start gap-2"
                  >
                    <CheckCircle size={16} className="text-cyan-400 mt-[2px]" />
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-white transition"
              >
                Discuss Project <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* HOW I WORK */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            How <span className="text-cyan-400">I Work</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-cyan-400 text-xl font-bold mb-2">
                  {i + 1}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TESTIMONIALS */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Client <span className="text-cyan-400">Feedback</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#111] border border-white/10 rounded-xl p-6"
              >
                <p className="text-gray-300 mb-4">“{t.text}”</p>
                <span className="text-cyan-400 text-sm font-medium">
                  — {t.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

   

        {/* FINAL CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to start your project?
          </h2>
          <p className="text-gray-400 mb-6">
            Let’s discuss your idea and budget — no pressure.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="px-8 py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:scale-105 transition"
            >
              Contact Me
            </Link>

            <a
              href="https://wa.me/917447709973"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
