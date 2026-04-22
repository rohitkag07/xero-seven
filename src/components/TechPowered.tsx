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
    <section
      style={{
        borderTop: '3.5px solid var(--charcoal)',
        borderBottom: '3.5px solid var(--charcoal)',
        background: 'var(--card-alt)',
        padding: '48px 24px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              textAlign: 'center',
              marginBottom: 28,
              fontWeight: 700,
            }}
          >
            POWERED BY INDUSTRY-LEADING TECHNOLOGY
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '28px 48px' }}>
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  color: 'var(--text-muted)',
                  cursor: 'default',
                  transition: 'color 0.2s ease',
                }}
              >
                <tech.icon weight="duotone" size={18} />
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                  }}
                >
                  {tech.label.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
