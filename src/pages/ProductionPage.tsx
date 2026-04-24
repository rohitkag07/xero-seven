import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CameraIcon, VideoCameraIcon, DroneIcon, SparkleIcon, ImageIcon, FilmStripIcon,
  ArrowRightIcon, CheckCircleIcon, CurrencyInrIcon
} from '@phosphor-icons/react';

const productionServices = [
  {
    icon: CameraIcon,
    title: 'Product Photography',
    description: 'High-quality product shots for your e-commerce store, catalog, or social media. White background, lifestyle, or creative compositions — ready to sell.',
    features: ['E-commerce ready white background', 'Lifestyle & context shots', 'Multiple angles per product', '48-hour delivery', 'Basic retouching included', 'Web & print formats'],
    pricing: '₹500 – ₹2,000 per product',
    cardColor: 'var(--mustard)',
    bgColor: 'var(--mustard-lt)',
  },
  {
    icon: SparkleIcon,
    title: 'Brand Photography',
    description: 'Team headshots, office environment, founder portraits, and brand lifestyle imagery. Everything you need for your website, LinkedIn, and marketing materials.',
    features: ['Professional team headshots', 'Office & workspace photography', 'Founder portrait sessions', 'Brand lifestyle imagery', 'Social media optimized', 'Full retouching & color grading'],
    pricing: '₹5,000 – ₹25,000 per session',
    cardColor: 'var(--purple)',
    bgColor: 'var(--purple-lt)',
  },
  {
    icon: FilmStripIcon,
    title: 'Event Coverage',
    description: 'Corporate events, product launches, exhibitions, conferences, and celebrations. Full day coverage with same-day highlight reel delivery.',
    features: ['Full-day event coverage', 'Same-day highlight reel', 'Candid + staged shots', 'Video highlights (30-60s)', 'Online gallery delivery', 'Raw + edited files'],
    pricing: '₹10,000 – ₹35,000 per event',
    cardColor: 'var(--red)',
    bgColor: 'var(--red-lt)',
  },
  {
    icon: VideoCameraIcon,
    title: 'Video Production',
    description: 'Promotional videos, testimonials, product demos, brand stories, and social media reels. Script to screen — we handle everything.',
    features: ['Script writing & storyboarding', 'Professional videography', 'Motion graphics & text', 'Background music & SFX', 'Multiple format delivery', 'Reels, YouTube, Ads formats'],
    pricing: '₹8,000 – ₹50,000 per video',
    cardColor: 'var(--mint)',
    bgColor: '#8AEFCA',
  },
  {
    icon: DroneIcon,
    title: 'Drone & Aerial',
    description: 'Stunning aerial photography and videography for real estate, construction sites, event venues, and brand campaigns. Licensed drone operators.',
    features: ['4K aerial video', 'High-res aerial stills', 'Licensed operators', 'Real estate walkthroughs', 'Construction progress shots', 'Event venue overviews'],
    pricing: '₹8,000 – ₹20,000 per session',
    cardColor: 'var(--purple)',
    bgColor: 'var(--purple-lt)',
  },
  {
    icon: ImageIcon,
    title: 'Post-Production',
    description: 'Professional photo editing, video editing, color grading, retouching, and batch processing. We make your raw content look magazine-ready.',
    features: ['Advanced photo retouching', 'Video editing & cuts', 'Color grading & correction', 'Background removal', 'Batch processing', 'Rush delivery available'],
    pricing: '₹200 – ₹1,000 per image',
    cardColor: 'var(--mustard)',
    bgColor: 'var(--mustard-lt)',
  },
];

