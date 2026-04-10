import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@insforge/sdk';
import { 
  CheckCircle, 
  Clock, 
  DotsThreeVertical,
  Kanban
} from '@phosphor-icons/react';

const insforge = createClient({
  baseUrl: 'https://4s4gr7gr.us-east.insforge.app',
  anonKey: 'ik_206eaa1daf90ae4b4ff9b780da244aa1',
});

interface Task {
  id: string;
  title: string;
  description: string;
  assigned_agent: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

export function AgencyTaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
    
    // Simple polling for "real-time" update
    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  async function fetchTasks() {
    const { data } = await insforge.database
      .from('agency_tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setTasks(data);
    setLoading(false);
  }

  async function updateStatus(id: string, newStatus: 'todo' | 'in_progress' | 'completed') {
    const { error } = await insforge.database
      .from('agency_tasks')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (!error) fetchTasks();
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    }
  };

  const getAgentColor = (agent: string) => {
    const colors: Record<string, string> = {
      sales: 'from-blue-500/20 to-indigo-500/20 text-blue-400',
      pm: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
      marketing: 'from-purple-500/20 to-pink-500/20 text-purple-400',
      architect: 'from-amber-500/20 to-orange-500/20 text-amber-400',
      support: 'from-cyan-500/20 to-blue-500/20 text-cyan-400',
      linkedin: 'from-brand-linkedin/20 to-blue-600/20 text-white',
    };
    return colors[agent.toLowerCase()] || 'from-zinc-500/20 to-zinc-600/20 text-zinc-400';
  };

  return (
    <div className="bg-[#0A0A0A] border border-zinc-800/50 rounded-2xl overflow-hidden backdrop-blur-xl">
      <div className="px-5 py-4 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/10">
        <div className="flex items-center gap-2">
          <Kanban size={18} className="text-emerald-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Autonomous Task Board</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {['SA', 'LA', 'MA', 'AA', 'PA'].map((initial, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-[#0A0A0A] flex items-center justify-center text-[10px] font-bold text-zinc-500">
                {initial}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 h-[400px] overflow-y-auto custom-scrollbar">
        {loading && tasks.length === 0 ? (
          <div className="h-full flex items-center justify-center flex-col gap-3 text-zinc-500">
            <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <span className="text-xs">Sychronizing with AI Fleet...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3">
              <Clock size={24} className="text-zinc-700" />
            </div>
            <h3 className="text-zinc-400 font-medium">No Tasks Assigned</h3>
            <p className="text-zinc-600 text-xs mt-1">Command the Meta Agent to delegate work to your specialized units.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-xl p-4 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${getAgentColor(task.assigned_agent)}`}>
                          {task.assigned_agent}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {task.title}
                      </h4>
                    </div>
                    <button className="text-zinc-600 hover:text-white transition-colors">
                      <DotsThreeVertical size={20} />
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed tracking-wide">
                    {task.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-800/30">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] text-emerald-500/80 uppercase font-medium tracking-widest">
                        {task.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {task.status !== 'completed' && (
                        <button 
                          onClick={() => updateStatus(task.id, 'completed')}
                          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:bg-emerald-500/20 hover:text-emerald-400 transition-all group/btn"
                        >
                          <CheckCircle size={16} weight="duotone" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
