import { motion } from 'framer-motion';
import { TreeStructure, CloudArrowUp, ShieldCheck } from '@phosphor-icons/react';

const steps = [
  {
    number: '01',
    icon: TreeStructure,
    title: 'We understand your workflow',
    description:
      'We analyze your business operations, identify bottlenecks, and map out where digital tools will have the highest impact.',
  },
  {
    number: '02',
    icon: CloudArrowUp,
    title: 'We build and deploy',
    description:
      'Our team builds your website, automates your processes, and deploys everything on reliable cloud infrastructure.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'You focus on growth',
    description:
      'Your systems run 24/7 while you focus on strategy, clients, and scaling — with us as your ongoing technical partner.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding relative">
      <div className="container-width">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03] mb-5">
            <span className="font-outfit text-[10px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">
              How It Works
            </span>
          </div>
          <h2 className="font-outfit text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.08]">
            Three steps to
            <br />
            <span className="font-light text-zinc-500">full automation.</span>
          </h2>
        </motion.div>

        {/* Steps — horizontal connector layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-[3.75rem] left-[calc(33.33%+1.5rem)] right-[calc(33.33%+1.5rem)] h-px bg-gradient-to-r from-white/5 via-white/10 to-white/5 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10"
            >
              {/* Double-bezel card */}
              <div className="p-[5px] rounded-[2rem] bg-white/[0.02] border border-white/5">
                <div className="rounded-[calc(2rem-5px)] bg-zinc-900/60 border border-white/[0.04] p-8 md:p-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">

                  {/* Step number + icon row */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-4xl font-bold text-white/[0.06] leading-none">
                      {step.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/8 flex items-center justify-center text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <step.icon weight="duotone" className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-outfit text-base font-semibold text-white tracking-tight mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-dmsans text-sm text-zinc-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
