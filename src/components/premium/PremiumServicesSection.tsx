import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, ShoppingCart, InstagramLogo, WhatsappLogo, Camera, Code,
  PenNib, VideoCamera, UserFocus, Cpu,
  ArrowRight, X, Robot, MegaphoneSimple, Palette
} from '@phosphor-icons/react';
import { ScrollReveal } from './ScrollReveal';
import { PremiumCard, PremiumHeadline } from './PremiumComponents';
import { DoubleBevel } from './PremiumComponents';

// ─── SERVICE DATABASE ────────────────────────────────────────
const serviceCategories = [
  { id: 'all', label: 'All Services', count: 15 },
  { id: 'digital', label: 'Digital Presence', count: 3 },
  { id: 'marketing', label: 'Marketing & Growth', count: 4 },
  { id: 'automation', label: 'Smart Automation', count: 3 },
  { id: 'production', label: 'Production & Content', count: 2 },
  { id: 'agentic', label: 'AI Specialist Skills', count: 3 },
];

const services = [
  {
    id: 'webdev',
    category: 'digital',
    icon: Globe,
    title: 'Website Development',
    tagline: 'Premium sites that rank and convert',
    description: 'React, Next.js, Vite — optimized for Google and conversions. From landing pages to full corporate portals with CMS.',
    features: ['React / Next.js', 'Mobile-first', 'SEO optimized', 'Analytics setup', 'Fast (<2s)', 'CMS included'],
    pricing: '₹15,000 – ₹45,000 setup',
    color: 'amber' as const,
    gridSpan: 'col-span-2 row-span-2'
  },
  {
    id: 'ecommerce',
    category: 'digital',
    icon: ShoppingCart,
    title: 'E-Commerce & Stores',
    tagline: 'Sell online with UPI & cards',
    description: 'Complete online stores with Razorpay, Stripe, inventory management, order tracking, and mobile checkout optimization.',
    features: ['UPI/Cards/COD', 'Payment ready', 'Inventory mgmt', 'Order tracking', 'Analytics', 'Mobile optimized'],
    pricing: '₹20,000 – ₹1,00,000 setup',
    color: 'blue' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'saas',
    category: 'digital',
    icon: Code,
    title: 'Custom Software & Apps',
    tagline: 'Your idea, built to scale',
    description: 'Full-stack MVPs, SaaS platforms, internal tools — with secure auth, databases, payments, and cloud hosting.',
    features: ['React + Node.js', 'PostgreSQL', 'Secure auth', 'Payment ready', 'Cloud hosting', 'Admin dashboard'],
    pricing: '₹50,000 – ₹2,00,000 setup',
    color: 'cyan' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'social',
    category: 'marketing',
    icon: InstagramLogo,
    title: 'Social Media Management',
    tagline: 'Grow strategically, post consistently',
    description: 'Content creation, scheduling, hashtag strategy, community engagement across Instagram, Facebook, LinkedIn.',
    features: ['30+ posts/month', 'Multi-platform', 'Analytics tracking', 'Hashtag strategy', 'Community mgmt', 'Competitor analysis'],
    pricing: '₹15,000 – ₹30,000/month',
    color: 'rose' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'content',
    category: 'marketing',
    icon: PenNib,
    title: 'Content & SEO Marketing',
    tagline: 'Get found on Google organically',
    description: 'SEO-optimized blog articles, social captions, newsletters, and marketing copy — aligned to your brand voice.',
    features: ['4-8 blogs/month', 'Keyword research', 'SEO optimized', 'Email newsletters', 'Brand voice guide', 'Performance tracking'],
    pricing: '₹15,000 – ₹30,000/month',
    color: 'emerald' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'video',
    category: 'production',
    icon: VideoCamera,
    title: 'AI Video Production',
    tagline: 'Professional videos, 48hr turnaround',
    description: 'Marketing videos, product demos, social ads using AI tools and Remotion. Brand-consistent, unlimited revisions.',
    features: ['AI-scripted', 'Brand templates', 'Reels/Stories/YouTube', 'Batch production', 'Unlimited revisions', '48hr turnaround'],
    pricing: '₹8,000 – ₹25,000/project',
    color: 'violet' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'whatsapp',
    category: 'automation',
    icon: WhatsappLogo,
    title: 'WhatsApp AI Automation',
    tagline: '24/7 customer support bot',
    description: 'AI-powered WhatsApp bot with auto-replies in Hindi & English, appointment booking, FAQ answers, and emergency detection.',
    features: ['24/7 replies', 'Bilingual (HI/EN)', 'Booking automation', 'Emergency detection', 'Daily summaries', 'Custom flows'],
    pricing: '₹10,000 setup + ₹2,000/month',
    color: 'emerald' as const,
    gridSpan: 'col-span-2 row-span-1'
  },
  {
    id: 'leads',
    category: 'automation',
    icon: UserFocus,
    title: 'Lead Capture & Qualification',
    tagline: 'Turn interest into opportunities',
    description: 'Smart forms, email funnels, lead scoring, CRM integration — automatically qualify and nurture your leads.',
    features: ['Smart forms', 'Email funnels', 'Lead scoring', 'CRM sync', 'Auto-qualification', 'Email nurturing'],
    pricing: '₹8,000 setup',
    color: 'orange' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'integration',
    category: 'automation',
    icon: Cpu,
    title: 'Business Automation',
    tagline: 'Connect 100+ tools, eliminate manual work',
    description: 'Zapier, Make, n8n workflows — automate data flows between your CRM, email, spreadsheets, and tools.',
    features: ['100+ app integrations', 'Workflow automation', 'Data syncing', 'Error handling', 'Monthly optimization', 'Cost savings'],
    pricing: '₹5,000 – ₹15,000/month',
    color: 'indigo' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'photography',
    category: 'production',
    icon: Camera,
    title: 'Photography & Visual Content',
    tagline: '4K photos, professional editing',
    description: 'Product photography, corporate shoots, event coverage with professional editing and batch turnaround.',
    features: ['4K quality', 'Raw + edited', 'Batch processing', 'Color grading', 'Web optimization', 'Fast delivery'],
    pricing: '₹8,000 – ₹20,000/day',
    color: 'violet' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'ai-chat',
    category: 'agentic',
    icon: Robot,
    title: 'AI Chat Agents',
    tagline: 'Agentic AI for your business',
    description: 'Custom AI agents for customer support, lead qualification, data analysis, and decision-making assistance.',
    features: ['Custom training', 'Multi-channel', 'Memory system', 'Analytics ready', 'Easy integration', 'Continuous learning'],
    pricing: '₹25,000 – ₹75,000/month',
    color: 'cyan' as const,
    gridSpan: 'col-span-1 row-span-2'
  },
  {
    id: 'marketing-ai',
    category: 'agentic',
    icon: MegaphoneSimple,
    title: 'AI Marketing Agent',
    tagline: 'Data-driven campaign optimization',
    description: 'AI agents that analyze performance metrics, optimize campaigns, test variations, and recommend strategies.',
    features: ['Performance analysis', 'Campaign optimization', 'A/B testing', 'Data visualization', 'Recommendations', 'Real-time alerts'],
    pricing: '₹20,000 – ₹60,000/month',
    color: 'rose' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
  {
    id: 'design-ai',
    category: 'agentic',
    icon: Palette,
    title: 'AI Design Systems',
    tagline: 'Scalable design operations',
    description: 'AI-powered design systems that generate assets, maintain consistency, and scale creative operations.',
    features: ['Asset generation', 'Brand consistency', 'Design systems', 'Template creation', 'Version control', 'Team collaboration'],
    pricing: '₹15,000 – ₹50,000/month',
    color: 'amber' as const,
    gridSpan: 'col-span-1 row-span-1'
  },
];

// ─── MODAL FOR SERVICE DETAILS ──────────────────────────────
function ServiceModal({ service, onClose }: { service: typeof services[0]; onClose: () => void }) {
  const Icon = service.icon;

  // Close on Escape key
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
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                <Icon size={32} weight="duotone" className="text-emerald-700" />
              </div>
              <div>
                <h2 className="text-3xl font-light text-gray-950 -tracking-wider">{service.title}</h2>
                <p className="text-emerald-700 font-medium">{service.tagline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label={`Close ${service.title} details`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <X size={24} className="text-gray-500" weight="bold" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6" />

          {/* Content */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Overview</h3>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">Includes</h3>
              <div className="grid grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Pricing</p>
              <p className="text-lg font-semibold text-gray-900">{service.pricing}</p>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              onClick={onClose}
              className="w-full bg-gray-950 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Get a Free Quote
              <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN SERVICES SECTION ──────────────────────────────────
export function PremiumServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  // Filter services
  const filteredServices = useMemo(() => {
    return selectedCategory === 'all'
      ? services
      : services.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Ambient background element */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="mb-16">
          <PremiumHeadline
            level={2}
            eyebrow="Complete Solution Suite"
            headline="Everything your business needs to grow"
            subheadline="From websites to AI agents — we cover the full spectrum of digital transformation. Pick from our proven services or let us craft a custom solution."
          />
        </ScrollReveal>

        {/* Category Filter - Horizontal Scroll */}
        <ScrollReveal delay={100} className="mb-12">
          <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth">
            {serviceCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={selectedCategory === cat.id}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                  transition-all duration-200 flex-shrink-0
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                  ${selectedCategory === cat.id
                    ? 'bg-gray-950 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {cat.label} <span className="ml-1 text-xs opacity-70">({cat.count})</span>
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Asymmetric Bento Grid */}
        <ScrollReveal delay={150}>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="wait">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: 'easeOut'
                  }}
                  className={`${service.gridSpan}`}
                >
                  <PremiumCard
                    icon={service.icon}
                    title={service.title}
                    tagline={service.tagline}
                    description={service.description}
                    features={service.features}
                    color={service.color}
                    onClick={() => setSelectedService(service)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </ScrollReveal>

        {/* CTA Banner */}
        <ScrollReveal delay={300} className="mt-20">
          <DoubleBevel glassEffect className="max-w-3xl">
            <div className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-light text-gray-950 -tracking-wider mb-3">
                Don't see what you need?
              </h3>
              <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                We build custom solutions. Schedule a free strategy call to discuss your specific challenges.
              </p>
              <Link to="/contact">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-950 text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  Get a Free Consultation
                  <ArrowRight size={18} weight="bold" />
                </motion.span>
              </Link>
            </div>
          </DoubleBevel>
        </ScrollReveal>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
