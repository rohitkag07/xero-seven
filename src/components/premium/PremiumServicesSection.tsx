import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GlobeIcon, ShoppingCartIcon, InstagramLogoIcon, WhatsappLogoIcon, CodeIcon,
  PenNibIcon, UserFocusIcon, CpuIcon, FunnelSimpleIcon, BuildingsIcon,
  ArrowRightIcon, XIcon, RobotIcon, MegaphoneSimpleIcon, PaletteIcon
} from '@phosphor-icons/react';

// serviceCategories is defined after services so counts are computed dynamically

const services = [
  {
    id: 'webdev', category: 'digital', icon: GlobeIcon,
    title: 'Website Development', tagline: 'Premium sites that rank and convert',
    description: 'React, Next.js, Vite — optimized for Google and conversions. From landing pages to full corporate portals with CMS.',
    features: ['React / Next.js', 'Mobile-first', 'SEO optimized', 'Analytics setup', 'Fast (<2s)', 'CMS included'],
    pricing: '₹15,000 – ₹45,000 setup', accentColor: 'var(--mustard)', gridSpan: 'col-span-2 row-span-2'
  },
  {
    id: 'ecommerce', category: 'digital', icon: ShoppingCartIcon,
    title: 'E-Commerce & Stores', tagline: 'Sell online with UPI & cards',
    description: 'Complete online stores with Razorpay, Stripe, inventory management, order tracking, and mobile checkout optimization.',
    features: ['UPI/Cards/COD', 'Payment ready', 'Inventory mgmt', 'Order tracking', 'Analytics', 'Mobile optimized'],
    pricing: '₹20,000 – ₹1,00,000 setup', accentColor: 'var(--purple)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'saas', category: 'digital', icon: CodeIcon,
    title: 'Custom Software & Apps', tagline: 'Your idea, built to scale',
    description: 'Full-stack MVPs, SaaS platforms, internal tools — with secure auth, databases, payments, and cloud hosting.',
    features: ['React + Node.js', 'PostgreSQL', 'Secure auth', 'Payment ready', 'Cloud hosting', 'Admin dashboard'],
    pricing: '₹50,000 – ₹2,00,000 setup', accentColor: 'var(--red)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'social', category: 'marketing', icon: InstagramLogoIcon,
    title: 'Social Media Management', tagline: 'Grow strategically, post consistently',
    description: 'Content creation, scheduling, hashtag strategy, community engagement across Instagram, Facebook, LinkedIn.',
    features: ['30+ posts/month', 'Multi-platform', 'Analytics tracking', 'Hashtag strategy', 'Community mgmt', 'Competitor analysis'],
    pricing: '₹15,000 – ₹30,000/month', accentColor: 'var(--mustard)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'content', category: 'marketing', icon: PenNibIcon,
    title: 'Content & SEO Marketing', tagline: 'Get found on Google organically',
    description: 'SEO-optimized blog articles, social captions, newsletters, and marketing copy — aligned to your brand voice.',
    features: ['4-8 blogs/month', 'Keyword research', 'SEO optimized', 'Email newsletters', 'Brand voice guide', 'Performance tracking'],
    pricing: '₹15,000 – ₹30,000/month', accentColor: 'var(--purple)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'ghost-closer', category: 'automation', icon: UserFocusIcon,
    title: 'Ghost Closer — Sales AI', tagline: 'Autonomous outbound that books meetings while you sleep',
    description: 'Our Ghost Closer agent identifies prospects on LinkedIn & WhatsApp, sends hyper-personalized sequences, qualifies leads in real-time, and books meetings directly in your calendar — 24/7.',
    features: ['LinkedIn + WhatsApp outbound', 'AI lead scoring', 'Personalized sequences', 'Calendar booking', '24/7 follow-ups', 'CRM auto-sync'],
    pricing: '₹15,000 – ₹40,000/month', accentColor: 'var(--red)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'whatsapp', category: 'automation', icon: WhatsappLogoIcon,
    title: 'WhatsApp AI Automation', tagline: '24/7 customer support bot',
    description: 'AI-powered WhatsApp bot with auto-replies in Hindi & English, appointment booking, FAQ answers, and emergency detection.',
    features: ['24/7 replies', 'Bilingual (HI/EN)', 'Booking automation', 'Emergency detection', 'Daily summaries', 'Custom flows'],
    pricing: '₹10,000 setup + ₹2,000/month', accentColor: 'var(--mustard)', gridSpan: 'col-span-2 row-span-1'
  },
  {
    id: 'leads', category: 'automation', icon: FunnelSimpleIcon,
    title: 'Lead Capture & Qualification', tagline: 'Turn interest into opportunities',
    description: 'Smart forms, email funnels, lead scoring, CRM integration — automatically qualify and nurture your leads.',
    features: ['Smart forms', 'Email funnels', 'Lead scoring', 'CRM sync', 'Auto-qualification', 'Email nurturing'],
    pricing: '₹8,000 setup', accentColor: 'var(--purple)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'integration', category: 'automation', icon: CpuIcon,
    title: 'Business Automation', tagline: 'Connect 100+ tools, eliminate manual work',
    description: 'Zapier, Make, n8n workflows — automate data flows between your CRM, email, spreadsheets, and tools.',
    features: ['100+ app integrations', 'Workflow automation', 'Data syncing', 'Error handling', 'Monthly optimization', 'Cost savings'],
    pricing: '₹5,000 – ₹15,000/month', accentColor: 'var(--red)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'dealer-mgmt', category: 'automation', icon: BuildingsIcon,
    title: 'Dealer Management System', tagline: 'Custom DMS built for Indian distributors',
    description: 'Full-stack SaaS DMS with dealer portals, stock tracking, order management, GST invoice generation, WhatsApp alerts, and real-time analytics — like we built for Kag Batteries.',
    features: ['Dealer portal login', 'Stock & order tracking', 'GST invoice auto-gen', 'WhatsApp dispatch alerts', 'Payment reconciliation', 'Real-time dashboard'],
    pricing: '₹80,000 – ₹2,50,000 setup', accentColor: 'var(--mustard)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'ai-chat', category: 'agentic', icon: RobotIcon,
    title: 'AI Chat Agents', tagline: 'Agentic AI for your business',
    description: 'Custom AI agents for customer support, lead qualification, data analysis, and decision-making assistance.',
    features: ['Custom training', 'Multi-channel', 'Memory system', 'Analytics ready', 'Easy integration', 'Continuous learning'],
    pricing: '₹25,000 – ₹75,000/month', accentColor: 'var(--purple)', gridSpan: 'col-span-1 row-span-2'
  },
  {
    id: 'marketing-ai', category: 'agentic', icon: MegaphoneSimpleIcon,
    title: 'AI Marketing Agent', tagline: 'Data-driven campaign optimization',
    description: 'AI agents that analyze performance metrics, optimize campaigns, test variations, and recommend strategies.',
    features: ['Performance analysis', 'Campaign optimization', 'A/B testing', 'Data visualization', 'Recommendations', 'Real-time alerts'],
    pricing: '₹20,000 – ₹60,000/month', accentColor: 'var(--red)', gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'design-ai', category: 'agentic', icon: PaletteIcon,
    title: 'AI Design Systems', tagline: 'Scalable design operations',
    description: 'AI-powered design systems that generate assets, maintain consistency, and scale creative operations.',
    features: ['Asset generation', 'Brand consistency', 'Design systems', 'Template creation', 'Version control', 'Team collaboration'],
    pricing: '₹15,000 – ₹50,000/month', accentColor: 'var(--mustard)', gridSpan: 'col-span-1 row-span-1'
  },
];

