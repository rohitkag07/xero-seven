import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from '@phosphor-icons/react';

const projects = [
  {
    id: 'x7-ca',
    client: 'X7 CA PLATFORM',
    type: 'AI SAAS PLATFORM',
    desc: 'A multi-tenant, AI-driven automation ecosystem for Chartered Accountants. Features a custom tax-law RAG engine, GST reconciliation, and automated WhatsApp client engagement.',
    color: 'var(--mustard)',
    tags: ['React', 'Python', 'RAG', 'PostgreSQL'],
  },
  {
    id: 'sanoosha',
    client: 'SANOOSHA PREMIUM',
    type: 'LUXURY E-COMMERCE',
    desc: 'An ultra-premium e-commerce platform for high-end fashion and lifestyle. Transformed the shopping experience with sophisticated animations and a luxury design language.',
    color: 'var(--purple)',
    tags: ['E-commerce', 'Supabase', 'Animations'],
  },
  {
    id: 'primemed',
    client: 'PRIMEMED',
    type: 'HEALTHCARE WEB APP',
    desc: 'Ultra-fast, high-performance web application for emergency ambulance booking and dispatch management. Built for speed, reliability, and real-time tracking.',
    color: 'var(--red)',
    tags: ['Web App', 'Real-time', 'UI/UX'],
  },
  {
    id: 'kag-batteries',
    client: 'KAG BATTERIES',
    type: 'CORPORATE B2B PORTAL',
    desc: 'High-end B2B and B2C digital storefront for a premium battery manufacturer. Features advanced inventory management and a sleek, high-conversion design.',
    color: 'var(--mint)',
    tags: ['E-commerce', 'Inventory', 'Brand'],
  },
  {
    id: 'sehat',
    client: 'SEHAT',
    type: 'HEALTH PLATFORM',
    desc: 'A modern digital health platform dedicated to providing comprehensive wellness resources, telehealth connections, and an accessible interface for patients.',
    color: 'var(--mustard)',
    tags: ['Healthcare', 'Portal', 'Accessibility'],
  },
  {
    id: 'maa-narmada',
    client: 'MAA NARMADA',
    type: 'DIGITAL PLATFORM',
    desc: 'A dedicated digital presence built to connect communities, streamline information sharing, and provide a seamless online experience for local services.',
    color: 'var(--red)',
    tags: ['Community', 'Web Platform', 'Local'],
  },
  {
    id: 'rohit-portfolio',
    client: 'ROHIT PORTFOLIO',
    type: 'CREATIVE PORTFOLIO',
    desc: 'A high-performance personal portfolio showcasing AI engineering, web development, and design expertise. Features bold aesthetics and interactive micro-interactions.',
    color: 'var(--mint)',
    tags: ['Portfolio', 'Framer Motion', 'React'],
  },
];

export function PremiumWorkSection() {
  return (
    <section
      style={{
        background: 'var(--bone)',
        borderBottom: '3.5px solid var(--charcoal)',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <span className="gp-kicker" style={{ display: 'inline-flex', marginBottom: 20 }}>
            ◆ FEATURED WORK
          </span>
          <h2
            style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 0.95,
              color: 'var(--charcoal)',
              margin: 0,
            }}
          >
            SYSTEMS WE'VE
            <br />
            <span style={{ color: 'var(--red)' }}>LAUNCHED.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                background: project.color,
                border: '3.5px solid var(--charcoal)',
                borderRadius: 24,
                padding: 32,
                boxShadow: '8px 8px 0 var(--charcoal)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              whileHover={{
                transform: 'translate(-4px, -4px)',
                boxShadow: '12px 12px 0 var(--charcoal)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    background: 'var(--charcoal)',
                    color: 'var(--bone)',
                    padding: '6px 12px',
                    borderRadius: 999,
                  }}
                >
                  {project.type}
                </div>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '3px solid var(--charcoal)',
                    background: 'var(--bone)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--charcoal)',
                  }}
                >
                  <ArrowUpRightIcon weight="bold" size={20} />
                </div>
              </div>

              <h3
                style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 32,
                  lineHeight: 1.1,
                  color: 'var(--charcoal)',
                  marginBottom: 16,
                  textTransform: 'uppercase',
                }}
              >
                {project.client}
              </h3>

              <p
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--charcoal)',
                  opacity: 0.85,
                  marginBottom: 32,
                  flexGrow: 1,
                }}
              >
                {project.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      border: '2px solid var(--charcoal)',
                      padding: '4px 10px',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.3)',
                      color: 'var(--charcoal)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
