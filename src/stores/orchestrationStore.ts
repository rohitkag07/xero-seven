import { create } from 'zustand';

export type AgentStatus = 'idle' | 'thinking' | 'active' | 'success' | 'error';

export interface AgentTask {
  id: string;
  description: string;
  status: AgentStatus;
  startedAt: string;
  completedAt?: string;
  result?: string;
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  shortDesc: string;
  status: AgentStatus;
  endpoint: string;
  parentId: string | null;
  tasks: AgentTask[];
  currentTask?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'agent' | 'system';
  agentName?: string;
  content: string;
  timestamp: string;
}

interface OrchestrationState {
  agents: AgentNode[];
  messages: ChatMessage[];
  isProcessing: boolean;
  activeAgentId: string | null;

  sendCommand: (command: string) => Promise<void>;
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setAgentStatus: (agentId: string, status: AgentStatus) => void;
  setAgentTask: (agentId: string, task: string) => void;
  clearChat: () => void;
}

const AGENT_TREE: AgentNode[] = [
  {
    id: 'meta',
    name: 'Meta Agent',
    role: 'CEO / Orchestrator',
    shortDesc: 'Manages all agents, generates operational strategies',
    status: 'idle',
    endpoint: 'https://xero-seven-meta-989922711408.us-central1.run.app/operate',
    parentId: null,
    tasks: [],
  },
  {
    id: 'sales',
    name: 'Sales Agent',
    role: 'Lead Hunter',
    shortDesc: 'Personalized B2B cold outreach & lead research',
    status: 'idle',
    endpoint: 'https://xero-seven-sales-agent-989922711408.us-central1.run.app/',
    parentId: 'meta',
    tasks: [],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Agent',
    role: 'Networker',
    shortDesc: 'Connection notes & follow-up sequences',
    status: 'idle',
    endpoint: 'https://xero-seven-linkedin-agent-989922711408.us-central1.run.app/',
    parentId: 'meta',
    tasks: [],
  },
  {
    id: 'marketing',
    name: 'Marketing Agent',
    role: 'Content King',
    shortDesc: 'Viral B2B posts, threads & case studies',
    status: 'idle',
    endpoint: 'https://xero-seven-marketing-989922711408.us-central1.run.app/',
    parentId: 'meta',
    tasks: [],
  },
  {
    id: 'architect',
    name: 'Architect Agent',
    role: 'Tech Lead',
    shortDesc: 'Technical proposals & SaaS architecture',
    status: 'idle',
    endpoint: 'https://xero-seven-architect-989922711408.us-central1.run.app/',
    parentId: 'meta',
    tasks: [],
  },
  {
    id: 'pm',
    name: 'PM Agent',
    role: 'Scrum Master',
    shortDesc: 'Task breakdown & sprint planning',
    status: 'idle',
    endpoint: 'https://xero-seven-pm-989922711408.us-central1.run.app/',
    parentId: 'meta',
    tasks: [],
  },
  {
    id: 'support',
    name: 'Support Agent',
    role: 'Customer Hero',
    shortDesc: 'L2 technical support & client care',
    status: 'idle',
    endpoint: 'https://xero-seven-support-989922711408.us-central1.run.app/',
    parentId: 'meta',
    tasks: [],
  },
];

