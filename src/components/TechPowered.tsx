import { motion } from 'framer-motion';
import { GoogleLogo, Cloud, Database, Atom, Lightning, Terminal } from '@phosphor-icons/react';

const techStack = [
  { icon: GoogleLogo, label: 'Gemini AI' },
  { icon: Cloud, label: 'Google Cloud' },
  { icon: Atom, label: 'React' },
  { icon: Terminal, label: 'Node.js' },
  { icon: Lightning, label: 'Vercel' },
  { icon: Database, label: 'PostgreSQL' },
];

export default function TechPowered() {
  return (
    <section className="py-14 relative border-t border-b border-white/5">
      <div className="container-width px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-outfit text-[10px] text-zinc-600 uppercase tracking-[0.28em] text-center mb-8 font-semibold">
            Powered by industry-leading technology
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-default"
              >
                <tech.icon weight="duotone" className="w-4 h-4" />
                <span className="font-outfit text-xs font-medium tracking-tight">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