// Counts derived from data — never go stale
const serviceCategories = [
  { id: 'all',        label: 'All Services',         count: services.length },
  { id: 'digital',    label: 'Digital Presence',     count: services.filter(s => s.category === 'digital').length },
  { id: 'marketing',  label: 'Marketing & Growth',   count: services.filter(s => s.category === 'marketing').length },
  { id: 'automation', label: 'Smart Automation',     count: services.filter(s => s.category === 'automation').length },
  { id: 'agentic',    label: 'AI Specialist Skills', count: services.filter(s => s.category === 'agentic').length },
];

// ─── SERVICE MODAL — business logic intact ───────────────────
function ServiceModal({ service, onClose }: { service: typeof services[0]; onClose: () => void }) {
  const Icon = service.icon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${service.title}`}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(26,26,26,0.6)',
          backdropFilter: 'blur(6px)', zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        }}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bone)',
            border: '3px solid var(--charcoal)',
            borderRadius: 24,
            maxWidth: 640,
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: 36,
            boxShadow: '8px 8px 0 var(--charcoal)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 60, height: 60, borderRadius: 16,
                background: service.accentColor, border: '2.5px solid var(--charcoal)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '3px 3px 0 var(--charcoal)',
              }}>
                <Icon size={28} weight="bold" style={{ color: 'var(--charcoal)' }} />
              </div>
              <div>
                <h2 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 24, color: 'var(--charcoal)', margin: 0 }}>
                  {service.title}
                </h2>
                <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--charcoal)', opacity: 0.65, marginTop: 4, letterSpacing: '0.06em' }}>
                  {service.tagline.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label={`Close ${service.title} details`}
              style={{
                background: 'var(--charcoal)', color: 'var(--bone)',
                border: '2px solid var(--charcoal)', borderRadius: 10,
                width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', fontSize: 16, flexShrink: 0,
              }}
            >
              <XIcon size={18} weight="bold" />
            </button>
          </div>

          <div style={{ height: 3, background: 'var(--charcoal)', borderRadius: 999, marginBottom: 24, opacity: 0.12 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Description */}
            <div>
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.12em', color: 'var(--charcoal)', opacity: 0.5, marginBottom: 8 }}>
                OVERVIEW
              </p>
              <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 15, color: 'var(--charcoal)', lineHeight: 1.65 }}>
                {service.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.12em', color: 'var(--charcoal)', opacity: 0.5, marginBottom: 10 }}>
                INCLUDES
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {service.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: service.accentColor === 'var(--mustard)' ? '#b8860b' : service.accentColor, fontSize: 10 }}>◆</span>
                    <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 13, color: 'var(--charcoal)' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div style={{
              background: service.accentColor, border: '2.5px solid var(--charcoal)', borderRadius: 14,
              padding: '14px 18px', boxShadow: '3px 3px 0 var(--charcoal)',
            }}>
              <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.1em', color: 'var(--charcoal)', opacity: 0.65, marginBottom: 4 }}>PRICING</p>
              <p style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 18, color: 'var(--charcoal)', margin: 0 }}>{service.pricing}</p>
            </div>

            {/* CTA */}
            <Link to="/contact" onClick={onClose} style={{ textDecoration: 'none' }}>
              <button style={{
                width: '100%', background: 'var(--charcoal)', color: 'var(--bone)',
                border: '3px solid var(--charcoal)', borderRadius: 14,
                padding: '14px', fontFamily: '"Archivo Black", sans-serif',
                fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
              }}>
                GET A FREE QUOTE
                <ArrowRightIcon size={18} weight="bold" />
              </button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────
function ServiceCard({ service, onClick }: { service: typeof services[0]; onClick: () => void }) {
  const Icon = service.icon;
  const isLarge = service.gridSpan.includes('row-span-2') || service.gridSpan.includes('col-span-2');

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3, boxShadow: '7px 7px 0 var(--charcoal)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: '100%', height: '100%', minHeight: isLarge ? 280 : 180,
        background: 'var(--bone)',
        border: '3px solid var(--charcoal)',
        borderRadius: 24,
        padding: 24,
        cursor: 'pointer',
        textAlign: 'left',
        boxShadow: '5px 5px 0 var(--charcoal)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent blob */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: service.accentColor, opacity: 0.18,
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: service.accentColor, border: '2.5px solid var(--charcoal)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '2px 2px 0 var(--charcoal)', flexShrink: 0,
      }}>
        <Icon size={22} weight="bold" style={{ color: 'var(--charcoal)' }} />
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: isLarge ? 22 : 16, color: 'var(--charcoal)', margin: '0 0 4px' }}>
          {service.title}
        </h3>
        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.06em', color: 'var(--charcoal)', opacity: 0.6, margin: 0 }}>
          {service.tagline.toUpperCase()}
        </p>
        {isLarge && (
          <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 13, color: 'var(--charcoal)', opacity: 0.75, marginTop: 10, lineHeight: 1.55 }}>
            {service.description}
          </p>
        )}
      </div>

      {/* Pricing chip */}
      <div style={{
        background: service.accentColor, border: '2px solid var(--charcoal)', borderRadius: 999,
        padding: '4px 12px', fontSize: 10, fontFamily: '"JetBrains Mono", monospace',
        fontWeight: 700, letterSpacing: '0.04em', color: 'var(--charcoal)',
        alignSelf: 'flex-start', boxShadow: '2px 2px 0 var(--charcoal)',
      }}>
        {service.pricing}
      </div>
    </motion.button>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────
export function PremiumServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filteredServices = useMemo(() => {
    return selectedCategory === 'all' ? services : services.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section style={{ background: 'var(--page-bg)', padding: '80px 0', position: 'relative' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <span style={{
            background: 'var(--charcoal)', color: 'var(--bone)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            fontWeight: 700, letterSpacing: '0.1em', padding: '5px 14px',
            borderRadius: 999, border: '2px solid var(--charcoal)',
          }}>
            ◉ SECTION 04 • THE GATEWAY
          </span>
          <h2 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--charcoal)',
            margin: '16px 0 12px',
            lineHeight: 1.05,
          }}>
            HANDS OF THE<br />
            <span style={{
              color: 'var(--mustard)',
              WebkitTextStroke: '3px var(--charcoal)',
              paintOrder: 'stroke fill',
              textShadow: '4px 4px 0 var(--charcoal)',
            }}>SWARM.</span>
          </h2>
          <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 16, color: 'var(--charcoal)', opacity: 0.7, maxWidth: 540 }}>
            One protocol. 340+ tools. The Gateway executes whatever the Summoner commands — send, schedule, ship, charge, deploy.
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4, marginBottom: 36, flexWrap: 'wrap' }}>
          {serviceCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={selectedCategory === cat.id}
              style={{
                background: selectedCategory === cat.id ? 'var(--charcoal)' : 'transparent',
                color: selectedCategory === cat.id ? 'var(--bone)' : 'var(--charcoal)',
                border: '2.5px solid var(--charcoal)',
                borderRadius: 999,
                padding: '8px 16px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.06em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: selectedCategory === cat.id ? '3px 3px 0 rgba(0,0,0,0.2)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {cat.label.toUpperCase()} ({cat.count})
            </motion.button>
          ))}
        </div>

        {/* Bento grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: idx * 0.04, ease: 'easeOut' }}
                className={`col-span-1 md:${service.gridSpan}`}
              >
                <ServiceCard service={service} onClick={() => setSelectedService(service)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            marginTop: 48,
            background: 'var(--charcoal)',
            border: '3px solid var(--charcoal)',
            borderRadius: 24,
            padding: '40px 48px',
            textAlign: 'center',
            boxShadow: '6px 6px 0 var(--mustard)',
          }}
        >
          <h3 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 28, color: 'var(--bone)', margin: '0 0 8px' }}>
            DON'T SEE WHAT YOU NEED?
          </h3>
          <p style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 15, color: 'var(--bone)', opacity: 0.7, maxWidth: 480, margin: '0 auto 24px' }}>
            We build custom solutions. Schedule a free strategy call to discuss your specific challenges.
          </p>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ y: -2, boxShadow: '5px 5px 0 var(--mustard)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--mustard)', color: 'var(--charcoal)',
                border: '3px solid var(--bone)', borderRadius: 999,
                padding: '14px 28px', fontFamily: '"Archivo Black", sans-serif',
                fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
                boxShadow: '4px 4px 0 rgba(255,255,255,0.3)',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}
            >
              GET A FREE CONSULTATION <ArrowRightIcon size={16} weight="bold" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
}
