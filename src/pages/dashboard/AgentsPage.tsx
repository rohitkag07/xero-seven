import { useState, useEffect, useCallback } from 'react';
import { Robot, TerminalWindow, IdentificationBadge, ChartLineUp, Database, Play, CheckCircle, ArrowClockwise, Cpu, Timer, Broadcast } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface AgentDef {
  id: string;
  name: string;
  icon: React.ReactNode;
  desc: string;
  endpoint: string;
  healthUrl: string;
  testPayload: Record<string, unknown>;
  category: string;
}

interface AgentHealth {
  status: 'online' | 'offline' | 'checking';
  uptime_seconds?: number;
  latency_ms?: number;
  last_checked?: Date;
}

const AGENTS: AgentDef[] = [
  {
    id: 'summoner', name: 'Summoner (Router)', icon: <Broadcast />, desc: 'Classifies, scores & routes incoming leads. Central entry point.', category: 'Core',
    endpoint: 'https://xero-seven-summoner-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-summoner-989922711408.us-central1.run.app/health',
    testPayload: { name: 'Test Admin', email: 'test@xeroseven.ai', phone: '9999999999', message: 'I want to build an AI-powered SaaS platform.' }
  },
  {
    id: 'meta', name: 'Meta Brain (CEO)', icon: <Cpu />, desc: 'Memory-powered orchestrator. Recalls context, delegates intelligently.', category: 'Core',
    endpoint: 'https://xero-seven-meta-989922711408.us-central1.run.app/operate',
    healthUrl: 'https://xero-seven-meta-989922711408.us-central1.run.app/health',
    testPayload: { command: 'Give me a brief agency status update.' }
  },
  {
    id: 'architect', name: 'Technical Architect', icon: <Database />, desc: 'Drafts professional tech proposals and system architecture.', category: 'Delivery',
    endpoint: 'https://xero-seven-architect-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-architect-989922711408.us-central1.run.app/health',
    testPayload: { lead_name: 'Test Client', lead_email: 'client@test.com', requirements: 'Build a healthcare CRM with AI features.' }
  },
  {
    id: 'pm', name: 'Scrum Master (PM)', icon: <TerminalWindow />, desc: 'Converts project specs into Jira-style engineering tasks.', category: 'Delivery',
    endpoint: 'https://xero-seven-pm-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-pm-989922711408.us-central1.run.app/health',
    testPayload: { project_id: 'test-001', requirements: 'Build a user authentication system with email/password and OAuth.' }
  },
  {
    id: 'frontend', name: 'Frontend Developer', icon: <Robot />, desc: 'Builds premium React + TypeScript + Tailwind components.', category: 'Delivery',
    endpoint: 'https://xero-seven-frontend-agent-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-frontend-agent-989922711408.us-central1.run.app/health',
    testPayload: { component_name: 'PricingCard', requirements: 'A premium pricing card with glassmorphism, hover animations, and a CTA button.' }
  },
  {
    id: 'backend', name: 'Backend Engineer', icon: <Database />, desc: 'Builds Node.js APIs, DB schemas, and integration solutions.', category: 'Delivery',
    endpoint: 'https://xero-seven-backend-agent-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-backend-agent-989922711408.us-central1.run.app/health',
    testPayload: { target_system: 'User Auth API', requirements: 'Build a JWT-based auth endpoint with refresh tokens using Express.js and InsForge.' }
  },
  {
    id: 'qa', name: 'QA & Security Auditor', icon: <CheckCircle />, desc: 'Reviews code for bugs, performance issues, and security vulnerabilities.', category: 'Delivery',
    endpoint: 'https://xero-seven-qa-agent-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-qa-agent-989922711408.us-central1.run.app/health',
    testPayload: { code_to_test: 'app.get("/users", (req, res) => { const id = req.query.id; db.query("SELECT * FROM users WHERE id = " + id); })', test_context: 'Express.js route', component_name: 'Users Route' }
  },
  {
    id: 'sales', name: 'Sales Strategist', icon: <ChartLineUp />, desc: 'Generates hyper-personalized B2B cold email campaigns.', category: 'Growth',
    endpoint: 'https://xero-seven-sales-agent-989922711408.us-central1.run.app/generate-campaign',
    healthUrl: 'https://xero-seven-sales-agent-989922711408.us-central1.run.app/health',
    testPayload: { targets: [{ name: 'Arjun Mehta', company: 'FinTech Startup', role: 'CTO' }] }
  },
  {
    id: 'linkedin', name: 'LinkedIn Outreach', icon: <IdentificationBadge />, desc: 'Creates LinkedIn connection notes and 3-step follow-up sequences.', category: 'Growth',
    endpoint: 'https://xero-seven-linkedin-agent-989922711408.us-central1.run.app/generate-connection',
    healthUrl: 'https://xero-seven-linkedin-agent-989922711408.us-central1.run.app/health',
    testPayload: { targets: [{ name: 'Priya Shah', role: 'Head of Product', company: 'SaaS Co' }] }
  },
  {
    id: 'marketing', name: 'Marketing Strategist', icon: <IdentificationBadge />, desc: 'Writes viral LinkedIn posts and social media content.', category: 'Growth',
    endpoint: 'https://xero-seven-marketing-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-marketing-989922711408.us-central1.run.app/health',
    testPayload: { topic: 'How AI agents are replacing traditional software agencies', format: 'Short LinkedIn Post' }
  },
  {
    id: 'support', name: 'Support Engineer', icon: <Robot />, desc: 'Handles L2 enterprise support tickets with empathy.', category: 'Operations',
    endpoint: 'https://xero-seven-support-989922711408.us-central1.run.app/',
    healthUrl: 'https://xero-seven-support-989922711408.us-central1.run.app/health',
    testPayload: { customer_name: 'Test Client', issue: 'The API is returning 500 errors on the dashboard.' }
  },
  {
    id: 'finance', name: 'Financial Controller', icon: <ChartLineUp />, desc: 'Generates invoices, pricing strategy, and financial projections.', category: 'Operations',
    endpoint: 'https://xero-seven-finance-agent-989922711408.us-central1.run.app/invoice',
    healthUrl: 'https://xero-seven-finance-agent-989922711408.us-central1.run.app/health',
    testPayload: { client_name: 'TechCorp India', project_scope: 'Full-stack SaaS platform with AI features', estimated_value: 15000 }
  },
];