export const useOrchestrationStore = create<OrchestrationState>((set, get) => ({
  agents: AGENT_TREE,
  messages: [
    {
      id: 'welcome',
      role: 'system',
      content: 'Mission Control online. Type a command to speak with the Meta Agent. Try: "Analyze the healthcare market and create a strategy."',
      timestamp: new Date().toISOString(),
    },
  ],
  isProcessing: false,
  activeAgentId: null,

  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        { ...msg, id: crypto.randomUUID(), timestamp: new Date().toISOString() },
      ],
    })),

  setAgentStatus: (agentId, status) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === agentId ? { ...a, status } : a)),
      activeAgentId: status === 'thinking' || status === 'active' ? agentId : state.activeAgentId,
    })),

  setAgentTask: (agentId, task) =>
    set((state) => ({
      agents: state.agents.map((a) =>
        a.id === agentId ? { ...a, currentTask: task } : a
      ),
    })),

  clearChat: () =>
    set({
      messages: [
        {
          id: 'welcome',
          role: 'system',
          content: 'Mission Control online. Type a command to speak with the Meta Agent.',
          timestamp: new Date().toISOString(),
        },
      ],
    }),

  sendCommand: async (command: string) => {
    const { addMessage, setAgentStatus, setAgentTask, messages } = get();

    // Add user message
    addMessage({ role: 'user', content: command });
    set({ isProcessing: true });

    // Light up the Meta Agent
    setAgentStatus('meta', 'thinking');
    setAgentTask('meta', 'Analyzing request...');

    // Prepare history for Meta Brain (last 10 messages, mapped to AI roles)
    const history = messages.slice(-10).map(m => ({
      role: m.role === 'user' ? 'user' as const : 'assistant' as const,
      content: m.content
    }));

    try {
      // Make the real API call to the Meta Agent Brain
      const metaEndpoint = get().agents.find((a) => a.id === 'meta')?.endpoint;
      
      const response = await fetch(metaEndpoint || '', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, history }),
      });

      const data = await response.json();

      // Check if response contains error
      if (!response.ok || data.error) {
        throw new Error(data.error || data.details || `HTTP ${response.status}`);
      }

      // Meta agent completes
      setAgentStatus('meta', 'success');
      setAgentTask('meta', 'Request processed');

      // 1. Show the Meta Agent's conversational response
      if (data.message) {
        addMessage({
          role: 'agent',
          agentName: 'Meta Agent',
          content: data.message,
        });
      }

      // 2. Handle Strategy if provided
      if (data.strategy) {
        addMessage({
          role: 'system',
          content: `📊 **Strategic Plan Generated:**\n\n🎯 **Service Idea:** ${data.strategy.service_idea}\n💰 **Pricing:** ${data.strategy.pricing_model}`,
        });
      }

      // 3. Dynamic Delegations (Smart light up — now handles objects from Brain v6)
      if (data.delegations && Array.isArray(data.delegations)) {
        for (const delegation of data.delegations) {
          const agentKey = typeof delegation === 'string' ? delegation : delegation.agent;
          if (!agentKey) continue;
          const id = agentKey.toLowerCase().replace('_campaign', '');
          await new Promise((r) => setTimeout(r, 400));
          setAgentStatus(id, 'thinking');
          const agentName = get().agents.find((a) => a.id === id)?.name || agentKey;
          setAgentTask(id, `Executing task via Meta CEO...`);
          addMessage({
            role: 'system',
            content: `📡 Meta Agent delegated task to **${agentName}**`,
          });
        }
      }

      // 3b. Show delegation results from actual agent calls
      if (data.delegation_results && Array.isArray(data.delegation_results)) {
        for (const result of data.delegation_results) {
          if (result.success && result.agent) {
            const agentId = get().agents.find(a => a.name.includes(result.agent?.split(' ')[0] || ''))?.id;
            if (agentId) {
              setAgentStatus(agentId, 'success');
              setAgentTask(agentId, 'Task completed');
            }
            addMessage({
              role: 'system',
              content: `✅ **${result.agent}** completed task successfully.`,
            });
          }
        }
      }

      // 4. Show memory persistence info
      if (data.memories_saved && data.memories_saved > 0) {
        addMessage({
          role: 'system',
          content: `🧠 **${data.memories_saved}** new memories saved to Brain.`,
        });
      }

      // 5. Show next steps
      if (data.next_steps && Array.isArray(data.next_steps) && data.next_steps.length > 0) {
        addMessage({
          role: 'system',
          content: `📋 **Next Steps:**\n${data.next_steps.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}`,
        });
      }

      // Reset all agents after a delay
      setTimeout(() => {
        set((state) => ({
          agents: state.agents.map((a) => ({ ...a, status: 'idle' as AgentStatus, currentTask: undefined })),
          isProcessing: false,
          activeAgentId: null,
        }));
      }, 8000);
    } catch (error) {
      console.error('[MissionControl] Command failed:', error);
      setAgentStatus('meta', 'error');
      setAgentTask('meta', 'System Error');

      const errorMsg = error instanceof Error ? error.message : String(error);
      addMessage({
        role: 'agent',
        agentName: 'Meta Agent',
        content: `❌ Rohit, backend mein issue hai:\n\n**Error:** ${errorMsg}\n\n💡 **Action:** Check Cloud Run logs ya API credentials check karenge.`,
      });

      set({ isProcessing: false });

      // Reset after delay
      setTimeout(() => {
        set((state) => ({
          agents: state.agents.map((a) => ({ ...a, status: 'idle' as AgentStatus, currentTask: undefined })),
          activeAgentId: null,
        }));
      }, 4000);
    }
  },
}));
