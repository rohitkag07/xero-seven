import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightning, EnvelopeSimple, Phone, MapPin, PaperPlaneTilt, CheckCircle, CircleNotch } from '@phosphor-icons/react';
import { insforge } from '../lib/insforge';

const bentoVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.32, 0.72, 0, 1],
    },
  }),
};

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const { error } = await insforge.database.from('agency_messages').insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `[Business: ${formData.business}] [Service: ${formData.service}] ${formData.message}`,
      }]);

      if (error) throw error;

      // Trigger the AI Summoner Router Agent directly from frontend
      try {
        await fetch('https://xero-seven-summoner-989922711408.us-central1.run.app/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `[Business: ${formData.business}] [Service: ${formData.service}] ${formData.message}`
          })
        });
      } catch (agentError) {
        console.error("AI Agent trigger failed:", agentError);
        // We don't throw here so the user still sees the success message
      }

      setFormState('success');
      setFormData({ name: '', email: '', phone: '', business: '', service: '', message: '' });
    } catch {
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] relative overflow-hidden">
      {/* Ethereal mesh gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, 40, 0],
            x: [0, 20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
            bottom: '-20%',
            left: '-10%',
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <section className="section-padding pt-0 relative z-10">
        <div className="container-width">
          {/* Asymmetrical Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={bentoVariants as any}
              className="lg:col-span-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm mb-8">
                <Lightning weight="fill" className="w-3 h-3 text-accent" />
                <span className="text-[10px] text-accent uppercase tracking-[0.25em] font-semibold">Get in Touch</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white tracking-tighter mb-6 leading-tight">
                Let's Build Your<br />
                <span className="text-accent/60">AI System</span>
              </h1>
              <p className="text-base text-zinc-400 leading-relaxed max-w-[50ch] mb-12">
                Tell us about your business and we'll design a custom AI automation plan. Free consultation, no commitment.
              </p>

              <div className="space-y-5">
                {[
                  { icon: EnvelopeSimple, label: 'hello@xeroseven.ai' },
                  { icon: Phone, label: '+91 98765 43210' },
                  { icon: MapPin, label: 'Indore, Madhya Pradesh, India' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-zinc-400">
                      <Icon weight="regular" className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-zinc-300">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="p-1.5 rounded-4xl bg-white/[0.02] border border-white/5">
                <div className="rounded-[calc(2rem-0.375rem)] bg-surface-100 border border-white/5 p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <AnimatePresence mode="wait">
                    {formState === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="text-center py-12"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle weight="fill" className="w-16 h-16 text-accent mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                        <p className="text-sm text-zinc-400">We will get back to you within 24 hours.</p>
                        <button
                          onClick={() => setFormState('idle')}
                          className="mt-6 text-xs px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-colors"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">Your Name</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent/40 transition-colors"
                            placeholder="Rohit Kag"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">Email</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent/40 transition-colors"
                            placeholder="rohit@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">Phone</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent/40 transition-colors"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">Business</label>
                          <input
                            type="text"
                            value={formData.business}
                            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent/40 transition-colors"
                            placeholder="Your Clinic Name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">Service Interest</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-white focus:outline-none focus:border-accent/40 transition-colors appearance-none"
                        >
                          <option value="" className="bg-surface-100 text-zinc-400">Select a service</option>
                          <option value="webdev" className="bg-surface-100">Website Development</option>
                          <option value="ecommerce" className="bg-surface-100">E-Commerce Store</option>
                          <option value="saas" className="bg-surface-100">Custom Software / App</option>
                          <option value="social_media" className="bg-surface-100">Social Media Management</option>
                          <option value="content" className="bg-surface-100">Content & SEO Marketing</option>
                          <option value="video" className="bg-surface-100">AI Video Production</option>
                          <option value="whatsapp" className="bg-surface-100">WhatsApp Business Automation</option>
                          <option value="leads" className="bg-surface-100">Lead Capture & Qualification</option>
                          <option value="appointments" className="bg-surface-100">Appointment Booking System</option>
                          <option value="support" className="bg-surface-100">Customer Support Bot</option>
                          <option value="automation" className="bg-surface-100">Business Process Automation</option>
                          <option value="photography" className="bg-surface-100">Photography & Video Production</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs text-zinc-400 uppercase tracking-wider mb-2 block">Message</label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent/40 transition-colors resize-none"
                          placeholder="Tell us about your business and what you want to automate..."
                        />
                      </div>

                      {formState === 'error' && (
                        <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
                      )}

                      <button
                        type="submit"
                        disabled={formState === 'loading'}
                        className="btn-primary w-full justify-center"
                      >
                        {formState === 'loading' ? (
                          <>
                            <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <PaperPlaneTilt weight="fill" className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
