import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Camera, Robot, ShoppingCart } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

// Archetype: Ethereal Glass + Asymmetrical Bento
// DESIGN_VARIANCE: 8 | MOTION_INTENSITY: 6 | VISUAL_DENSITY: 4

const bentoCards = [
  {
    id: 'websites',
    icon: Globe,
    title: 'Websites & Custom Software',
    desc: 'High-performance sites and apps built to convert visitors into customers.',
    span: 'md:col-span-2',
    accent: 'text-emerald-400',
    bg: 'bg-emerald-500/5',
  },
  {
    id: 'production',
    icon: Camera,
    title: 'Photography & Video',
    desc: 'Professional shoots for products, events, and brand content.',
    span: 'md:col-span-1',
    accent: 'text-sky-400',
    bg: 'bg-sky-500/5',
  },
  {
    id: 'automation',
    icon: Robot,
    title: 'AI & WhatsApp Automation',
    desc: 'Automate your sales funnel, support, and workflows.',
    span: 'md:col-span-1',
    accent: 'text-violet-400',
    bg: 'bg-violet-500/5',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce Stores',
    desc: 'Full-stack Shopify and custom stores with secure payment integration.',
    span: 'md:col-span-2',
    accent: 'text-amber-400',
    bg: 'bg-amber-500/5',
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-28"
    >
      {/* Background — subtle grid + single soft radial, NOT neon orbs */}
      <div className="absolute inset-0 bg-zinc-950 pointer-events-none">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_40%,transparent_100%)]" />
        {/* Single ambient glow — centered, muted, not neon */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-950/40 rounded-full blur-[120px] pointer-events-none"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* LEFT-ALIGNED layout (Rule 3: ANTI-CENTER BIAS, DESIGN_VARIANCE=8) */}
        <div className="max-w-3xl space-y-8">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/8 bg-white/[0.03]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-outfit text-[10px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
              Indore's Premier Digital Agency
            </span>
          </motion.div>

          {/* H1 — Outfit, left-aligned, controlled hierarchy */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-outfit text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white"
          >
            Build. Automate.
            <br />
            <span className="font-outfit font-light text-zinc-500">
              Scale your business.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-dmsans text-lg text-zinc-400 max-w-[55ch] leading-relaxed"
          >
            Premium websites, e-commerce stores, social media management,
            photography, AI automation, and custom software — everything your
            business needs to dominate online.
          </motion.p>

          {/* CTAs — Button-in-Button pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-start gap-3 pt-2"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 pl-6 pr-3 py-3.5 rounded-full bg-white text-zinc-900 font-outfit font-semibold text-sm tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-100 active:scale-[0.97]"
            >
              Get Free Consultation
              <span className="w-7 h-7 rounded-full bg-zinc-900/10 flex items-center justify-center group-hover:bg-zinc-900/15 group-hover:translate-x-[1px] transition-all duration-400">
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </span>
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 font-outfit font-medium text-sm tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/[0.06] hover:border-white/20 hover:text-white active:scale-[0.97]"
            >
              View Our Services
            </Link>
          </motion.div>
        </div>

        {/* Asymmetric Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          {bentoCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`${card.span}`}
              >
                {/* Double-bezel card */}
                <div className="p-1.5 rounded-[2rem] bg-white/[0.02] border border-white/5">
                  <div className={`h-[148px] rounded-[calc(2rem-0.375rem)] ${card.bg} border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/10 hover:bg-white/[0.04]`}>
                    <div>
                      <Icon weight="duotone" className={`w-5 h-5 ${card.accent} mb-3`} />
                      <h3 className="font-outfit font-semibold text-white text-sm leading-snug">
                        {card.title}
                      </h3>
                    </div>
                    <p className="font-dmsans text-xs text-zinc-500 leading-relaxed max-w-[30ch]">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
