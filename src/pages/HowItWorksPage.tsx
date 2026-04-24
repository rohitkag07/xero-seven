import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LightningIcon, CheckIcon } from '@phosphor-icons/react';

const agents = [
  {
    id: 'summoner',
    tag: '◈ THE BRAIN',
    name: 'SUMMONER',
    subtitle: 'Intelligent Task Router',
    color: 'var(--purple)',
    textColor: 'var(--bone)',
    description:
      'The Summoner is your AI Chief of Staff. When a task arrives — a lead, a message, a trigger — it decides which agent handles it, in what order, with what data. It maintains context across every interaction so nothing falls through the cracks.',
    capabilities: [
      'Multi-step task decomposition',
      'Agent selection & orchestration',
      'Context memory across sessions',
      'Priority queue management',
      'Human-in-the-loop escalation',
      'Real-time execution monitoring',
    ],
    metric: { v: '<200ms', l: 'Routing Latency' },
  },
  {
    id: 'gateway',
    tag: '◈ THE HANDS',
    name: 'TOOL GATEWAY',
    subtitle: '340+ Native Integrations',
    color: 'var(--mustard)',
    textColor: 'var(--charcoal)',
    description:
      'The Gateway executes. It connects to every tool your business uses — WhatsApp, Gmail, CRM, payment gateways, ERPs — and performs actions on command. Send a message, create an invoice, update a database, book a calendar slot. One protocol, unlimited power.',
    capabilities: [
      'WhatsApp Business API',
      'Gmail & email automation',
      'Razorpay / Stripe payments',
      'Google Sheets & Docs',
      'Notion, Linear, Slack',
      'Custom REST API webhooks',
    ],
    metric: { v: '340+', l: 'Native Tools' },
  },
  {
    id: 'scholar',
    tag: '◈ THE MEMORY',
    name: 'SCHOLAR RAG',
    subtitle: 'Retrieval-Augmented Intelligence',
    color: 'var(--red)',
    textColor: 'var(--bone)',
    description:
      'Scholar is the knowledge engine. It ingests your product catalogue, client history, SOPs, and business rules — then retrieves the exact right context at the right moment. Your agents don\'t hallucinate; they answer from verified business data.',
    capabilities: [
      'Vector database (business knowledge)',
      'Product & pricing catalogue',
      'Client history & preferences',
      'SOP & process documentation',
      'Real-time inventory sync',
      'Multilingual (Hindi + English)',
    ],
    metric: { v: '98%', l: 'Answer Accuracy' },
  },
  {
    id: 'ghost-closer',
    tag: '◈ THE HUNTER',
    name: 'GHOST CLOSER',
    subtitle: 'Autonomous Revenue Agent',
    color: 'var(--bone)',
    textColor: 'var(--charcoal)',
    description:
      'Ghost Closer runs your entire outbound sales motion 24/7. It finds prospects on LinkedIn and Justdial, sends hyper-personalized messages, qualifies via WhatsApp conversation, handles objections using Scholar\'s knowledge, and books a meeting in your calendar — all without human intervention.',
    capabilities: [
      'LinkedIn + Justdial prospecting',
      'AI-personalized outreach sequences',
      'Real-time WhatsApp qualification',
      'Objection handling via Scholar',
      'Calendar booking & confirmation',
      'CRM sync + deal pipeline update',
    ],
    metric: { v: '11→3d', l: 'Sales Cycle' },
  },
];

const flowSteps = [
  {
    n: '01',
    title: 'TRIGGER',
    desc: 'A lead fills a form, sends a WhatsApp, or visits your site. The Summoner wakes up.',
    color: 'var(--mustard)',
  },
  {
    n: '02',
    title: 'ROUTE',
    desc: 'Summoner identifies the intent, scores the lead, and assigns the right agent or sequence.',
    color: 'var(--purple)',
  },
  {
    n: '03',
    title: 'RETRIEVE',
    desc: 'Scholar fetches relevant context — product info, client history, pricing — from your knowledge base.',
    color: 'var(--red)',
  },
  {
    n: '04',
    title: 'EXECUTE',
    desc: 'The Tool Gateway performs actions: sends WhatsApp reply, updates CRM, creates invoice, books calendar.',
    color: 'var(--mustard)',
  },
  {
    n: '05',
    title: 'LEARN',
    desc: 'Every interaction is logged. Scholar updates its knowledge. Ghost Closer refines its sequences.',
    color: 'var(--purple)',
  },
  {
    n: '06',
    title: 'REPORT',
    desc: 'Your dashboard shows everything in real-time. Escalations come to you only when needed.',
    color: 'var(--red)',
  },
];

