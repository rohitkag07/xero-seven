import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useOrchestrationStore } from '../../stores/orchestrationStore';
import { AgentNodeCard } from './AgentNodeCard';
import type { AgentNode, AgentStatus } from '../../stores/orchestrationStore';

export function AgentOrchestrationTree() {
  const { agents } = useOrchestrationStore();
  const [selectedAgent, setSelectedAgent] = useState<AgentNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rootAgent = agents.find((a) => a.parentId === null);
    const [offset, setOffset] = useState(0);

  // Animation loop for flowing lines
  useEffect(() => {
    let animationFrame: number;
    const animate = () => {
      setOffset((prev) => (prev + 0.5) % 24);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const childAgents = agents.filter((a) => a.parentId !== null);

  // Draw connecting lines on canvas
  const drawLines = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rootEl = container.querySelector('[data-agent-id="meta"]');
    if (!rootEl) return;

    const rootRect = rootEl.getBoundingClientRect();
    const rootCenterX = rootRect.left - rect.left + rootRect.width / 2;
    const rootBottom = rootRect.top - rect.top + rootRect.height;

    childAgents.forEach((agent) => {
      const childEl = container.querySelector(`[data-agent-id="${agent.id}"]`);
      if (!childEl) return;

      const childRect = childEl.getBoundingClientRect();
      const childCenterX = childRect.left - rect.left + childRect.width / 2;
      const childTop = childRect.top - rect.top;

      const midY = rootBottom + (childTop - rootBottom) / 2;

      // Determine line color and style based on agent status
      let strokeColor = 'rgba(63, 63, 70, 0.2)'; // zinc-700/20
      let lineWidth = 1;
      let isFlowing = false;

      if (agent.status === 'thinking') {
        strokeColor = 'rgba(251, 191, 36, 0.6)'; // amber
        lineWidth = 2;
        isFlowing = true;
      } else if (agent.status === 'active') {
        strokeColor = 'rgba(59, 130, 246, 0.6)'; // blue
        lineWidth = 2;
        isFlowing = true;
      } else if (agent.status === 'success') {
        strokeColor = 'rgba(16, 185, 129, 0.6)'; // emerald
        lineWidth = 2.5;
        isFlowing = false;
      } else if (agent.status === 'error') {
        strokeColor = 'rgba(239, 68, 68, 0.6)'; // red
        lineWidth = 1.5;
      }

      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      
      if (isFlowing) {
        ctx.setLineDash([6, 6]);
        ctx.lineDashOffset = -offset;
      } else {
        ctx.setLineDash([]);
      }

      // Draw smooth bezier curves
      ctx.moveTo(rootCenterX, rootBottom);
      ctx.bezierCurveTo(rootCenterX, midY, childCenterX, midY, childCenterX, childTop);
      ctx.stroke();

      // Draw a small glow dot at the connection point if active
      if (agent.status !== 'idle' && agent.status !== 'error') {
        ctx.beginPath();
        ctx.arc(childCenterX, childTop, 3, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();
        
        // Add a secondary glow for thinking/active
        if (isFlowing) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = strokeColor;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
      }
    });
  }, [childAgents, offset]);

  useEffect(() => {
    drawLines();
    const handleResize = () => drawLines();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawLines, agents]);

  // Redraw lines when agents change status
  useEffect(() => {
    drawLines();
  }, [agents, drawLines, offset]);

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'thinking': return 'text-amber-400';
      case 'active': return 'text-blue-400';
      case 'success': return 'text-emerald-400';
      case 'error': return 'text-red-400';
      default: return 'text-zinc-600';
    }
  };

  return (
    <div className="rounded-2xl bg-zinc-950/60 border border-zinc-800/60 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/50 bg-zinc-900/40">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold text-zinc-200 tracking-tight">Agent Orchestration Tree</span>
          <span className="text-[10px] font-medium text-zinc-600 bg-zinc-800/60 px-2 py-0.5 rounded-full">
            {agents.filter((a) => a.status !== 'idle').length} / {agents.length} active
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-zinc-600"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600" /> Idle</span>
          <span className="flex items-center gap-1 text-amber-500"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Thinking</span>
          <span className="flex items-center gap-1 text-emerald-500"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Done</span>
        </div>
      </div>

      {/* Tree Visualization */}
      <div ref={containerRef} className="relative px-6 py-8 min-h-[340px]">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        {/* Root Agent (Meta/CEO) */}
        <div className="flex justify-center mb-12 relative z-10">
          {rootAgent && (
            <div data-agent-id={rootAgent.id}>
              <AgentNodeCard
                name={rootAgent.name}
                role={rootAgent.role}
                status={rootAgent.status}
                currentTask={rootAgent.currentTask}
                isRoot
                onClick={() => setSelectedAgent(rootAgent)}
              />
            </div>
          )}
        </div>

        {/* Child Agents (Horizontal row) */}
        <div className="flex justify-center gap-4 flex-wrap relative z-10">
          {childAgents.map((agent, i) => (
            <motion.div
              key={agent.id}
              data-agent-id={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <AgentNodeCard
                name={agent.name}
                role={agent.role}
                status={agent.status}
                currentTask={agent.currentTask}
                onClick={() => setSelectedAgent(agent)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Agent Detail Panel */}
      {selectedAgent && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-zinc-800/50 bg-zinc-900/30 px-5 py-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {selectedAgent.name}
                <span className={`text-[10px] font-medium uppercase ${getStatusColor(selectedAgent.status)}`}>
                  {selectedAgent.status}
                </span>
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">{selectedAgent.role} — {selectedAgent.shortDesc}</p>
              {selectedAgent.currentTask && (
                <p className="text-xs text-zinc-400 mt-2">
                  <span className="text-zinc-600">Current Task:</span> {selectedAgent.currentTask}
                </p>
              )}
              <p className="text-[10px] text-zinc-700 mt-2 font-mono break-all">
                {selectedAgent.endpoint}
              </p>
            </div>
            <button
              onClick={() => setSelectedAgent(null)}
              className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
