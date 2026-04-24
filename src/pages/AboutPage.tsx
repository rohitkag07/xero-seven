import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GlobeIcon, ShoppingCartIcon, InstagramLogoIcon, WhatsappLogoIcon, CameraIcon,
  CodeIcon, CpuIcon, VideoCameraIcon, PenNibIcon
} from '@phosphor-icons/react';

const capabilities = [
  { icon: GlobeIcon, title: 'Web Development', desc: 'Premium websites & landing pages built with React, Next.js and modern frameworks.', bg: 'var(--mustard-lt)' },
  { icon: ShoppingCartIcon, title: 'E-Commerce', desc: 'Complete online stores with UPI/card payments, inventory, and order tracking.', bg: 'var(--red-lt)' },
  { icon: InstagramLogoIcon, title: 'Social Media', desc: 'Content creation, scheduling, analytics, and growth strategy across all platforms.', bg: 'var(--purple-lt)' },
  { icon: WhatsappLogoIcon, title: 'WhatsApp Automation', desc: 'AI-powered auto-replies, appointment booking, and customer follow-ups 24/7.', bg: '#8AEFCA' },
  { icon: CameraIcon, title: 'Photography & Video', desc: 'Product photography, brand shoots, event coverage, and promotional videos.', bg: 'var(--mustard-lt)' },
  { icon: CodeIcon, title: 'Custom Software', desc: 'Full-stack app development — MVPs, SaaS platforms, and internal business tools.', bg: 'var(--red-lt)' },
  { icon: PenNibIcon, title: 'Content & SEO', desc: 'Blog posts, social captions, newsletters, and keyword strategy for organic growth.', bg: 'var(--purple-lt)' },
  { icon: VideoCameraIcon, title: 'AI Video Production', desc: 'Programmatic video generation for social media ads, reels, and marketing campaigns.', bg: '#8AEFCA' },
  { icon: CpuIcon, title: 'Business Automation', desc: 'Connect all your software — Google Sheets, WhatsApp, email, CRM — into one flow.', bg: 'var(--mustard-lt)' },
];

