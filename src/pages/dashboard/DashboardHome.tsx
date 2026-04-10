import { motion, AnimatePresence } from 'framer-motion';
import { Users, ChartBar, ProjectorScreenChart, ArrowUpRight, Bell, Fire, X } from '@phosphor-icons/react';
import { useEffect, useState, useRef } from 'react';
import { insforge } from '../../lib/insforge';
import { useAuth } from '../../contexts/AuthContext';
import { useRealtimeLeads } from '../../hooks/useRealtimeLeads';
import { useLeadNotifications } from '../../hooks/useLeadNotifications';

interface AgencyLead {
  id: string;
  name: string;
  email: string;
  message?: string;
  lead_score: number;
  routed_to: string;
  lead_stage: string;
  created_at: string;
}

export function DashboardHome() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ projects: 0, messages: 0 });
  const [toasts, setToasts] = useState<Array<{ id: string; name: string; score: number; routed: string }>>([]);
  const prevLeadCountRef = useRef<number | null>(null);

  // Live leads via Realtime
  const { leads, isSubscribed } = useRealtimeLeads();
  const { notifications, permissionGranted, requestPermission, clearNotification } = useLeadNotifications();

  // Fetch other stats (projects, messages — no realtime needed)
  useEffect(() => {
    async function fetchStats() {
      try {
        const [projectsRes, messagesRes] = await Promise.all([
          insforge.database.from('agency_projects').select('id', { count: 'exact', head: true }),
          insforge.database.from('agency_messages').select('id', { count: 'exact', head: true }),
        ]);
        setStats({ projects: projectsRes.count || 0, messages: messagesRes.count || 0 });
      } catch (err) {
        console.error('[DashboardHome] Stats fetch error:', err);
      }
    }
    fetchStats();
  }, []);

  // Show in-app toast when new lead arrives after initial load
  useEffect(() => {
    const count = leads.length;
    if (prevLeadCountRef.current !== null && count > prevLeadCountRef.current && leads[0]) {
      const lead = leads[0] as unknown as AgencyLead;
      const toast = {
        id: lead.id,
        name: lead.name || 'New visitor',
        score: lead.lead_score || 0,
        routed: lead.routed_to || 'Sales',
      };
      setToasts(prev => [toast, ...prev.slice(0, 2)]);
      const timer = setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toast.id)), 6000);
      return () => clearTimeout(timer);
    }
    prevLeadCountRef.current = count;
  }, [leads]);

  return (
    <div className="space-y-8">
      {/* In-app Toast notifications */}
      <div className="fixed top-6 right-6 z-50 space-y-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-zinc-900 border border-emerald-500/30 shadow-2xl shadow-black/50 w-72"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 shrink-0">
                <Fire size={18} className="text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold">New Lead!</p>
                <p className="text-zinc-400 text-xs truncate">{toast.name}</p>
                <p className="text-emerald-400 text-xs mt-0.5">Score: {toast.score}/100 · → {toast.routed}</p>
              </div>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-zinc-600 hover:text-zinc-300 shrink-0"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Welcome back, {user?.fullName?.split(' ')[0] || 'Rohit'}
          </h1>
          <p className="text-zinc-400 flex items-center gap-2">
            Agency performance overview
            {isSubscribed && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            )}
          </p>
        </div>

        {/* Notification bell */}
        <div className="flex items-center gap-3">
          {!permissionGranted && (
            <button
              onClick={requestPermission}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs transition-all"
            >
              <Bell size={14} /> Enable alerts
            </button>
          )}
          {notifications.length > 0 && (
            <div className="relative">
              <button
                onClick={() => notifications.forEach(n => clearNotification(n.id))}
                className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
              >
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {notifications.length}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Leads"
          value={leads.length}
          icon={<Users size={24} />}
          trend={isSubscribed ? '🟢 Live' : 'Loading...'}
          highlight={leads.length > 0}
        />
        <StatCard
          title="Active Projects"
          value={stats.projects}
          icon={<ProjectorScreenChart size={24} />}
          trend="In progress"
        />
        <StatCard
          title="Inbox Messages"
          value={stats.messages}
          icon={<ChartBar size={24} />}
          trend="Contact form"
        />
      </div>

      {/* Recent Leads */}
      {leads.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Recent Leads</h2>
          <div className="space-y-2">
            {(leads as unknown as AgencyLead[])
              .slice(0, 5)
              .map((lead, i) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center text-emerald-400 font-bold text-sm uppercase">
                      {lead.name?.[0] || '?'}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{lead.name || 'Unknown'}</p>
                      <p className="text-zinc-500 text-xs">{lead.email || '—'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${lead.lead_score >= 60 ? 'bg-emerald-500/15 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                      {lead.lead_score}/100
                    </span>
                    <span className="text-xs text-zinc-500 w-16 text-right">{lead.routed_to}</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title, value, icon, trend, highlight = false
}: {
  title: string; value: number | string; icon: React.ReactNode; trend: string; highlight?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-6 rounded-3xl backdrop-blur-xl group transition-all ${highlight ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-zinc-900/50 border border-zinc-800/50'}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl group-hover:scale-110 transition-transform ${highlight ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-950 text-emerald-500'}`}>
          {icon}
        </div>
        <ArrowUpRight size={20} className="text-zinc-500 group-hover:text-emerald-500 transition-colors" />
      </div>
      <div>
        <p className="text-zinc-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white mb-2">{value}</h3>
        <p className="text-emerald-500 text-sm font-medium">{trend}</p>
      </div>
    </motion.div>
  );
}
