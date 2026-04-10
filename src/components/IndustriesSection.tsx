import { motion } from 'framer-motion';
import {
  Buildings, FirstAidKit, Storefront, GraduationCap, Factory, ForkKnife
} from '@phosphor-icons/react';

const industries = [
  {
    icon: Buildings,
    name: 'Real Estate & Property',
    desc: 'Lead capture, virtual tours, broker automation',
    color: 'text-amber-400',
    bg: 'bg-amber-500/8',
    border: 'border-amber-500/10',
  },
  {
    icon: FirstAidKit,
    name: 'Healthcare & Clinics',
    desc: 'Appointment bots, patient management, EMR integration',
    color: 'text-rose-400',
    bg: 'bg-rose-500/8',
    border: 'border-rose-500/10',
  },
  {
    icon: Storefront,
    name: 'E-Commerce & Retail',
    desc: 'Online stores, inventory management, order automation',
    color: 'text-sky-400',
    bg: 'bg-sky-500/8',
    border: 'border-sky-500/10',
  },
  {
    icon: GraduationCap,
    name: 'Education & Coaching',
    desc: 'Student portals, enrollment bots, LMS platforms',
    color: 'text-violet-400',
    bg: 'bg-violet-500/8',
    border: 'border-violet-500/10',
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    desc: 'Invoice automation, supply chain tracking, ERP integration',
    color: 'text-zinc-400',
    bg: 'bg-zinc-500/8',
    border: 'border-zinc-500/10',
  },
  {
    icon: ForkKnife,
    name: 'Hospitality & Food',
    desc: 'Reservation bots, menu systems, review management',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/8',
    border: 'border-emerald-500/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export default function IndustriesSection() {
  return (
    <section className="section-padding relative">
      <div className="container-width">

        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03] mb-5">
            <span className="font-outfit text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">
              Industries We Serve
            </span>
          </div>
          <h2 className="font-outfit text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.08]">
            Any industry.
            <br />
            <span className="font-light text-zinc-500">Any scale.</span>
          </h2>
        </motion.div>

        {/* 2-col asymmetric grid (not 3 equal cards — banned by skill) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {industries.map((industry) => (
            <motion.div key={industry.name} variants={itemVariants}>
              {/* Double-bezel card */}
              <div className="h-full p-[5px] rounded-[1.75rem] bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="h-full rounded-[calc(1.75rem-5px)] bg-zinc-900/50 border border-white/[0.04] p-6 flex items-start gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] group-hover:bg-zinc-800/40 transition-all duration-500">

                  {/* Tinted icon box */}
                  <div className={`w-10 h-10 rounded-xl ${industry.bg} border ${industry.border} flex items-center justify-center ${industry.color} shrink-0 group-hover:scale-105 transition-transform duration-400`}>
                    <industry.icon weight="duotone" className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="font-outfit text-sm font-semibold text-white tracking-tight mb-1 leading-snug">
                      {industry.name}
                    </h3>
                    <p className="font-dmsans text-xs text-zinc-500 leading-relaxed">
                      {industry.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