const CATEGORY_ORDER = ['Core', 'Delivery', 'Growth', 'Operations'];

function formatUptime(seconds?: number): string {
  if (!seconds) return '—';
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  return `${Math.floor(seconds / 86400)}d ${Math.floor((seconds % 86400) / 3600)}h`;
}

export function AgentsPage() {
  const [activeTab, setActiveTab] = useState('summoner');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [health, setHealth] = useState<Record<string, AgentHealth>>(() =>
    Object.fromEntries(AGENTS.map(a => [a.id, { status: 'checking' }]))
  );
  const [refreshing, setRefreshing] = useState(false);

  const activeAgent = AGENTS.find(a => a.id === activeTab);

  const checkHealth = useCallback(async (agentId?: string) => {
    const toCheck = agentId ? AGENTS.filter(a => a.id === agentId) : AGENTS;

    await Promise.allSettled(toCheck.map(async (agent) => {
      setHealth(prev => ({ ...prev, [agent.id]: { ...prev[agent.id], status: 'checking' } }));
      const start = Date.now();
      try {
        const resp = await fetch(agent.healthUrl, { signal: AbortSignal.timeout(8000) });
        const latency = Date.now() - start;
        if (resp.ok) {
          const data = await resp.json();
          setHealth(prev => ({
            ...prev,
            [agent.id]: { status: 'online', uptime_seconds: data.uptime_seconds, latency_ms: latency, last_checked: new Date() }
          }));
        } else {
          setHealth(prev => ({ ...prev, [agent.id]: { status: 'offline', latency_ms: latency, last_checked: new Date() } }));
        }
      } catch {
        setHealth(prev => ({ ...prev, [agent.id]: { status: 'offline', last_checked: new Date() } }));
      }
    }));
  }, []);

  // Initial health check
  useEffect(() => { checkHealth(); }, [checkHealth]);

  // Re-check every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => checkHealth(), 60000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  const handleRefreshAll = async () => {
    setRefreshing(true);
    await checkHealth();
    setRefreshing(false);
  };

  const testAgent = async () => {
    if (!activeAgent) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(activeAgent.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activeAgent.testPayload)
      });
      const data = await response.json();
      setResult(data);
      // Re-check health after trigger
      checkHealth(activeAgent.id);
    } catch (error) {
      setResult({ error: `Failed to connect to ${activeAgent.name}` });
    }
    setLoading(false);
  };

  const onlineCount = Object.values(health).filter(h => h.status === 'online').length;
  const offlineCount = Object.values(health).filter(h => h.status === 'offline').length;

  const StatusIcon = ({ status }: { status: AgentHealth['status'] }) => {
    if (status === 'online') return <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />;
    if (status === 'offline') return <div className="w-2 h-2 rounded-full bg-red-500" />;
    return <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">AI Workforce</h1>
          <p className="text-zinc-400">Real-time health monitoring and manual triggers for all 12 agents.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500" /> {onlineCount} online
            </span>
            {offlineCount > 0 && (
              <span className="flex items-center gap-1.5 text-red-400">
                <div className="w-2 h-2 rounded-full bg-red-500" /> {offlineCount} offline
              </span>
            )}
          </div>
          <button
            onClick={handleRefreshAll}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-sm transition-all disabled:opacity-50"
          >
            <ArrowClockwise className={refreshing ? 'animate-spin' : ''} size={14} />
            Refresh All
          </button>
        </div>
      </div>

      {/* Health Grid by Category */}
      {CATEGORY_ORDER.map(category => {
        const categoryAgents = AGENTS.filter(a => a.category === category);
        return (
          <div key={category}>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">{category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {categoryAgents.map((agent, i) => {
                const h = health[agent.id];
                return (
                  <motion.button
                    key={agent.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => { setActiveTab(agent.id); setResult(null); }}
                    className={`text-left p-4 rounded-xl border transition-all ${activeTab === agent.id ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/[0.03] border-white/5 hover:bg-white/[0.06]'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xl ${activeTab === agent.id ? 'text-emerald-400' : 'text-zinc-500'}`}>{agent.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <StatusIcon status={h.status} />
                        <span className={`text-xs font-medium ${h.status === 'online' ? 'text-emerald-400' : h.status === 'offline' ? 'text-red-400' : 'text-yellow-400'}`}>
                          {h.status === 'checking' ? '...' : h.status}
                        </span>
                      </div>
                    </div>
                    <p className={`font-semibold text-sm mb-1 ${activeTab === agent.id ? 'text-white' : 'text-zinc-300'}`}>{agent.name}</p>
                    {h.status === 'online' && (
                      <div className="flex items-center gap-3 text-[10px] text-zinc-600 mt-1">
                        {h.uptime_seconds !== undefined && (
                          <span className="flex items-center gap-1"><Timer size={10} /> {formatUptime(h.uptime_seconds)}</span>
                        )}
                        {h.latency_ms && <span>{h.latency_ms}ms</span>}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Active Agent Control Panel */}
      {activeAgent && (
        <motion.div
          key={activeAgent.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-2xl bg-white/[0.03] border border-white/5"
        >
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <span className="text-emerald-400">{activeAgent.icon}</span>
                {activeAgent.name}
              </h2>
              <p className="text-sm text-zinc-400 mt-1">{activeAgent.desc}</p>
            </div>
            <div className="flex items-center gap-3">
              {health[activeAgent.id].status === 'online' && health[activeAgent.id].latency_ms && (
                <span className="text-xs text-zinc-500">{health[activeAgent.id].latency_ms}ms</span>
              )}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${health[activeAgent.id].status === 'online' ? 'bg-emerald-500/10 text-emerald-400' : health[activeAgent.id].status === 'offline' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                <StatusIcon status={health[activeAgent.id].status} />
                {health[activeAgent.id].status === 'online' ? `Online · ${formatUptime(health[activeAgent.id].uptime_seconds)}` : health[activeAgent.id].status === 'offline' ? 'Offline' : 'Checking...'}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Endpoint</h3>
            <code className="block p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-zinc-500 font-mono break-all">
              {activeAgent.endpoint}
            </code>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">Test Payload</h3>
            <pre className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-zinc-500 font-mono overflow-auto max-h-32">
              {JSON.stringify(activeAgent.testPayload, null, 2)}
            </pre>
          </div>

          <button
            onClick={testAgent}
            disabled={loading || health[activeAgent.id].status === 'offline'}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold flex items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : <Play weight="fill" size={16} />}
            {loading ? 'Executing...' : 'Trigger Agent'}
          </button>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                <CheckCircle className="text-emerald-500" size={14} /> Agent Response
              </h3>
              <pre className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm text-zinc-300 font-mono overflow-auto max-h-80 whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
