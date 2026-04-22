import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    emoji: '🔍',
    title: 'DISCOVER & PLAN',
    description: 'We dive deep into your challenges, market, and vision. Together we craft a strategic roadmap tailored to your goals.',
    details: ['Strategic audit', 'Competitive analysis', 'Goal setting', 'Timeline planning'],
    cardClass: 'gp-card-mustard',
  },
  {
    number: '02',
    emoji: '🎨',
    title: 'DESIGN & PROTOTYPE',
    description: 'Our designers create stunning, user-centered designs. We prototype and iterate based on your feedback.',
    details: ['Wireframes', 'Visual design', 'Prototyping', 'User testing'],
    cardClass: 'gp-card-red',
  },
  {
    number: '03',
    emoji: '⚡',
    title: 'BUILD & OPTIMIZE',
    description: 'Our engineers build with modern tech stack. We optimize for speed, security, and scalability from day one.',
    details: ['Development', 'Testing', 'Security audit', 'Performance optimization'],
    cardClass: 'gp-card-purple',
  },
  {
    number: '04',
    emoji: '🚀',
    title: 'LAUNCH & GROW',
    description: 'We deploy your solution, set up analytics, and provide ongoing support. Then we help you scale.',
    details: ['Deployment', 'Analytics setup', 'Monitoring', 'Growth strategy'],
    cardClass: 'gp-card-mint',
  },
];

export function PremiumHowItWorksSection() {
  return (
    <section
      style={{
        padding: '96px 16px',
        background: 'var(--page-bg)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          <span className="gp-kicker" style={{ marginBottom: 20, display: 'inline-flex' }}>
            ◆ SECTION 06 • THE PROCESS
          </span>
          <h2
            style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 0.92,
              color: 'var(--text-body)',
              marginTop: 20,
            }}
          >
            HOW WE BUILD
            <br />
            <span
              style={{
                color: 'var(--hero-accent)',
                WebkitTextStroke: '3px var(--charcoal)',
                paintOrder: 'stroke fill',
              }}
            >
              YOUR SUCCESS.
            </span>
          </h2>
          <p
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 16,
              lineHeight: 1.65,
              color: 'var(--text-muted)',
              maxWidth: 520,
              marginTop: 20,
            }}
          >
            From concept to launch — a proven, transparent process that ensures your vision becomes reality.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.32, 0.72, 0, 1] }}
            >
              <motion.div
                whileHover={{ y: -6, boxShadow: '14px 14px 0 var(--charcoal)' }}
                transition={{ duration: 0.15 }}
                className={step.cardClass}
                style={{
                  padding: 28,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'default',
                }}
              >
                {/* Step number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: 48,
                      lineHeight: 1,
                      color: 'var(--charcoal)',
                      opacity: 0.15,
                    }}
                  >
                    {step.number}
                  </span>
                  <span style={{ fontSize: 32 }}>{step.emoji}</span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 16,
                    color: 'var(--charcoal)',
                    letterSpacing: '0.02em',
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'var(--charcoal)',
                    opacity: 0.75,
                    marginBottom: 18,
                    flex: 1,
                  }}
                >
                  {step.description}
                </p>

                {/* Details list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 10,
                        letterSpacing: '0.08em',
                        color: 'var(--charcoal)',
                        opacity: 0.6,
                        padding: '3px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--charcoal)', opacity: 0.4 }} />
                      {detail.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