const values = [
  { title: 'Technology-First Approach', description: 'We use the latest AI and automation tools to deliver faster, better, and more cost-effective results than traditional agencies.' },
  { title: 'Any Industry, Any Scale', description: 'From a single WhatsApp bot to a full enterprise platform — we serve healthcare, real estate, e-commerce, education, and more.' },
  { title: 'Speed That Matters', description: 'We ship working systems in days, not months. Start seeing results from week one.' },
  { title: 'Transparent Pricing', description: 'No hidden fees, no lock-in contracts. You pay for what you use, and you own everything we build.' },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About — Xero Seven | AI Agency in Indore';
  }, []);

  return (
    <div style={{ paddingTop: 0 }}>
      <section style={{ padding: '120px 16px 96px', position: 'relative' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            style={{ marginBottom: 72, maxWidth: 700 }}
          >
            <span className="gp-kicker" style={{ display: 'inline-flex', marginBottom: 20 }}>
              ◆ OUR STORY
            </span>
            <h1 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              lineHeight: 0.92,
              color: 'var(--text-body)',
              marginTop: 16,
            }}>
              YOUR COMPLETE
              <br />
              <span style={{ color: 'var(--hero-accent)', WebkitTextStroke: '3px var(--charcoal)', paintOrder: 'stroke fill' }}>
                DIGITAL PARTNER
              </span>
              <br />
              IN INDORE.
            </h1>
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 16, lineHeight: 1.65,
              color: 'var(--text-muted)', maxWidth: 520, marginTop: 24,
            }}>
              Xero Seven combines cutting-edge AI technology with creative expertise to help local businesses build their presence, automate operations, and grow revenue.
            </p>
          </motion.div>

          {/* Founder + Values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 80 }}>
            {/* Founder Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="gp-card"
              style={{ padding: 32 }}
            >
              <h3 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 16, color: 'var(--text-body)',
                letterSpacing: '0.04em', marginBottom: 20,
              }}>
                THE FOUNDER
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 20,
                  background: 'var(--mustard)',
                  border: '3px solid var(--charcoal)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '3px 3px 0 var(--charcoal)',
                }}>
                  <span style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 20, color: 'var(--charcoal)' }}>RK</span>
                </div>
                <div>
                  <p style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 14, color: 'var(--text-body)' }}>ROHIT KAG</p>
                  <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'var(--hero-accent)', letterSpacing: '0.08em' }}>FOUNDER & LEAD ARCHITECT</p>
                </div>
              </div>
              <p style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 13, lineHeight: 1.65,
                color: 'var(--text-muted)', marginBottom: 20,
              }}>
                Full-stack developer and AI specialist with deep experience in building production-grade web applications, e-commerce platforms, and intelligent automation systems. Passionate about using technology to help Indore businesses compete on a global stage.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AI/ML', 'Google Cloud', 'Photography', 'Video', 'UI/UX', 'SEO'].map((skill) => (
                  <span key={skill} className="gp-chip" style={{ fontSize: 9, padding: '4px 10px' }}>
                    {skill.toUpperCase()}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="gp-card"
              style={{ padding: 32 }}
            >
              <h3 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 16, color: 'var(--text-body)',
                letterSpacing: '0.04em', marginBottom: 24,
              }}>
                OUR VALUES
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {values.map((v, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16 }}>
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 10, color: 'var(--hero-accent)',
                      opacity: 0.6, marginTop: 4, letterSpacing: '0.08em',
                    }}>
                      0{i + 1}
                    </span>
                    <div>
                      <p style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 13, color: 'var(--text-body)', marginBottom: 4 }}>
                        {v.title.toUpperCase()}
                      </p>
                      <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                        {v.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 72 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="gp-kicker-mustard" style={{ display: 'inline-flex', marginBottom: 16 }}>
                ◆ WHAT WE DO
              </span>
              <h2 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: 'var(--text-body)', marginTop: 12,
              }}>
                OUR CAPABILITIES
              </h2>
              <p style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 15, color: 'var(--text-muted)',
                marginTop: 12, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto',
              }}>
                From websites to WhatsApp bots, social media to software — we've got every digital need of your business covered.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ y: -4, boxShadow: '10px 10px 0 var(--charcoal)' }}
                    style={{
                      background: 'var(--card-bg)',
                      border: '3.5px solid var(--charcoal)',
                      borderRadius: 24,
                      padding: 24,
                      boxShadow: '6px 6px 0 var(--charcoal)',
                      height: '100%',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: cap.bg,
                      border: '2.5px solid var(--charcoal)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '2px 2px 0 var(--charcoal)',
                      marginBottom: 14,
                    }}>
                      <cap.icon weight="duotone" size={22} color="var(--charcoal)" />
                    </div>
                    <h4 style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: 13, color: 'var(--text-body)',
                      letterSpacing: '0.02em', marginBottom: 6,
                    }}>
                      {cap.title.toUpperCase()}
                    </h4>
                    <p style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 12, lineHeight: 1.6,
                      color: 'var(--text-muted)',
                    }}>
                      {cap.desc}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <div className="gp-card-red" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px', textAlign: 'center' }}>
              <h3 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 24, color: 'var(--bone)', marginBottom: 12,
              }}>
                READY TO GROW YOUR BUSINESS?
              </h3>
              <p style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 14, color: 'var(--bone)',
                opacity: 0.85, marginBottom: 24,
              }}>
                Let's discuss how we can help your business build a powerful online presence.
              </p>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="gp-btn-bone" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px',
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 12, letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  border: '3.5px solid var(--charcoal)',
                  borderRadius: 999, cursor: 'pointer',
                  boxShadow: '4px 4px 0 var(--charcoal)',
                }}>
                  GET FREE CONSULTATION ↗
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
