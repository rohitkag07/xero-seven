import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RocketLaunchIcon, LightningIcon, CheckCircleIcon, TimerIcon, GlobeIcon, PhoneIcon } from '@phosphor-icons/react';

export function PremiumCTASection() {
  return (
    <section
      style={{
        padding: '96px 16px',
        background: 'var(--page-bg)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <div
            className="gp-card-mustard"
            style={{
              padding: '56px 40px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Decorative sparkles */}
            <span className="gp-float" style={{ position: 'absolute', top: 20, left: 30, fontSize: 20, opacity: 0.5 }}>✦</span>
            <span className="gp-float-r" style={{ position: 'absolute', top: 32, right: 40, fontSize: 16, opacity: 0.4 }}>★</span>
            <span className="gp-float" style={{ position: 'absolute', bottom: 24, left: '45%', fontSize: 14, opacity: 0.35 }}>✦</span>

            {/* Kicker */}
            <span
              className="gp-chip-ink"
              style={{ marginBottom: 24, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <RocketLaunchIcon weight="duotone" size={12} /> READY TO LAUNCH?
            </span>

            {/* Headline */}
            <h2
              style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 'clamp(32px, 5vw, 56px)',
                lineHeight: 0.95,
                color: 'var(--charcoal)',
                marginTop: 24,
                marginBottom: 16,
              }}
            >
              LET'S BUILD
              <br />
              <span
                style={{
                  WebkitTextStroke: '3px var(--charcoal)',
                  color: 'transparent',
                  paintOrder: 'stroke fill',
                }}
              >
                SOMETHING EPIC.
              </span>
            </h2>

            <p
              style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 16,
                lineHeight: 1.65,
                color: 'var(--charcoal)',
                opacity: 0.75,
                maxWidth: 480,
                margin: '0 auto 32px',
              }}
            >
              Join 15+ brands that trusted us to build their digital future. Your free strategy session is just a click away.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -3, boxShadow: '7px 7px 0 var(--charcoal)' }}
                  whileTap={{ scale: 0.97 }}
                  className="gp-btn"
                  style={{ fontSize: 13 }}
                >
                  <LightningIcon weight="duotone" size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }} /> BOOK A FREE CALL
                </motion.button>
              </Link>
              <a href="tel:+917869161842" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -3, boxShadow: '7px 7px 0 var(--charcoal)' }}
                  whileTap={{ scale: 0.97 }}
                  className="gp-btn-bone"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '14px 26px',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase' as const,
                    border: '3.5px solid var(--charcoal)',
                    borderRadius: 999,
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 var(--charcoal)',
                    transition: 'transform 0.08s ease, box-shadow 0.08s ease',
                  }}
                >
                  <PhoneIcon weight="duotone" size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }} /> CALL US
                </motion.button>
              </a>
            </div>

            {/* Social proof */}
            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: '2.5px solid var(--charcoal)',
                display: 'flex',
                justifyContent: 'center',
                gap: 32,
                flexWrap: 'wrap',
              }}
            >
              {([
                { Icon: CheckCircleIcon, text: '30+ PROJECTS DELIVERED' },
                { Icon: TimerIcon, text: 'RESPONSE: UNDER 2 HRS' },
                { Icon: GlobeIcon, text: 'CLIENTS WORLDWIDE' },
              ] as const).map((item) => (
                <span
                  key={item.text}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    color: 'var(--charcoal)',
                    opacity: 0.65,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <item.Icon weight="duotone" size={14} /> {item.text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
