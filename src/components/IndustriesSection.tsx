import { motion } from 'framer-motion';
import {
  Buildings, FirstAidKit, Storefront, GraduationCap, Factory, ForkKnife
} from '@phosphor-icons/react';

const industries = [
  {
    icon: Buildings,
    name: 'Real Estate & Property',
    desc: 'Lead capture, virtual tours, broker automation',
    accent: 'var(--red)',
    bg: 'var(--red-lt)',
  },
  {
    icon: FirstAidKit,
    name: 'Healthcare & Clinics',
    desc: 'Appointment bots, patient management, EMR integration',
    accent: 'var(--purple)',
    bg: 'var(--purple-lt)',
  },
  {
    icon: Storefront,
    name: 'E-Commerce & Retail',
    desc: 'Online stores, inventory management, order automation',
    accent: 'var(--mustard-dk)',
    bg: 'var(--mustard-lt)',
  },
  {
    icon: GraduationCap,
    name: 'Education & Coaching',
    desc: 'Student portals, enrollment bots, LMS platforms',
    accent: 'var(--purple)',
    bg: 'var(--purple-lt)',
  },
  {
    icon: Factory,
    name: 'Manufacturing',
    desc: 'Invoice automation, supply chain tracking, ERP integration',
    accent: 'var(--red)',
    bg: 'var(--red-lt)',
  },
  {
    icon: ForkKnife,
    name: 'Hospitality & Food',
    desc: 'Reservation bots, menu systems, review management',
    accent: 'var(--mint)',
    bg: '#8AEFCA',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
  },
};

export default function IndustriesSection() {
  return (
    <section
      style={{
        padding: '96px 16px',
        background: 'var(--section-alt)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          <span className="gp-kicker" style={{ marginBottom: 20, display: 'inline-flex' }}>
            ◆ SECTION 05 • INDUSTRIES
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
            ANY INDUSTRY.
            <br />
            <span
              style={{
                color: 'var(--hero-accent)',
                WebkitTextStroke: '3px var(--charcoal)',
                paintOrder: 'stroke fill',
              }}
            >
              ANY SCALE.
            </span>
          </h2>
        </motion.div>

        {/* Industry grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {industries.map((industry) => (
            <motion.div key={industry.name} variants={itemVariants}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '10px 10px 0 var(--charcoal)' }}
                transition={{ duration: 0.15 }}
                style={{
                  background: 'var(--card-bg)',
                  border: '3.5px solid var(--charcoal)',
                  borderRadius: 28,
                  padding: 24,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  boxShadow: '6px 6px 0 var(--charcoal)',
                  cursor: 'default',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: industry.bg,
                    border: '3px solid var(--charcoal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '3px 3px 0 var(--charcoal)',
                  }}
                >
                  <industry.icon weight="duotone" size={24} color="var(--charcoal)" />
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: 14,
                      letterSpacing: '0.02em',
                      color: 'var(--text-body)',
                      marginBottom: 4,
                    }}
                  >
                    {industry.name.toUpperCase()}
                  </h3>
                  <p
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {industry.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
