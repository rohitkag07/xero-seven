import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// Isolated client component for animated counter — prevents parent re-renders
function AnimatedCounter({
  end,
  suffix = '',
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-outfit text-4xl md:text-5xl font-bold text-white tracking-tight">
        {count}
        <span className="text-zinc-500">{suffix}</span>
      </div>
      <p className="font-outfit text-[10px] text-zinc-600 uppercase tracking-[0.2em] mt-2 font-semibold">
        {label}
      </p>
    </div>
  );
}

const stats = [
  { end: 20, suffix: '+', label: 'Digital Experts' },
  { end: 50, suffix: '+', label: 'Projects Delivered' },
  { end: 12, suffix: '+', label: 'Services Offered' },
  { end: 24, suffix: '/7', label: 'Available' },
];

export default function StatsSection() {
  return (
    <section className="section-padding relative">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Double-bezel container */}
          <div className="p-[5px] rounded-[2rem] bg-white/[0.02] border border-white/5">
            <div className="rounded-[calc(2rem-5px)] bg-zinc-900/60 border border-white/[0.04] py-14 md:py-16 px-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] relative overflow-hidden">
              {/* Subtle dot grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff04_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-white/5">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <AnimatedCounter {...stat} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
