import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeSimpleIcon, PhoneIcon, MapPinIcon, PaperPlaneTiltIcon, CheckCircleIcon, CircleNotchIcon } from '@phosphor-icons/react';
import { insforge } from '../lib/insforge';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact — Xero Seven AI Agency';
  }, []);

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    business: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: { preventDefault(): void }) => {
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
      }

      setFormState('success');
      setFormData({ name: '', email: '', phone: '', business: '', service: '', message: '' });
    } catch {
      setFormState('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: 14,
    background: 'var(--card-bg)',
    border: '2.5px solid var(--charcoal)',
    borderRadius: 16,
    color: 'var(--text-body)',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: 10,
    letterSpacing: '0.12em',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: 8,
    display: 'block',
  };

  return (
    <div style={{ paddingTop: 0 }}>
      <section style={{ padding: '120px 16px 96px', position: 'relative' }}>
        <div style={{ maxWidth: 1152, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <h1 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 'clamp(40px, 6vw, 72px)',
                lineHeight: 0.92,
                color: 'var(--text-body)',
                marginTop: 16,
              }}>
                LET'S BUILD
                <br />
                <span style={{ color: 'var(--hero-accent)', WebkitTextStroke: '3px var(--charcoal)', paintOrder: 'stroke fill' }}>
                  YOUR AI SYSTEM.
                </span>
              </h1>
              <p style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontSize: 16, lineHeight: 1.65,
                color: 'var(--text-muted)', maxWidth: 520, marginTop: 20,
              }}>
                Tell us about your business and we'll design a custom AI automation plan. Free consultation, no commitment.
              </p>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
                {[
                  { icon: EnvelopeSimpleIcon, label: 'hello@xeroseven.ai' },
                  { icon: PhoneIcon, label: '+91 78691 61842' },
                  { icon: MapPinIcon, label: 'Indore, Madhya Pradesh, India' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: 'var(--card-alt)',
                      border: '2.5px solid var(--charcoal)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '2px 2px 0 var(--charcoal)',
                    }}>
                      <Icon weight="duotone" size={18} color="var(--charcoal)" />
                    </div>
                    <span style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontSize: 14, color: 'var(--text-body)',
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="gp-card" style={{ padding: '32px 28px' }}>
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      style={{ textAlign: 'center', padding: '48px 0' }}
                    >
                      <CheckCircleIcon weight="fill" size={64} color="var(--mint)" style={{ margin: '0 auto 16px' }} />
                      <h3 style={{
                        fontFamily: '"Archivo Black", sans-serif',
                        fontSize: 20, color: 'var(--text-body)', marginBottom: 8,
                      }}>
                        MESSAGE SENT!
                      </h3>
                      <p style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontSize: 14, color: 'var(--text-muted)',
                      }}>
                        We will get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setFormState('idle')}
                        className="gp-btn gp-btn-sm"
                        style={{ marginTop: 24 }}
                      >
                        SEND ANOTHER MESSAGE
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                        <div>
                          <label style={labelStyle}>YOUR NAME</label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={inputStyle}
                            placeholder="Rohit Kag"
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>EMAIL</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={inputStyle}
                            placeholder="rohit@example.com"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                        <div>
                          <label style={labelStyle}>PHONE</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={inputStyle}
                            placeholder="+91 78691 61842"
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>BUSINESS</label>
                          <input
                            type="text"
                            value={formData.business}
                            onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                            style={inputStyle}
                            placeholder="Your Clinic Name"
                          />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>SERVICE INTEREST</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          style={{ ...inputStyle, appearance: 'none' as const }}
                        >
                          <option value="">Select a service</option>
                          <option value="webdev">Website Development</option>
                          <option value="ecommerce">E-Commerce Store</option>
                          <option value="saas">Custom Software / App</option>
                          <option value="social_media">Social Media Management</option>
                          <option value="content">Content & SEO Marketing</option>
                          <option value="video">AI Video Production</option>
                          <option value="whatsapp">WhatsApp Business Automation</option>
                          <option value="leads">Lead Capture & Qualification</option>
                          <option value="appointments">Appointment Booking System</option>
                          <option value="support">Customer Support Bot</option>
                          <option value="automation">Business Process Automation</option>
                          <option value="photography">Photography & Video Production</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle}>MESSAGE</label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          style={{ ...inputStyle, resize: 'none' }}
                          placeholder="Tell us about your business and what you want to automate..."
                        />
                      </div>

                      {formState === 'error' && (
                        <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'var(--red)' }}>
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={formState === 'loading'}
                        whileHover={{ y: -2, boxShadow: '6px 6px 0 var(--charcoal)' }}
                        whileTap={{ scale: 0.97 }}
                        className="gp-btn-mustard"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                          width: '100%', padding: '16px 28px',
                          fontFamily: '"Archivo Black", sans-serif',
                          fontSize: 13, letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                          border: '3.5px solid var(--charcoal)',
                          borderRadius: 999, cursor: 'pointer',
                          boxShadow: '4px 4px 0 var(--charcoal)',
                        }}
                      >
                        {formState === 'loading' ? (
                          <>
                            <CircleNotchIcon weight="bold" size={16} className="animate-spin" />
                            SENDING...
                          </>
                        ) : (
                          <>
                            SEND MESSAGE
                            <PaperPlaneTiltIcon weight="fill" size={16} />
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
