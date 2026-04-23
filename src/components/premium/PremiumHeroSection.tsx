import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const agents = [
  { label: 'SCHOLAR • MEMORY',  color: 'var(--purple)' },
  { label: 'CLOSER • REVENUE',  color: 'var(--red)' },
  { label: 'SUMMONER • CORE',   color: 'var(--mustard)' },
];

export function PremiumHeroSection() {
  return (
    <section
      style={{
        minHeight: '100dvh',
        background: 'var(--mustard)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'max(60px, 10vw)',
        paddingBottom: 'max(40px, 5vw)',
        paddingLeft: 'max(8px, 4vw)',
        paddingRight: 'max(8px, 4vw)',
      }}
    >
      {/* Ambient dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--charcoal) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.07,
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
          className="lg:grid lg:grid-cols-2 lg:gap-[56px]"
        >
          {/* Left: Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          >

            {/* Stroke-fill headline */}
            <h1
              style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 'clamp(52px, 7vw, 88px)',
                lineHeight: 1.0,
                color: 'var(--charcoal)',
                WebkitTextStroke: '0px',
                margin: 0,
                marginBottom: 20,
              }}
            >
              LET'S<br />
              BUILD YOUR<br />
              <span
                style={{
                  color: 'var(--bone)',
                  WebkitTextStroke: '3px var(--charcoal)',
                  paintOrder: 'stroke fill',
                  textShadow: '5px 5px 0 var(--charcoal)',
                }}
              >
                AI SYSTEM.
              </span>
            </h1>

            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 16,
                lineHeight: 1.65,
                color: 'var(--charcoal)',
                opacity: 0.85,
                maxWidth: 460,
                marginBottom: 32,
              }}
            >
              Indore's full-service digital agency. Websites, e-commerce, social media,
              and AI automation — orchestrated by a swarm of intelligent agents.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: '6px 6px 0 var(--charcoal)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'var(--charcoal)',
                    color: 'var(--bone)',
                    border: '3px solid var(--charcoal)',
                    borderRadius: 999,
                    padding: '14px 28px',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 var(--charcoal)',
                  }}
                >
                  ⚡ DEPLOY THE SWARM
                </motion.button>
              </Link>
              <Link to="/demo" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: '6px 6px 0 var(--charcoal)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'var(--bone)',
                    color: 'var(--charcoal)',
                    border: '3px solid var(--charcoal)',
                    borderRadius: 999,
                    padding: '14px 28px',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 var(--charcoal)',
                  }}
                >
                  BOOK A CALL ↗
                </motion.button>
              </Link>
            </div>

            {/* Trust row */}
            <div style={{ display: 'flex', gap: 20, marginTop: 28, flexWrap: 'wrap' }}>
              {['180+ Clients', '500+ Projects', '95% On-Time'].map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: '0.06em',
                    color: 'var(--charcoal)',
                    opacity: 0.75,
                  }}
                >
                  <span style={{ color: 'var(--charcoal)', fontSize: 12 }}>◆</span>
                  {t.toUpperCase()}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Orbital agent visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="hidden lg:flex"
          >
            <div style={{ position: 'relative', width: 380, height: 380 }}>
              {/* Orbit rings */}
              {[200, 290, 370].map((size, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    border: '2px dashed var(--charcoal)',
                    opacity: 0.15,
                  }}
                />
              ))}

              {/* Core */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 120,
                  height: 120,
                  background: 'var(--charcoal)',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px var(--mustard), 0 0 0 7px var(--charcoal)',
                  zIndex: 2,
                }}
              >
                <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 36, color: 'var(--mustard)', lineHeight: 1 }}>X</span>
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 7, color: 'var(--bone)', opacity: 0.7, letterSpacing: '0.06em', marginTop: 2 }}>XERO SEVEN</span>
              </div>

              {/* Orbiting agents */}
              {agents.map((agent, i) => {
                const angle = (i * 120 - 90) * (Math.PI / 180);
                const r = 155;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return (
                  <motion.div
                    key={agent.label}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: 0,
                      height: 0,
                      zIndex: 3,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -(360) }}
                      transition={{ duration: 18 + i * 4, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute',
                        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                        background: agent.color,
                        border: '2.5px solid var(--charcoal)',
                        borderRadius: 10,
                        padding: '7px 12px',
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        color: 'var(--charcoal)',
                        whiteSpace: 'nowrap',
                        boxShadow: '3px 3px 0 var(--charcoal)',
                      }}
                    >
                      {agent.label}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
