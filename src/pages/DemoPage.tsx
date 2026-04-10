import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightning, PaperPlaneTilt, Robot, User, CircleNotch } from '@phosphor-icons/react';
import { insforge } from '../lib/insforge';

const messageVariants = {
  initial: { opacity: 0, y: 16, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function DemoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Namaste! Main Xero Seven AI Assistant hun. Aap mujhse kuch bhi puchh sakte hain — appointment booking, clinic queries, ya koi bhi business automation question. Try kijiye!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const { data, error } = await insforge.ai.chat.completions.create({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are the AI demo assistant for Xero Seven AI Agency. You help potential clients understand our AI automation services. 
You can answer questions about:
- WhatsApp AI Bot for clinics (auto-reply, appointment booking)
- Lead Qualification agents
- Appointment Booking systems  
- Customer Support bots
- Pricing (starts from Rs.10,000 setup)
- Tech stack (Google ADK, Cloud Run, Gemini AI)
Keep responses concise (2-3 sentences max). Mix Hindi-English naturally. Be helpful and professional.
If asked to book an appointment or demo, say you'll connect them with Rohit and ask for their contact details.`,
          },
          ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
          { role: 'user' as const, content: userMsg },
        ],
      });

      if (error) throw error;

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data?.choices?.[0]?.message?.content || 'Sorry, something went wrong. Please try again.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection issue. Please try again in a moment.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFBFC] to-[#F5F6F8] pt-32">
      <section className="section-padding pt-0">
        <div className="container-width max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-slate-300 bg-white/80 backdrop-blur-sm mb-8">
              <Lightning weight="fill" className="w-3 h-3 text-slate-700" />
              <span className="text-[10px] text-slate-700 uppercase tracking-[0.25em] font-semibold">Live Demo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-4 leading-tight">
              Talk to Our<br />
              <span className="text-slate-400">AI Agent</span>
            </h1>
            <p className="text-base text-slate-600 max-w-[50ch] mx-auto">
              This is a live demo of our AI. Ask about services, pricing, or automation ideas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="p-1.5 rounded-4xl bg-white/[0.02] border border-white/5">
              <div className="rounded-[calc(2rem-0.375rem)] bg-surface-100 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-zinc-400 font-mono">xero-seven-agent /// online</span>
                </div>

                <div className="h-[450px] overflow-y-auto p-6 space-y-4">
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        msg.role === 'assistant'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-white/5 text-zinc-400'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <Robot weight="duotone" className="w-4 h-4" />
                        ) : (
                          <User weight="fill" className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'assistant'
                          ? 'bg-white/3 border border-white/5 text-zinc-300'
                          : 'bg-accent/10 border border-accent/15 text-zinc-200'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                      variants={messageVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Robot weight="duotone" className="w-4 h-4 text-accent" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl bg-white/3 border border-white/5">
                        <div className="flex gap-1">
                          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 rounded-full bg-zinc-500" />
                          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 rounded-full bg-zinc-500" />
                          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 rounded-full bg-zinc-500" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  </AnimatePresence>
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Kuch bhi puchho... e.g. 'WhatsApp bot kitne ka hai?'"
                      className="flex-1 px-4 py-3 rounded-xl bg-white/3 border border-white/8 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent/40 transition-colors"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-surface hover:bg-accent-light active:scale-95 transition-all duration-300 disabled:opacity-40"
                    >
                      {isLoading ? (
                        <CircleNotch weight="bold" className="w-5 h-5 animate-spin" />
                      ) : (
                        <PaperPlaneTilt weight="fill" className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
