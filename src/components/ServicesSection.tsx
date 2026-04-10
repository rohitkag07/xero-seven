import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, ShoppingCart, InstagramLogo, WhatsappLogo, Camera, Code,
  ArrowRight, Robot, Cpu, PenNib
} from '@phosphor-icons/react';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    tagline: 'Premium sites that rank and convert',
    stat: '<2s load',
    color: 'text-amber-400',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/10',
    dot: 'bg-amber-400',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & Stores',
    tagline: 'Sell online with UPI, cards, COD',
    stat: 'UPI ready',
    color: 'text-sky-400',
    bg: 'bg-sky-500/8',
    border: 'border-sky-500/10',
    dot: 'bg-sky-400',
  },
  {
    icon: InstagramLogo,
    title: 'Social Media Management',
    tagline: 'Strategy, content, growth — all handled',
    stat: '30+ posts/mo',
    color: 'text-pink-400',
    bg: 'bg-pink-500/8',
    border: 'border-pink-500/10',
    dot: 'bg-pink-400',
  },
  {
    icon: WhatsappLogo,
    title: 'WhatsApp Automation',
    tagline: '24/7 AI replies in Hindi and English',
    stat: '90% auto',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/10',
    dot: 'bg-emerald-400',
  },
  {
    icon: Camera,
    title: 'Photography & Video',
    tagline: 'Professional visuals, 48hr delivery',
    stat: '4K quality',
    color: 'text-violet-400',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/10',
    dot: 'bg-violet-400',
  },
  {
    icon: Code,
    title: 'Custom Software',
    tagline: 'Your idea built into a scalable product',
    stat: '30 day MVP',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/8',
    border: 'border-cyan-500/10',
    dot: 'bg-cyan-400',
  },
  {
    icon: Cpu,
    title: 'Business Automation',
    tagline: 'Connect all tools, eliminate manual work',
    stat: '100+ apps',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/8',
    border: 'border-indigo-500/10',
    dot: 'bg-indigo-400',
  },
  {
    icon: PenNib,
    title: 'Content & SEO',
    tagline: 'Get found on Google organically',
    stat: '8 blogs/mo',
    color: 'text-rose-400',
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/10',
    dot: 'bg-rose-400',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  return (
    <section className="section-padding relative">
      <div className="container-width">

        {/* Section header — left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03] mb-5">
            <span className="font-outfit text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">
              What We Do
            </span>
          </div>

          <h2 className="font-outfit text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.08] mb-4">
            Services that grow
            <br />
            <span className="font-light text-zinc-500">your business.</span>
          </h2>

          <p className="font-dmsans text-sm text-zinc-500 leading-relaxed max-w-[52ch]">
            From websites to WhatsApp bots, photography to process automation —
            everything your business needs under one roof.
          </p>
        </motion.div>

        {/* Asymmetric service list — divide-based, no 3-column cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              {/* Double-bezel card row */}
              <div className="p-[5px] rounded-2xl bg-white/[0.015] border border-white/5 group hover:border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex items-center gap-4 px-4 py-3.5 rounded-[calc(1rem-5px)] bg-zinc-900/50 border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] group-hover:bg-zinc-800/40 transition-all duration-500">

                  {/* Icon box */}
                  <div className={`w-9 h-9 shrink-0 rounded-xl ${service.bg} border ${service.border} flex items-center justify-center ${service.color} group-hover:scale-105 transition-transform duration-400`}>
                    <service.icon weight="duotone" className="w-4 h-4" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-outfit text-sm font-semibold text-white tracking-tight">
                      {service.title}
                    </h3>
                    <p className="font-dmsans text-[11px] text-zinc-600 mt-0.5 truncate">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Stat badge */}
                  <span className={`hidden md:inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full ${service.bg} ${service.color} font-outfit font-semibold shrink-0`}>
                    <span className={`w-1 h-1 rounded-full ${service.dot}`} />
                    {service.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA — button-in-button pattern */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-start gap-3 mt-10"
        >
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 pl-6 pr-3 py-3 rounded-full bg-white text-zinc-900 font-outfit font-semibold text-sm tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-100 active:scale-[0.97]"
          >
            See All Services
            <span className="w-6 h-6 rounded-full bg-zinc-900/10 flex items-center justify-center group-hover:bg-zinc-900/15 group-hover:translate-x-[1px] transition-all duration-400">
              <ArrowRight weight="bold" className="w-3 h-3" />
            </span>
          </Link>

          <Link
            to="/services#agentic"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.02] text-zinc-400 font-outfit font-medium text-sm tracking-wide transition-all duration-500 hover:text-white hover:border-white/20 hover:bg-white/[0.05]"
          >
            <Robot weight="duotone" className="w-4 h-4 text-violet-400" />
            Explore AI Agents
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
