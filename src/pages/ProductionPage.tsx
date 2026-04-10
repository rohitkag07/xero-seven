import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Camera, VideoCamera, Drone, Sparkle, Image, FilmStrip,
  ArrowRight, CheckCircle, CurrencyInr
} from '@phosphor-icons/react';

const productionServices = [
  {
    icon: Camera,
    title: 'Product Photography',
    description: 'High-quality product shots for your e-commerce store, catalog, or social media. White background, lifestyle, or creative compositions — ready to sell.',
    features: ['E-commerce ready white background', 'Lifestyle & context shots', 'Multiple angles per product', '48-hour delivery', 'Basic retouching included', 'Web & print formats'],
    pricing: '₹500 – ₹2,000 per product',
    color: 'amber',
  },
  {
    icon: Sparkle,
    title: 'Brand Photography',
    description: 'Team headshots, office environment, founder portraits, and brand lifestyle imagery. Everything you need for your website, LinkedIn, and marketing materials.',
    features: ['Professional team headshots', 'Office & workspace photography', 'Founder portrait sessions', 'Brand lifestyle imagery', 'Social media optimized', 'Full retouching & color grading'],
    pricing: '₹5,000 – ₹25,000 per session',
    color: 'violet',
  },
  {
    icon: FilmStrip,
    title: 'Event Coverage',
    description: 'Corporate events, product launches, exhibitions, conferences, and celebrations. Full day coverage with same-day highlight reel delivery.',
    features: ['Full-day event coverage', 'Same-day highlight reel', 'Candid + staged shots', 'Video highlights (30-60s)', 'Online gallery delivery', 'Raw + edited files'],
    pricing: '₹10,000 – ₹35,000 per event',
    color: 'pink',
  },
  {
    icon: VideoCamera,
    title: 'Video Production',
    description: 'Promotional videos, testimonials, product demos, brand stories, and social media reels. Script to screen — we handle everything.',
    features: ['Script writing & storyboarding', 'Professional videography', 'Motion graphics & text', 'Background music & SFX', 'Multiple format delivery', 'Reels, YouTube, Ads formats'],
    pricing: '₹8,000 – ₹50,000 per video',
    color: 'blue',
  },
  {
    icon: Drone,
    title: 'Drone & Aerial',
    description: 'Stunning aerial photography and videography for real estate, construction sites, event venues, and brand campaigns. Licensed drone operators.',
    features: ['4K aerial video', 'High-res aerial stills', 'Licensed operators', 'Real estate walkthroughs', 'Construction progress shots', 'Event venue overviews'],
    pricing: '₹8,000 – ₹20,000 per session',
    color: 'cyan',
  },
  {
    icon: Image,
    title: 'Post-Production',
    description: 'Professional photo editing, video editing, color grading, retouching, and batch processing. We make your raw content look magazine-ready.',
    features: ['Advanced photo retouching', 'Video editing & cuts', 'Color grading & correction', 'Background removal', 'Batch processing', 'Rush delivery available'],
    pricing: '₹200 – ₹1,000 per image',
    color: 'emerald',
  },
];

const colorMap: Record<string, { icon: string; bg: string; border: string }> = {
  amber:   { icon: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/10' },
  violet:  { icon: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/10' },
  pink:    { icon: 'text-pink-400',    bg: 'bg-pink-500/10',    border: 'border-pink-500/10' },
  blue:    { icon: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/10' },
  cyan:    { icon: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/10' },
  emerald: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/10' },
};

export default function ProductionPage() {
  return (
    <div className="pt-8">
      <section className="section-padding pt-0">
        <div className="container-width">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 mb-6">
              <Camera weight="fill" className="w-3 h-3 text-violet-400" />
              <span className="text-[11px] text-violet-400 uppercase tracking-[0.2em] font-medium">Production Studio</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
              Photography &<br />
              <span className="text-zinc-500">Video Production</span>
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed max-w-[55ch]">
              Professional photography and videography for your brand, products, and events. 
              Our production team delivers magazine-quality visuals with fast turnaround.
            </p>
          </motion.div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productionServices.map((service, i) => {
              const colors = colorMap[service.color] || colorMap.amber;
              const [showPrice, setShowPrice] = useState(false);
              
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="h-full p-1.5 rounded-4xl bg-white/[0.02] border border-white/5">
                    <div className="h-full rounded-[calc(2rem-0.375rem)] bg-surface-100 border border-white/5 p-7 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] glass-panel-hover flex flex-col">
                      
                      {/* Icon + Title */}
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center ${colors.icon} mb-5`}>
                        <service.icon weight="duotone" className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                        {service.title}
                      </h3>
                      
                      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6 flex-1">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <CheckCircle weight="fill" className={`w-3.5 h-3.5 ${colors.icon} mt-0.5 shrink-0`} />
                            <span className="text-xs text-zinc-300">{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-surface-50 font-bold text-xs hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
                        >
                          Book Now
                          <ArrowRight weight="bold" className="w-3 h-3" />
                        </Link>
                        
                        <button
                          onClick={() => setShowPrice(!showPrice)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/5 text-xs font-medium text-zinc-400 hover:text-white hover:border-white/15 transition-all duration-300 cursor-pointer"
                        >
                          <CurrencyInr weight="bold" className="w-3 h-3" />
                          {showPrice ? 'Hide' : 'Price'}
                        </button>
                      </div>

                      {/* Price — hidden */}
                      <AnimatePresence>
                        {showPrice && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                              <p className="text-sm font-semibold text-white">{service.pricing}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="text-center mt-16"
          >
            <div className="p-1.5 rounded-4xl bg-white/[0.02] border border-white/5 max-w-2xl mx-auto">
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface-100 border border-white/5 p-10 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Need a Custom Package?</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  We create tailored production packages for recurring shoots, monthly content, and large-scale events.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-surface-50 font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300"
                >
                  Let's Discuss Your Project
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
