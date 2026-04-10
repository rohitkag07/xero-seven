import { motion } from 'framer-motion';
import type { AgentStatus } from '../../stores/orchestrationStore';

interface AgentNodeProps {
  name: string;
  role: string;
  status: AgentStatus;
  currentTask?: string;
  isRoot?: boolean;
  onClick?: () => void;
}

const STATUS_CONFIG: Record<AgentStatus, { ring: string; dot: string; bg: string; label: string; pulse: boolean }> = {
  idle: {
    ring: 'border-zinc-700/50',
    dot: 'bg-zinc-600',
    bg: 'bg-zinc-900/60',
    label: 'Standby',
    pulse: false,
  },
  thinking: {
    ring: 'border-amber-500/50',
    dot: 'bg-amber-400',
    bg: 'bg-amber-500/5',
    label: 'Thinking',
    pulse: true,
  },
  active: {
    ring: 'border-blue-500/50',
    dot: 'bg-blue-400',
    bg: 'bg-blue-500/5',
    label: 'Active',
    pulse: true,
  },
  success: {
    ring: 'border-emerald-500/50',
    dot: 'bg-emerald-400',
    bg: 'bg-emerald-500/5',
    label: 'Complete',
    pulse: false,
  },
  error: {
    ring: 'border-red-500/50',
    dot: 'bg-red-400',
    bg: 'bg-red-500/5',
    label: 'Error',
    pulse: false,
  },
};

export function AgentNodeCard({ name, role, status, currentTask, isRoot, onClick }: AgentNodeProps) {
  const config = STATUS_CONFIG[status];
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border ${config.ring} ${config.bg} backdrop-blur-sm transition-all cursor-pointer group ${
        isRoot ? 'min-w-[140px]' : 'min-w-[120px]'
      }`}
    >
      {/* Status indicator */}
      <div className="relative">
        <div
          className={`flex items-center justify-center rounded-xl ${
            isRoot ? 'w-12 h-12' : 'w-10 h-10'
          } bg-zinc-800/70 border border-zinc-700/40 text-xs font-bold tracking-wider ${
            status === 'thinking' || status === 'active'
              ? 'text-amber-300'
              : status === 'success'
              ? 'text-emerald-400'
              : status === 'error'
              ? 'text-red-400'
              : 'text-zinc-400'
          }`}
        >
          {initials}
        </div>
        {/* Pulse dot */}
        <div className="absolute -top-0.5 -right-0.5">
          <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`}>
            {config.pulse && (
              <div className={`absolute inset-0 rounded-full ${config.dot} animate-ping opacity-60`} />
            )}
          </div>
        </div>
      </div>

      {/* Agent info */}
      <div className="text-center">
        <p className={`text-[11px] font-semibold tracking-tight ${
          status !== 'idle' ? 'text-white' : 'text-zinc-300'
        }`}>
          {name}
        </p>
        <p className="text-[9px] text-zinc-600 font-medium uppercase tracking-wider">{role}</p>
      </div>

      {/* Task chip */}
      {currentTask && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-0.5 px-2 py-0.5 rounded-md bg-zinc-800/60 border border-zinc-700/30"
        >
          <p className="text-[9px] text-zinc-400 truncate max-w-[100px]">{currentTask}</p>
        </motion.div>
      )}

      {/* Status label */}
      <span
        className={`text-[8px] font-bold uppercase tracking-widest ${
          status === 'thinking'
            ? 'text-amber-500'
            : status === 'success'
            ? 'text-emerald-500'
            : status === 'error'
            ? 'text-red-500'
            : 'text-zinc-600'
        }`}
      >
        {config.label}
      </span>
    </motion.button>
  );
}
