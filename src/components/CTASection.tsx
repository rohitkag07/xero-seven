import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarCheck } from '@phosphor-icons/react';

export default function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Single muted ambient — no neon */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-950/50 rounded-full blur-[100px]" />
      </div>

      <div className="container-width relative z-10">
        {/* Double-bezel CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="p-[5px] rounded-[2.5rem] bg-white/[0.02] border border-white/5"
        >
          <div className="rounded-[calc(2.5rem-5px)] bg-zinc-900/70 border border-white/[0.04] p-10 md:p-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] relative overflow-hidden">

            {/* Subtle inner grid texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6">
                <CalendarCheck weight="duotone" className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-outfit text-[10px] font-semibold text-emerald-400 uppercase tracking-[0.2em]">
                  Free Consultation
                </span>
              </div>

              <h2 className="font-outfit text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.05] mb-5 text-balance">
                Ready to grow your
                <br />
                <span className="font-light text-zinc-400">business online?</span>
              </h2>

              <p className="font-dmsans text-base text-zinc-500 leading-relaxed max-w-[48ch] mx-auto mb-10">
                Get a free audit of your online presence. We will identify exactly
                what is holding your business back — no commitment required.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 pl-7 pr-3 py-3.5 rounded-full bg-white text-zinc-900 font-outfit font-semibold text-sm tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-100 active:scale-[0.97]"
                >
                  Book a Free Call
                  <span className="w-7 h-7 rounded-full bg-zinc-900/10 flex items-center justify-center group-hover:bg-zinc-900/15 group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-all duration-400">
                    <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 font-outfit font-medium text-sm tracking-wide transition-all duration-500 hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
