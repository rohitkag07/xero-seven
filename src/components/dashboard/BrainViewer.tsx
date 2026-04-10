import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, MagnifyingGlass, TagSimple, ArrowClockwise } from '@phosphor-icons/react';

interface Memory {
  id: string;
  memory_type: string;
  category: string;
  content: string;
  source_agent: string;
  importance: number;
  tags: string[] | null;
  created_at: string;
}

export function BrainViewer() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const META_URL = 'https://xero-seven-meta-989922711408.us-central1.run.app';

  const fetchMemories = async (category?: string) => {
    setLoading(true);
    try {
      const url = category && category !== 'all'
        ? `${META_URL}/brain?category=${category}&limit=30`
        : `${META_URL}/brain?limit=30`;
      const response = await fetch(url);
      const data = await response.json();
      setMemories(data.memories || []);
    } catch (error) {
      console.error('Failed to fetch brain memories:', error);
      setMemories([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMemories(activeFilter);
  }, [activeFilter]);

  const categories = ['all', 'leads', 'strategy', 'delegation', 'commands', 'projects', 'general'];

  const typeColors: Record<string, string> = {
    fact: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
    decision: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    lead_context: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    task_update: 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    learning: 'bg-pink-500/15 text-pink-400 border-pink-500/20',
  };

  const filteredMemories = searchQuery
    ? memories.filter(m =>
        m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.source_agent?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : memories;

  return (
    <div className="rounded-2xl bg-zinc-950/60 border border-zinc-800/60 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/50 bg-zinc-900/40">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Brain size={18} weight="duotone" className="text-purple-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-zinc-200 tracking-tight">Brain Memory</span>
          <span className="text-[10px] font-medium text-zinc-600 bg-zinc-800/60 px-2 py-0.5 rounded-full">
            {filteredMemories.length} memories
          </span>
        </div>
        <button
          onClick={() => fetchMemories(activeFilter)}
          className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
          title="Refresh"
        >
          <ArrowClockwise size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Search & Filters */}
      <div className="px-4 pt-3 pb-2 space-y-2">
        <div className="relative">
          <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memories..."
            className="w-full bg-zinc-800/40 border border-zinc-700/30 rounded-lg pl-9 pr-3 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/30"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all capitalize ${
                activeFilter === cat
                  ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                  : 'bg-zinc-800/40 text-zinc-500 border-zinc-800/40 hover:text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Memories List */}
      <div className="px-4 pb-4 max-h-[400px] overflow-y-auto space-y-2 scrollbar-thin">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <ArrowClockwise size={20} className="animate-spin text-zinc-600" />
          </div>
        ) : filteredMemories.length === 0 ? (
          <div className="text-center py-8 text-zinc-600 text-xs">
            No memories found. Start commanding the Meta Agent!
          </div>
        ) : (
          <AnimatePresence>
            {filteredMemories.map((memory, i) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/20 hover:border-zinc-700/40 transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[memory.memory_type] || 'bg-zinc-700/20 text-zinc-400 border-zinc-700/30'}`}>
                    {memory.memory_type}
                  </span>
                  <span className="text-[9px] text-zinc-600">{memory.source_agent}</span>
                  <span className="ml-auto text-[9px] text-zinc-700">
                    {new Date(memory.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-[12px] text-zinc-400 leading-relaxed">{memory.content}</p>
                {memory.tags && memory.tags.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {memory.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-0.5 text-[9px] text-zinc-600 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                        <TagSimple size={8} /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
