import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FactoryIcon, BuildingsIcon, StorefrontIcon,
  FirstAidKitIcon, GraduationCapIcon, TruckIcon,
  XIcon, ArrowRightIcon,
} from '@phosphor-icons/react';

type Feature = { title: string; desc: string };
type Industry = {
  icon: React.ElementType;
  name: string;
  tagline: string;
  solution: string;
  metrics: { v: string; l: string }[];
  accentColor: string;
  modal: {
    pitch: string;
    features: Feature[];
    allMetrics: { v: string; l: string }[];
    cta: string;
  };
};

const industries: Industry[] = [
  {
    icon: FactoryIcon,
    name: 'Manufacturing & Distribution',
    tagline: 'Like we built for Kag Batteries',
    solution: 'Dealer Management System with GST billing, WhatsApp dispatch alerts, stock tracking, and a dealer portal — eliminating manual follow-ups across 100+ dealers.',
    metrics: [{ v: '100+', l: 'Dealers Automated' }, { v: '80%', l: 'Less Manual Work' }],
    accentColor: 'var(--mustard)',
    modal: {
      pitch: 'Replace your entire order-processing team with a system that never sleeps, never makes errors, and scales to 10,000+ dealers.',
      features: [
        { title: 'Dealer Portal', desc: 'Branded web portal where dealers log in, browse catalogue, place orders, and download invoices — no phone calls needed.' },
        { title: 'WhatsApp Order Bot', desc: 'Dealers order via WhatsApp. System confirms, creates GST invoice, and triggers dispatch automatically — under 2 minutes.' },
        { title: 'GST & E-Way Bills', desc: 'Auto-generate compliant GST invoices and e-way bills on every order. Zero manual entry, 100% compliance.' },
        { title: 'Live Stock Dashboard', desc: 'Real-time inventory visible to factory managers and dealers. No more "is stock available?" calls at 9 PM.' },
      ],
      allMetrics: [
        { v: '100+', l: 'Dealers Automated' }, { v: '80%', l: 'Less Manual Work' },
        { v: '₹0', l: 'Billing Errors' }, { v: '24/7', l: 'Order Processing' },
      ],
      cta: 'GET YOUR DMS BUILT',
    },
  },
  {
    icon: BuildingsIcon,
    name: 'Real Estate & Builders',
    tagline: 'Never miss a hot lead again',
    solution: 'Ghost Closer AI qualifies every inquiry on WhatsApp and Insta DMs, schedules site visits, sends follow-up reminders, and syncs all leads into a CRM — while your team sleeps.',
    metrics: [{ v: '3×', l: 'More Site Visits' }, { v: '11→3d', l: 'Sales Cycle' }],
    accentColor: 'var(--red)',
    modal: {
      pitch: 'Your best salesperson, cloned into an AI that qualifies 100 leads simultaneously — at 3 AM, on a Sunday, during Diwali.',
      features: [
        { title: 'Ghost Closer AI', desc: 'Responds to every WhatsApp/Instagram inquiry within 90 seconds, asks qualifying questions, and scores buyer intent.' },
        { title: 'Site Visit Booking', desc: 'Automatically schedules visits based on buyer availability, sends confirmation, directions, and reminders via WhatsApp.' },
        { title: 'Follow-Up Engine', desc: 'Warm leads get personalized follow-ups every 3 days. Cold leads are re-engaged automatically at the right moment.' },
        { title: 'CRM Auto-Sync', desc: 'Full conversation transcript, lead score, and contact details pushed to your CRM without any manual data entry.' },
      ],
      allMetrics: [
        { v: '3×', l: 'More Site Visits' }, { v: '11→3d', l: 'Sales Cycle' },
        { v: '90s', l: 'First Response' }, { v: '100%', l: 'Leads Captured' },
      ],
      cta: 'DEPLOY GHOST CLOSER',
    },
  },
  {
    icon: StorefrontIcon,
    name: 'E-Commerce & Retail',
    tagline: 'Full-stack digital commerce',
    solution: 'Custom online store with UPI/Card checkout, automated inventory sync, abandoned cart recovery via WhatsApp, and a social media AI that posts daily and drives traffic 24/7.',
    metrics: [{ v: '42%', l: 'Higher Conversions' }, { v: '24/7', l: 'Automated Marketing' }],
    accentColor: 'var(--purple)',
    modal: {
      pitch: 'A store that sells, markets, and recovers lost customers — 24 hours a day, without a single extra hire.',
      features: [
        { title: 'Custom E-Commerce Store', desc: 'UPI/Card/BNPL checkout, GST invoicing, mobile-first design built specifically for Indian shoppers.' },
        { title: 'WhatsApp Cart Recovery', desc: 'When a customer abandons their cart, they get a personalized WhatsApp with their items and a timed discount offer.' },
        { title: 'Social Media AI', desc: 'Daily Instagram + Facebook posts auto-generated from your products — trend-aware, brand-consistent, fully scheduled.' },
        { title: 'Inventory Intelligence', desc: 'Real-time stock sync across your website, WhatsApp catalogue, and retail POS — zero overselling.' },
      ],
      allMetrics: [
        { v: '42%', l: 'Higher Conversions' }, { v: '60%', l: 'Less Abandonment' },
        { v: '24/7', l: 'Auto Marketing' }, { v: '3×', l: 'Faster Orders' },
      ],
      cta: 'LAUNCH YOUR STORE',
    },
  },
  {
    icon: FirstAidKitIcon,
    name: 'Healthcare & Clinics',
    tagline: 'Patients booked, staff freed',
    solution: 'WhatsApp bot handles appointment bookings, prescription reminders, test result delivery, and patient FAQs in Hindi + English — reducing reception calls by 70%.',
    metrics: [{ v: '70%', l: 'Fewer Calls' }, { v: '24/7', l: 'Patient Support' }],
    accentColor: 'var(--mustard)',
    modal: {
      pitch: 'Your front desk, pharmacy reminder system, and patient follow-up team — automated into one WhatsApp bot.',
      features: [
        { title: 'Appointment Bot', desc: 'Patients book, reschedule, or cancel appointments via WhatsApp in Hindi/English — no hold music, no waiting.' },
        { title: 'Rx & Lab Results', desc: 'Prescription images and lab reports delivered securely to patient WhatsApp. No more clinic visits just for results.' },
        { title: 'Smart Reminders', desc: 'Automated appointment reminders at 24hrs and 2hrs. No-shows trigger an automatic rescheduling prompt.' },
        { title: 'Post-Visit Follow-Up', desc: 'After each visit, patients receive health tips, medication schedules, and a review request — all automated.' },
      ],
      allMetrics: [
        { v: '70%', l: 'Fewer Calls' }, { v: '40%', l: 'No-Shows Cut' },
        { v: '24/7', l: 'Patient Support' }, { v: '5×', l: 'Faster Booking' },
      ],
      cta: 'AUTOMATE YOUR CLINIC',
    },
  },
  {
    icon: GraduationCapIcon,
    name: 'Education & Ed-Tech',
    tagline: 'Enroll more. Teach better.',
    solution: 'Student portal with live class integration, automated fee reminders via WhatsApp, AI doubt-solver chatbot, and performance dashboards for teachers — all under your brand.',
    metrics: [{ v: '60%', l: 'Faster Enrollment' }, { v: '2×', l: 'Student Retention' }],
    accentColor: 'var(--red)',
    modal: {
      pitch: 'Enroll more students, collect fees on time, and deliver 24/7 academic support — without hiring more staff.',
      features: [
        { title: 'Online Enrollment Portal', desc: 'Digital admission forms with document upload, eligibility check, and instant fee payment — fully branded.' },
        { title: 'Fee Collection Bot', desc: 'Automated WhatsApp reminders with Razorpay payment link. Escalation messages to parents if unpaid after deadline.' },
        { title: 'AI Doubt Solver', desc: 'Chatbot trained on your syllabus answers student questions 24/7 in Hindi and English — reducing teacher load.' },
        { title: 'Teacher Dashboard', desc: 'Real-time attendance tracking, assignment scores, and per-student progress analytics in one dashboard.' },
      ],
      allMetrics: [
        { v: '60%', l: 'Faster Enrollment' }, { v: '2×', l: 'Student Retention' },
        { v: '80%', l: 'Fewer Fee Defaults' }, { v: '24/7', l: 'Academic Support' },
      ],
      cta: 'BUILD YOUR EDTECH',
    },
  },
  {
    icon: TruckIcon,
    name: 'Logistics & Transport',
    tagline: 'Track everything. Automate billing.',
    solution: 'Fleet tracking dashboard with driver WhatsApp bots, automatic e-way bill generation, client delivery notifications, and daily trip reports pushed to your phone.',
    metrics: [{ v: '90%', l: 'On-Time Delivery' }, { v: '0', l: 'Manual Billing' }],
    accentColor: 'var(--purple)',
    modal: {
      pitch: 'From dispatch to delivery — every truck tracked, every bill generated, every client notified. Automatically.',
      features: [
        { title: 'Fleet Tracking', desc: 'Real-time GPS dashboard with driver WhatsApp bots for status updates, delays, and route confirmations.' },
        { title: 'E-Way Bill Engine', desc: 'Auto-generate GST e-way bills at dispatch. Zero manual data entry, 100% tax compliance on every trip.' },
        { title: 'Client Notifications', desc: 'Customers get WhatsApp/SMS updates on dispatch, transit, and delivery — eliminating "where is my order?" calls.' },
        { title: 'Daily Trip Reports', desc: 'Automated end-of-day summaries pushed to your phone: deliveries completed, delays, fuel costs, exceptions.' },
      ],
      allMetrics: [
        { v: '90%', l: 'On-Time Delivery' }, { v: '0', l: 'Manual Billing' },
        { v: '100%', l: 'GST Compliance' }, { v: '3×', l: 'Client Satisfaction' },
      ],
      cta: 'TRACK YOUR FLEET',
    },
  },
];