export default function ProductionPage() {
  useEffect(() => {
    document.title = 'Production Studio — Xero Seven AI Agency';
  }, []);

  return (
    <div style={{ paddingTop: 0 }}>
      <section style={{ padding: '120px 16px 96px', position: 'relative' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            style={{ marginBottom: 56 }}
          >
            <span className="gp-kicker-purple" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
              <CameraIcon weight="duotone" size={11} /> PRODUCTION STUDIO
            </span>
            <h1
              style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: 0.92,
                color: 'var(--text-body)',
                marginTop: 16,
              }}
            >
              PHOTOGRAPHY &
              <br />
              <span style={{ color: 'var(--hero-accent)', WebkitTextStroke: '3px var(--charcoal)', paintOrder: 'stroke fill' }}>
                VIDEO PRODUCTION
              </span>
            </h1>
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontSize: 16, lineHeight: 1.65,
              color: 'var(--text-muted)', maxWidth: 520, marginTop: 20,
            }}>
              Professional photography and videography for your brand, products, and events.
              Our production team delivers magazine-quality visuals with fast turnaround.
            </p>
          </motion.div>

          {/* Service Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {productionServices.map((service, i) => {
              const [showPrice, setShowPrice] = useState(false);
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  <motion.div
                    whileHover={{ y: -4, boxShadow: '10px 10px 0 var(--charcoal)' }}
                    style={{
                      background: 'var(--card-bg)',
                      border: '3.5px solid var(--charcoal)',
                      borderRadius: 28,
                      padding: 28,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '6px 6px 0 var(--charcoal)',
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 52, height: 52, borderRadius: 16,
                      background: service.bgColor,
                      border: '3px solid var(--charcoal)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '3px 3px 0 var(--charcoal)',
                      marginBottom: 20,
                    }}>
                      <service.icon weight="duotone" size={26} color="var(--charcoal)" />
                    </div>

                    <h3 style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: 16, color: 'var(--text-body)',
                      letterSpacing: '0.02em', marginBottom: 8,
                    }}>
                      {service.title.toUpperCase()}
                    </h3>

                    <p style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 13, lineHeight: 1.6,
                      color: 'var(--text-muted)', marginBottom: 20,
                    }}>
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 20, flex: 1 }}>
                      {service.features.map((f) => (
                        <li key={f} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '4px 0',
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: 10, letterSpacing: '0.06em',
                          color: 'var(--text-muted)',
                        }}>
                          <CheckCircleIcon weight="fill" size={14} color={service.cardColor} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Actions */}
                    <div style={{
                      borderTop: '2.5px solid var(--charcoal)',
                      paddingTop: 16,
                      display: 'flex', gap: 12, alignItems: 'center',
                    }}>
                      <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <button className="gp-btn gp-btn-sm" style={{ fontSize: 10 }}>
                          BOOK NOW <ArrowRightIcon weight="bold" size={12} />
                        </button>
                      </Link>
                      <button
                        onClick={() => setShowPrice(!showPrice)}
                        style={{
                          background: 'var(--bone)',
                          border: '2.5px solid var(--charcoal)',
                          borderRadius: 999,
                          padding: '8px 14px',
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: 10, fontWeight: 700,
                          color: 'var(--charcoal)',
                          cursor: 'pointer',
                          boxShadow: '3px 3px 0 var(--charcoal)',
                          display: 'flex', alignItems: 'center', gap: 4,
                          letterSpacing: '0.06em',
                        }}
                      >
                        <CurrencyInrIcon weight="bold" size={12} />
                        {showPrice ? 'HIDE' : 'PRICE'}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showPrice && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden', marginTop: 12 }}
                        >
                          <div className="gp-chip-mustard" style={{ display: 'inline-flex', fontSize: 12, fontWeight: 700 }}>
                            {service.pricing}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginTop: 64 }}
          >
            <div className="gp-card-purple" style={{ maxWidth: 700, margin: '0 auto', padding: '48px 32px', textAlign: 'center' }}>
              <h3 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 24, color: 'var(--bone)',
                marginBottom: 12,
              }}>
                NEED A CUSTOM PACKAGE?
              </h3>
              <p style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 14, color: 'var(--bone)',
                opacity: 0.8, marginBottom: 24,
              }}>
                We create tailored production packages for recurring shoots, monthly content, and large-scale events.
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
                  LET'S DISCUSS ↗
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
