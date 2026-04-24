import { motion } from 'framer-motion';

const stats = [
  { number: '15+', label: 'HAPPY CLIENTS',       sub: 'Across tech, healthcare, retail' },
  { number: '95%', label: 'SUCCESS RATE',        sub: 'On-time, on-budget delivery' },
  { number: '30+', label: 'PROJECTS LAUNCHED',   sub: 'MVPs to enterprise platforms' },
  { number: '3',   label: 'YEARS EXPERIENCE',    sub: 'Industry expertise' },
];

const tickerItems = [
  'XERO SEVEN', '★', 'GALACTIC AI AGENCY', '✦', 'SUMMON THE SWARM', '◉',
  'V7.02 · GALACTIC CORE', '★', 'COMMAND THE GALAXY', '✦', 'INDORE · INDIA', '◉',
  'XERO SEVEN', '★', 'GALACTIC AI AGENCY', '✦', 'SUMMON THE SWARM', '◉',
  'V7.02 · GALACTIC CORE', '★', 'COMMAND THE GALAXY', '✦', 'INDORE · INDIA', '◉',
];

export function PremiumStatsSection() {
  return (
    <section aria-label="Agency stats">
      {/* Ticker bar */}
      <div
        style={{
          background: 'var(--charcoal)',
          borderTop: '3px solid var(--charcoal)',
          borderBottom: '3px solid var(--charcoal)',
          overflow: 'hidden',
          padding: '10px 0',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 28,
            whiteSpace: 'nowrap',
            animation: 'gp-ticker 22s linear infinite',
          }}
        >
          {tickerItems.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: item.match(/[★✦◉]/) ? 'inherit' : '"Archivo Black", sans-serif',
                fontSize: item.match(/[★✦◉]/) ? 14 : 11,
                color: item.match(/[★✦◉]/) ? 'var(--mustard)' : 'var(--bone)',
                letterSpacing: item.match(/[★✦◉]/) ? 0 : '0.1em',
                flexShrink: 0,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          background: 'transparent',
          borderBottom: '3px solid var(--charcoal)',
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              style={{
                padding: '32px 24px',
                borderRight: idx < stats.length - 1 ? '3px solid var(--charcoal)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: idx === 0 ? 'var(--red)' : idx === 1 ? 'var(--purple)' : idx === 2 ? 'var(--mustard-dk)' : 'var(--charcoal)',
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {stat.number}
              </div>
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'var(--charcoal)',
                  marginBottom: 4,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 12,
                  color: 'var(--charcoal)',
                  opacity: 0.6,
                }}
              >
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