function IndustryModal({ industry, onClose }: { industry: Industry; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(26,26,26,0.75)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bone)',
          border: '3.5px solid var(--charcoal)',
          borderRadius: 32,
          boxShadow: '10px 10px 0 var(--charcoal)',
          maxWidth: 760, width: '100%',
          maxHeight: '90vh', overflowY: 'auto',
          padding: '36px',
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: industry.accentColor, border: '3px solid var(--charcoal)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '3px 3px 0 var(--charcoal)',
            }}>
              <industry.icon weight="bold" size={26} color="var(--charcoal)" />
            </div>
            <div>
              <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 15, color: 'var(--charcoal)', letterSpacing: '0.02em' }}>
                {industry.name.toUpperCase()}
              </div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.1em', color: 'var(--charcoal)', opacity: 0.5 }}>
                {industry.tagline.toUpperCase()}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--charcoal)', border: '2.5px solid var(--charcoal)',
              borderRadius: 10, padding: '6px', cursor: 'pointer',
              color: 'var(--bone)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}
          >
            <XIcon weight="bold" size={18} />
          </button>
        </div>

        {/* Pitch */}
        <p style={{
          fontFamily: '"Archivo Black", sans-serif',
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          lineHeight: 1.25, color: 'var(--charcoal)',
          marginBottom: 28,
        }}>
          {industry.modal.pitch}
        </p>

        {/* Features 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: 24 }}>
          {industry.modal.features.map((f) => (
            <div key={f.title} style={{
              background: 'var(--cream)',
              border: '2.5px solid var(--charcoal)',
              borderRadius: 18, padding: '18px 20px',
              boxShadow: '4px 4px 0 var(--charcoal)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
              }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: industry.accentColor,
                  border: '1.5px solid var(--charcoal)',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: '"Archivo Black", sans-serif', fontSize: 11,
                  color: 'var(--charcoal)', letterSpacing: '0.04em',
                }}>
                  {f.title.toUpperCase()}
                </span>
              </div>
              <p style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 12.5,
                lineHeight: 1.6, color: 'var(--charcoal)', opacity: 0.7, margin: 0,
              }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* All metrics strip */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap',
          background: industry.accentColor,
          border: '2.5px solid var(--charcoal)',
          borderRadius: 18, padding: '16px 20px',
          boxShadow: '4px 4px 0 var(--charcoal)',
          marginBottom: 28,
        }}>
          {industry.modal.allMetrics.map((m) => (
            <div key={m.l} style={{ flex: '1 1 80px' }}>
              <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 24, color: 'var(--charcoal)', lineHeight: 1 }}>
                {m.v}
              </div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.08em', color: 'var(--charcoal)', opacity: 0.65, marginTop: 3 }}>
                {m.l.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to="/contact" style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ y: -2, boxShadow: '6px 6px 0 var(--charcoal)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'var(--charcoal)', color: 'var(--bone)',
              border: '3px solid var(--charcoal)', borderRadius: 999,
              padding: '14px 28px',
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
              boxShadow: '4px 4px 0 rgba(26,26,26,0.25)',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            {industry.modal.cta}
            <ArrowRightIcon weight="bold" size={14} />
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  const [selected, setSelected] = useState<Industry | null>(null);

  return (
    <section style={{ padding: '96px 24px', background: 'var(--section-alt)', position: 'relative' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 56 }}
        >
          <span style={{
            background: 'var(--charcoal)', color: 'var(--bone)',
            fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
            fontWeight: 700, letterSpacing: '0.1em', padding: '5px 14px',
            borderRadius: 999, border: '2px solid var(--charcoal)',
            display: 'inline-block', marginBottom: 20,
          }}>
            ◆ SECTION 05 • INDUSTRIES WE TRANSFORM
          </span>
          <h2 style={{
            fontFamily: '"Archivo Black", sans-serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            lineHeight: 0.95, color: 'var(--text-body)', margin: 0,
          }}>
            REAL PROBLEMS.
            <br />
            <span style={{ color: 'var(--hero-accent)', WebkitTextStroke: '3px var(--charcoal)', paintOrder: 'stroke fill' }}>
              MEASURABLE ROI.
            </span>
          </h2>
          <p style={{
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)',
            maxWidth: 520, marginTop: 20,
          }}>
            We don't do generic solutions. Every vertical has a proven playbook — built from real deployments with Indian businesses like yours.{' '}
            <span style={{ color: 'var(--charcoal)', fontWeight: 700 }}>Tap any card to see the full playbook.</span>
          </p>
        </motion.div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, idx) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.32, 0.72, 0, 1] }}
            >
              <motion.div
                onClick={() => setSelected(industry)}
                whileHover={{ y: -5, boxShadow: '10px 10px 0 var(--charcoal)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                style={{
                  background: 'var(--card-bg)',
                  border: '3.5px solid var(--charcoal)',
                  borderRadius: 28, padding: 28,
                  display: 'flex', flexDirection: 'column', gap: 16,
                  boxShadow: '6px 6px 0 var(--charcoal)',
                  height: '100%', cursor: 'pointer',
                }}
              >
                {/* Icon + name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 16,
                    background: industry.accentColor, border: '3px solid var(--charcoal)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, boxShadow: '3px 3px 0 var(--charcoal)',
                  }}>
                    <industry.icon weight="bold" size={24} color="var(--charcoal)" />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: '"Archivo Black", sans-serif',
                      fontSize: 14, letterSpacing: '0.02em',
                      color: 'var(--text-body)', margin: 0,
                    }}>
                      {industry.name.toUpperCase()}
                    </h3>
                    <span style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 9, letterSpacing: '0.08em', color: 'var(--text-muted)',
                    }}>
                      {industry.tagline.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Solution */}
                <p style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontSize: 13, lineHeight: 1.65, color: 'var(--text-muted)', flex: 1,
                }}>
                  {industry.solution}
                </p>

                {/* Metrics + tap hint */}
                <div>
                  <div style={{
                    display: 'flex', gap: 12,
                    background: industry.accentColor,
                    border: '2.5px solid var(--charcoal)',
                    borderRadius: 16, padding: '12px 16px',
                    boxShadow: '3px 3px 0 var(--charcoal)',
                    marginBottom: 10,
                  }}>
                    {industry.metrics.map((m) => (
                      <div key={m.l} style={{ flex: 1 }}>
                        <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 22, color: 'var(--charcoal)', lineHeight: 1 }}>
                          {m.v}
                        </div>
                        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.08em', color: 'var(--charcoal)', opacity: 0.7, marginTop: 2 }}>
                          {m.l.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                    letterSpacing: '0.08em', color: 'var(--charcoal)', opacity: 0.4,
                  }}>
                    TAP FOR FULL PLAYBOOK <ArrowRightIcon weight="bold" size={10} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <IndustryModal industry={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
