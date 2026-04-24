import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PremiumServicesSection, PremiumCTASection } from '../components/premium';

const pillars = [
  { tag: '01', title: 'DIGITAL PRESENCE', desc: 'Websites, e-commerce stores, and custom SaaS — built to convert.', color: 'var(--mustard)' },
  { tag: '02', title: 'SMART AUTOMATION', desc: 'WhatsApp bots, Ghost Closer, and Dealer Management Systems.', color: 'var(--red)' },
  { tag: '03', title: 'AI AGENTS', desc: 'Scholar RAG, Summoner routing, and AI design systems.', color: 'var(--purple)' },
  { tag: '04', title: 'MARKETING', desc: 'Social media management, SEO, and content at scale.', color: 'var(--charcoal)' },
];

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Services — Xero Seven AI Agency';
  }, []);

  return (
    <div>
      {/* ── Page Hero ─────────────────────── */}
      <section
        style={{
          background: 'var(--charcoal)',
          padding: 'clamp(110px, 12vh, 130px) 24px 64px',
          borderBottom: '3px solid var(--mustard)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(253,245,228,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px', pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span style={{
              background: 'var(--mustard)', color: 'var(--charcoal)',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              fontWeight: 700, letterSpacing: '0.1em', padding: '5px 14px',
              borderRadius: 999, border: '2px solid var(--mustard)',
              display: 'inline-block', marginBottom: 20,
            }}>
              ◈ COMPLETE SERVICE SUITE
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h1 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 'clamp(40px, 6vw, 80px)',
                lineHeight: 0.95, color: 'var(--bone)', margin: 0,
              }}>
                EVERYTHING YOUR<br />
                <span style={{
                  color: 'var(--mustard)',
                  textShadow: '4px 4px 0 rgba(255,201,60,0.15)',
                }}>
                  BUSINESS NEEDS.
                </span>
              </h1>
              <div style={{ maxWidth: 380 }}>
                <p style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 15,
                  lineHeight: 1.7, color: 'rgba(253,245,228,0.7)', margin: '0 0 20px',
                }}>
                  From your first website to a fully autonomous AI operation — pick what you need today, scale when you're ready.
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ y: -2, boxShadow: '4px 4px 0 var(--mustard)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'var(--mustard)', color: 'var(--charcoal)',
                      border: '3px solid var(--mustard)', borderRadius: 999,
                      padding: '12px 24px', fontFamily: '"Archivo Black", sans-serif',
                      fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer',
                      boxShadow: '3px 3px 0 rgba(255,201,60,0.2)',
                    }}
                  >
                    GET A FREE QUOTE ↗
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Pillar strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {pillars.map((p, i) => (
              <motion.div
                key={p.tag}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                style={{
                  border: '2px solid rgba(253,245,228,0.15)',
                  borderRadius: 16, padding: '16px',
                  background: 'rgba(253,245,228,0.05)',
                }}
              >
                <span style={{
                  background: p.color, color: 'var(--charcoal)',
                  fontFamily: '"Archivo Black", sans-serif', fontSize: 9,
                  padding: '2px 8px', borderRadius: 999,
                  border: '1.5px solid var(--charcoal)', display: 'inline-block', marginBottom: 8,
                }}>
                  {p.tag}
                </span>
                <div style={{
                  fontFamily: '"Archivo Black", sans-serif', fontSize: 12,
                  color: 'var(--bone)', letterSpacing: '0.04em', marginBottom: 4,
                }}>
                  {p.title}
                </div>
                <p style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 11,
                  lineHeight: 1.5, color: 'rgba(253,245,228,0.6)', margin: 0,
                }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Grid ───────────────────── */}
      <PremiumServicesSection />

      {/* ── How It Works teaser ─────────────── */}
      <section style={{
        padding: '64px 24px',
        background: 'var(--section-alt)',
        borderTop: '3px solid var(--charcoal)',
        borderBottom: '3px solid var(--charcoal)',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(24px, 4vw, 40px)',
            color: 'var(--charcoal)', margin: '0 0 12px',
          }}>
            HOW DOES IT ALL CONNECT?
          </h3>
          <p style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 15,
            lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 480,
            margin: '0 auto 24px',
          }}>
            The Summoner, Gateway, Scholar RAG, and Ghost Closer work as one system. See the full architecture.
          </p>
          <Link to="/how-it-works" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ y: -2, boxShadow: '6px 6px 0 var(--charcoal)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--charcoal)', color: 'var(--bone)',
                border: '3px solid var(--charcoal)', borderRadius: 999,
                padding: '14px 28px', fontFamily: '"Archivo Black", sans-serif',
                fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
                boxShadow: '4px 4px 0 var(--charcoal)',
              }}
            >
              EXPLORE THE ARCHITECTURE ↗
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <PremiumCTASection />
    </div>
  );
}
