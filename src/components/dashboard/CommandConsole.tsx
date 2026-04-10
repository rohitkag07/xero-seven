import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneRight, Trash, Terminal, CircleNotch } from '@phosphor-icons/react';
import { useOrchestrationStore } from '../../stores/orchestrationStore';

export function CommandConsole() {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, sendCommand, isProcessing, clearChat } = useOrchestrationStore();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    const cmd = input.trim();
    setInput('');
    await sendCommand(cmd);
  };

  const quickCommands = [
    'Analyze the Healthcare market',
    'Generate LinkedIn content for AI SaaS',
    'Create outreach strategy for Real Estate',
    'Plan a sprint for landing page redesign',
  ];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-zinc-950/60 border border-zinc-800/60 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/50 bg-zinc-900/40">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Terminal size={18} weight="duotone" className="text-emerald-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-zinc-200 tracking-tight">Command Console</span>
          <span className="text-[10px] font-medium text-zinc-600 bg-zinc-800/60 px-2 py-0.5 rounded-full">META-CEO</span>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800/50 transition-colors"
          title="Clear chat"
        >
          <Trash size={14} />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                    : msg.role === 'system'
                    ? 'bg-zinc-800/30 text-zinc-500 border border-zinc-800/40 text-[12px]'
                    : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/30'
                }`}
              >
                {msg.agentName && (
                  <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider mb-1">
                    {msg.agentName}
                  </div>
                )}
                <div className="whitespace-pre-wrap">
                  {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return (
                        <span key={i} className="font-semibold text-white">
                          {part.slice(2, -2)}
                        </span>
                      );
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-zinc-500 text-xs pl-1"
          >
            <CircleNotch size={14} className="animate-spin text-emerald-500" />
            <span>Meta Agent is processing...</span>
          </motion.div>
        )}
      </div>

      {/* Quick Commands */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-[10px] uppercase tracking-wider text-zinc-600 mb-2 font-medium">Quick Commands</p>
          <div className="flex flex-wrap gap-1.5">
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => setInput(cmd)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-zinc-800/40 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/70 border border-zinc-800/40 transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="px-3 py-3 border-t border-zinc-800/50 bg-zinc-900/30">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isProcessing ? 'Processing...' : 'Command the Meta Agent...'}
              disabled={isProcessing}
              className="w-full bg-zinc-800/40 border border-zinc-700/30 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 focus:border-emerald-500/30 transition-all disabled:opacity-40"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 border border-emerald-500/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <CircleNotch size={18} className="animate-spin" />
            ) : (
              <PaperPlaneRight size={18} weight="fill" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