const useCases = [
  {
    title: 'A dealer places an order at 11 PM',
    flow: ['WhatsApp message received', 'Summoner routes → Gateway', 'Scholar checks stock levels', 'Invoice auto-generated', 'GST e-way bill created', 'Dispatch alert sent to driver'],
    outcome: 'Order processed. No human involved.',
    color: 'var(--mustard)',
  },
  {
    title: 'A real estate lead clicks an ad',
    flow: ['Form submitted on site', 'Ghost Closer scores lead (high intent)', 'Personalized WhatsApp sent in 90 seconds', 'Qualification conversation happens', 'Site visit booked in calendar', 'CRM updated with full transcript'],
    outcome: 'Hot lead → Meeting in 4 minutes.',
    color: 'var(--red)',
  },
  {
    title: 'A patient wants an appointment',
    flow: ['WhatsApp: "Need appt tomorrow"', 'Scholar checks available slots', 'Bot confirms time in Hindi', 'Reminder sent 2 hrs before', 'Post-visit follow-up triggered', 'Review request sent 24 hrs later'],
    outcome: 'Full patient lifecycle automated.',
    color: 'var(--purple)',
  },
];

export default function HowItWorksPage() {
  useEffect(() => {
    document.title = 'How It Works — Xero Seven AI Agency';
  }, []);

  return (
    <div style={{ background: 'var(--page-bg)' }}>

      {/* ── HERO BAND ─────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--mustard)',
          padding: 'clamp(110px, 12vh, 130px) 24px 72px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(26,26,26,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px', pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{
              background: 'var(--charcoal)', color: 'var(--bone)',
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', padding: '5px 16px', borderRadius: 999,
              border: '2px solid var(--charcoal)', display: 'inline-block', marginBottom: 24,
            }}>
              ◈ TECHNICAL ARCHITECTURE · V7.02
            </span>
            <h1 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(44px, 7vw, 96px)',
              lineHeight: 0.95, color: 'var(--charcoal)', margin: '0 0 24px',
            }}>
              INSIDE THE<br />
              <span style={{
                color: 'var(--purple)',
                WebkitTextStroke: '3px var(--charcoal)',
                paintOrder: 'stroke fill',
              }}>
                MACHINE.
              </span>
            </h1>
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 17, lineHeight: 1.7,
              color: 'var(--charcoal)', opacity: 0.75, maxWidth: 600, margin: '0 auto 32px',
            }}>
              This is not a chatbot. This is a fully autonomous multi-agent system that replaces entire departments — built on the same architecture used by the world's most advanced AI companies.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: '5px 5px 0 var(--purple)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'var(--charcoal)', color: 'var(--bone)',
                    border: '3px solid var(--charcoal)', borderRadius: 999,
                    padding: '14px 28px', fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
                    boxShadow: '4px 4px 0 rgba(26,26,26,0.3)',
                  }}
                >
                  <LightningIcon weight="duotone" size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }} /> DEPLOY YOUR SWARM
                </motion.button>
              </Link>
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'transparent', color: 'var(--charcoal)',
                    border: '3px solid rgba(26,26,26,0.35)', borderRadius: 999,
                    padding: '14px 28px', fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 12, letterSpacing: '0.08em', cursor: 'pointer',
                  }}
                >
                  VIEW ALL SERVICES ↗
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ARCHITECTURE OVERVIEW ─────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--section-alt)', borderBottom: '3px solid var(--charcoal)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 48 }}
          >
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--charcoal)', opacity: 0.5,
              display: 'block', marginBottom: 12,
            }}>
              SYSTEM OVERVIEW
            </span>
            <h2 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: 'var(--charcoal)', lineHeight: 0.95, margin: 0,
            }}>
              FOUR AGENTS.<br />
              <span style={{
                color: 'var(--red)',
                WebkitTextStroke: '3px var(--charcoal)',
                paintOrder: 'stroke fill',
              }}>ONE SYSTEM.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, idx) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -4, boxShadow: '10px 10px 0 var(--charcoal)' }}
                  style={{
                    background: agent.color, border: '3.5px solid var(--charcoal)',
                    borderRadius: 28, padding: 32,
                    boxShadow: '6px 6px 0 var(--charcoal)',
                    height: '100%', display: 'flex', flexDirection: 'column', gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                        fontWeight: 700, letterSpacing: '0.14em',
                        color: agent.textColor, opacity: 0.7,
                      }}>
                        {agent.tag}
                      </span>
                      <h3 style={{
                        fontFamily: '"Archivo Black", sans-serif',
                        fontSize: 32, color: agent.textColor,
                        margin: '6px 0 4px', lineHeight: 1,
                      }}>
                        {agent.name}
                      </h3>
                      <p style={{
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                        color: agent.textColor, opacity: 0.65, letterSpacing: '0.06em',
                      }}>
                        {agent.subtitle.toUpperCase()}
                      </p>
                    </div>
                    <div style={{
                      textAlign: 'right',
                      background: 'rgba(0,0,0,0.15)',
                      border: `2px solid ${agent.textColor === 'var(--bone)' ? 'rgba(253,245,228,0.25)' : 'rgba(26,26,26,0.2)'}`,
                      borderRadius: 14, padding: '10px 14px',
                    }}>
                      <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 22, color: agent.textColor, lineHeight: 1 }}>{agent.metric.v}</div>
                      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 8, color: agent.textColor, opacity: 0.65, letterSpacing: '0.08em', marginTop: 2 }}>{agent.metric.l.toUpperCase()}</div>
                    </div>
                  </div>

                  <p style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 14,
                    lineHeight: 1.65, color: agent.textColor, opacity: 0.85,
                  }}>
                    {agent.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                    {agent.capabilities.map((cap) => (
                      <span key={cap} style={{
                        fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                        letterSpacing: '0.06em', color: agent.textColor,
                        background: 'rgba(0,0,0,0.15)',
                        border: `1.5px solid ${agent.textColor === 'var(--bone)' ? 'rgba(253,245,228,0.2)' : 'rgba(26,26,26,0.15)'}`,
                        borderRadius: 999, padding: '4px 10px',
                      }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXECUTION FLOW ────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--page-bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--charcoal)', opacity: 0.5,
              display: 'block', marginBottom: 12,
            }}>
              EXECUTION PIPELINE
            </span>
            <h2 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: 'var(--charcoal)', lineHeight: 0.95, margin: 0,
            }}>
              WHAT HAPPENS IN<br />
              <span style={{ color: 'var(--purple)', WebkitTextStroke: '3px var(--charcoal)', paintOrder: 'stroke fill' }}>
                60 SECONDS.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {flowSteps.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div style={{
                  background: 'var(--card-bg)', border: '3.5px solid var(--charcoal)',
                  borderRadius: 24, padding: 24,
                  boxShadow: '5px 5px 0 var(--charcoal)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: 11,
                      background: step.color, color: 'var(--charcoal)',
                      border: '2px solid var(--charcoal)', borderRadius: 999,
                      padding: '3px 10px', boxShadow: '2px 2px 0 var(--charcoal)',
                    }}>
                      STEP {step.n}
                    </span>
                    <span style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: 14,
                      color: 'var(--text-body)', letterSpacing: '0.04em',
                    }}>
                      {step.title}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 13,
                    lineHeight: 1.65, color: 'var(--text-muted)', margin: 0,
                  }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REAL-WORLD PLAYBOOKS ──────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--section-alt)', borderTop: '3px solid var(--charcoal)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: 48 }}
          >
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.1em', color: 'var(--charcoal)', opacity: 0.5,
              display: 'block', marginBottom: 12,
            }}>
              LIVE PLAYBOOKS
            </span>
            <h2 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: 'var(--charcoal)', lineHeight: 0.95, margin: 0,
            }}>
              SEE IT IN ACTION.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {useCases.map((uc, idx) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div style={{
                  background: 'var(--card-bg)', border: '3.5px solid var(--charcoal)',
                  borderRadius: 28, overflow: 'hidden',
                  boxShadow: '6px 6px 0 var(--charcoal)', height: '100%',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* Title bar */}
                  <div style={{ background: uc.color, padding: '16px 20px', borderBottom: '3px solid var(--charcoal)' }}>
                    <span style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: 13,
                      color: 'var(--charcoal)', lineHeight: 1.3,
                      display: 'block',
                    }}>
                      {uc.title.toUpperCase()}
                    </span>
                  </div>
                  {/* Flow steps */}
                  <div style={{ padding: '20px', flex: 1 }}>
                    {uc.flow.map((step, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        marginBottom: i < uc.flow.length - 1 ? 10 : 0,
                      }}>
                        <div style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          flexShrink: 0, marginTop: 3,
                        }}>
                          <div style={{
                            width: 18, height: 18, borderRadius: '50%',
                            background: uc.color, border: '2px solid var(--charcoal)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: '"Archivo Black", sans-serif', fontSize: 8,
                            color: 'var(--charcoal)',
                          }}>
                            {i + 1}
                          </div>
                          {i < uc.flow.length - 1 && (
                            <div style={{ width: 2, height: 10, background: 'var(--charcoal)', opacity: 0.15, marginTop: 2 }} />
                          )}
                        </div>
                        <span style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 12,
                          lineHeight: 1.5, color: 'var(--text-body)',
                        }}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Outcome */}
                  <div style={{
                    padding: '14px 20px', borderTop: '2.5px solid var(--charcoal)',
                    background: uc.color,
                  }}>
                    <span style={{
                      fontFamily: '"Archivo Black", sans-serif', fontSize: 12,
                      color: 'var(--charcoal)', letterSpacing: '0.04em',
                    }}>
                      <CheckIcon weight="bold" size={13} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }} />{uc.outcome.toUpperCase()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH SPECS ────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--page-bg)', borderTop: '3px solid var(--charcoal)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.1em', color: 'var(--charcoal)', opacity: 0.5,
                display: 'block', marginBottom: 12,
              }}>
                INFRASTRUCTURE
              </span>
              <h2 style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 'clamp(28px, 4vw, 48px)',
                color: 'var(--charcoal)', lineHeight: 0.95, margin: '0 0 20px',
              }}>
                BUILT FOR<br />
                <span style={{ color: 'var(--mustard)', WebkitTextStroke: '3px var(--charcoal)', paintOrder: 'stroke fill' }}>
                  INDIAN SCALE.
                </span>
              </h2>
              <p style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 15,
                lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 460,
              }}>
                Deployed on Google Cloud Run — auto-scaling from 1 to 10,000 requests per second. Data stays in India (us-central1 / asia-south1). Fully DPDP-compliant.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { v: 'Google Cloud Run', l: 'Infrastructure', color: 'var(--mustard)' },
                { v: 'InsForge BaaS', l: 'Database & Auth', color: 'var(--purple)' },
                { v: 'Claude + GPT-4', l: 'AI Models', color: 'var(--red)' },
                { v: 'n8n + Zapier', l: 'Automation Layer', color: 'var(--charcoal)' },
                { v: 'WhatsApp API', l: 'Messaging', color: 'var(--mustard)' },
                { v: 'DPDP Compliant', l: 'Data Privacy', color: 'var(--purple)' },
              ].map((item) => (
                <div key={item.l} style={{
                  background: 'var(--card-bg)', border: '3px solid var(--charcoal)',
                  borderRadius: 18, padding: '16px 18px',
                  boxShadow: '4px 4px 0 var(--charcoal)',
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: item.color, marginBottom: 8,
                    border: '1.5px solid var(--charcoal)',
                  }} />
                  <div style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 13, color: 'var(--text-body)', marginBottom: 2 }}>
                    {item.v}
                  </div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                    {item.l.toUpperCase()}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px', background: 'var(--mustard)', borderTop: '3px solid var(--charcoal)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.12em', color: 'var(--charcoal)', opacity: 0.7,
              display: 'block', marginBottom: 20,
            }}>
              ◈ READY TO DEPLOY
            </span>
            <h2 style={{
              fontFamily: '"Archivo Black", sans-serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 0.95, color: 'var(--charcoal)', margin: '0 0 20px',
            }}>
              COMMAND YOUR<br />
              <span style={{ color: 'var(--purple)', WebkitTextStroke: '3px var(--charcoal)', paintOrder: 'stroke fill' }}>
                GALAXY.
              </span>
            </h2>
            <p style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 16,
              lineHeight: 1.7, color: 'var(--charcoal)', opacity: 0.75,
              maxWidth: 520, margin: '0 auto 32px',
            }}>
              Your competitors hire people. You deploy swarms. Launch Xero Seven in under 60 seconds and let the agents run your growth.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: '5px 5px 0 var(--purple)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'var(--charcoal)', color: 'var(--bone)',
                    border: '3px solid var(--charcoal)', borderRadius: 999,
                    padding: '16px 32px', fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 13, letterSpacing: '0.08em', cursor: 'pointer',
                    boxShadow: '4px 4px 0 rgba(26,26,26,0.3)',
                  }}
                >
                  <LightningIcon weight="duotone" size={14} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6 }} /> BOOK A FREE STRATEGY CALL
                </motion.button>
              </Link>
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'transparent', color: 'var(--charcoal)',
                    border: '3px solid rgba(26,26,26,0.35)', borderRadius: 999,
                    padding: '16px 32px', fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 13, letterSpacing: '0.08em', cursor: 'pointer',
                  }}
                >
                  SEE ALL SERVICES ↗
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
