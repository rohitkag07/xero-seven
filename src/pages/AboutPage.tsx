import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Lightning, Globe, ShoppingCart, InstagramLogo, WhatsappLogo, Camera,
  Code, Cpu, VideoCamera, PenNib, ArrowRight
} from '@phosphor-icons/react';

// Editorial Luxury + Z-Axis Cascade animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
  },
};

const capabilities = [
  { icon: Globe, title: 'Web Development', desc: 'Premium websites & landing pages built with React, Next.js and modern frameworks.' },
  { icon: ShoppingCart, title: 'E-Commerce', desc: 'Complete online stores with UPI/card payments, inventory, and order tracking.' },
  { icon: InstagramLogo, title: 'Social Media', desc: 'Content creation, scheduling, analytics, and growth strategy across all platforms.' },
  { icon: WhatsappLogo, title: 'WhatsApp Automation', desc: 'AI-powered auto-replies, appointment booking, and customer follow-ups 24/7.' },
  { icon: Camera, title: 'Photography & Video', desc: 'Product photography, brand shoots, event coverage, and promotional videos.' },
  { icon: Code, title: 'Custom Software', desc: 'Full-stack app development — MVPs, SaaS platforms, and internal business tools.' },
  { icon: PenNib, title: 'Content & SEO', desc: 'Blog posts, social captions, newsletters, and keyword strategy for organic growth.' },
  { icon: VideoCamera, title: 'AI Video Production', desc: 'Programmatic video generation for social media ads, reels, and marketing campaigns.' },
  { icon: Cpu, title: 'Business Automation', desc: 'Connect all your software — Google Sheets, WhatsApp, email, CRM — into one flow.' },
];

const values = [
  {
    title: 'Technology-First Approach',
    description: 'We use the latest AI and automation tools to deliver faster, better, and more cost-effective results than traditional agencies.',
  },
  {
    title: 'Any Industry, Any Scale',
    description: 'From a single WhatsApp bot to a full enterprise platform — we serve healthcare, real estate, e-commerce, education, and more.',
  },
  {
    title: 'Speed That Matters',
    description: 'We ship working systems in days, not months. Start seeing results from week one.',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees, no lock-in contracts. You pay for what you use, and you own everything we build.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] via-[#FDFAF4] to-[#FAF8F4] relative overflow-hidden">
      {/* Editorial film-grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\"0 0 400 400\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" yfactor=\"0.5\"/%3E%3C/filter%3E%3Crect width=\"400\" height=\"400\" fill=\"%23000\" filter=\"url(%23noiseFilter)\"%3E%3C/rect%3E%3C/svg%3E")',
        backgroundSize: '200px 200px',
      }} />

      <section className="section-padding pt-0">
        <div className="container-width relative z-10">
          {/* Luxury Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            className="mb-24 max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-900/20 bg-amber-50/40 backdrop-blur-sm mb-8">
              <Lightning weight="fill" className="w-3 h-3 text-amber-700" />
              <span className="text-[10px] text-amber-900 uppercase tracking-[0.25em] font-semibold">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-[#2A1F1F] tracking-tight mb-6 leading-tight">
              Your Complete<br />
              <span className="text-amber-900/40">Digital Partner</span><br />
              in Indore
            </h1>
            <p className="text-lg text-[#4A3F3F] leading-relaxed max-w-[55ch] font-light">
              Xero Seven combines cutting-edge AI technology with creative expertise to help local businesses build their presence, automate operations, and grow revenue.
            </p>
          </motion.div>

          {/* Z-Axis Cascade: Founder + Values */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-28 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="p-1.5 rounded-4xl bg-white/[0.02] border border-white/5"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface-100 border border-white/5 p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <h3 className="text-xl font-semibold text-white tracking-tight mb-4">The Founder</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-accent">RK</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Rohit Kag</p>
                    <p className="text-sm text-accent">Founder & Lead Architect</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  Full-stack developer and AI specialist with deep experience in building 
                  production-grade web applications, e-commerce platforms, and intelligent 
                  automation systems. Passionate about using technology to help Indore 
                  businesses compete on a global stage.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AI/ML', 'Google Cloud', 'Photography', 'Video Production', 'UI/UX Design', 'SEO'].map((skill) => (
                    <span key={skill} className="text-[10px] text-zinc-400 px-2 py-1 rounded-full bg-white/3 border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="p-1.5 rounded-4xl bg-white/[0.02] border border-white/5"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface-100 border border-white/5 p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <h3 className="text-xl font-semibold text-white tracking-tight mb-6">Our Values</h3>
                <div className="space-y-6">
                  {values.map((v, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-xs text-accent/60 font-mono mt-1">0{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-white mb-1">{v.title}</p>
                        <p className="text-sm text-zinc-500 leading-relaxed">{v.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Our Capabilities — Replaces "AI Workforce" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-3">What We Do</h3>
              <h2 className="text-3xl font-bold text-white tracking-tighter">Our Capabilities</h2>
              <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
                From websites to WhatsApp bots, social media to software — 
                we've got every digital need of your business covered.
              </p>
            </div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {capabilities.map((cap) => (
                <motion.div
                  key={cap.title}
                  variants={itemVariants as any}
                >
                  <div className="h-full p-1.5 rounded-3xl bg-white/[0.02] border border-white/5">
                    <div className="h-full rounded-[calc(1.5rem-0.375rem)] bg-surface-100 border border-white/5 p-6 relative overflow-hidden group glass-panel-hover">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-[30px] -mr-10 -mt-10 group-hover:bg-accent/10 transition-colors" />
                      <cap.icon weight="duotone" className="w-7 h-7 text-accent mb-3" />
                      <h4 className="text-base font-semibold text-white mb-1.5">{cap.title}</h4>
                      <p className="text-xs text-zinc-500 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="p-1.5 rounded-4xl bg-white/[0.02] border border-white/5 max-w-2xl mx-auto">
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface-100 border border-white/5 p-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Grow Your Business?</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  Let's discuss how we can help your business build a powerful online presence.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-surface-50 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
                >
                  Get Free Consultation
                  <ArrowRight weight="bold" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
