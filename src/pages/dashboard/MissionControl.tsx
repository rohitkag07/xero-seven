import { motion } from 'framer-motion';
import { CommandConsole } from '../../components/dashboard/CommandConsole';
import { AgentOrchestrationTree } from '../../components/dashboard/AgentOrchestrationTree';
import { AgencyTaskBoard } from '../../components/dashboard/AgencyTaskBoard';
import { BrainViewer } from '../../components/dashboard/BrainViewer';
import { Crosshair } from '@phosphor-icons/react';

export function MissionControl() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Crosshair size={20} weight="duotone" className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Mission Control</h1>
            <p className="text-zinc-500 text-sm">Command the Meta Agent · Visualize your AI workforce</p>
          </div>
        </div>
      </motion.div>

      {/* Main Layout: Console + Tree + Task Board Overlay */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* Command Console (Left — 2 cols) */}
        <div className="xl:col-span-2 space-y-5">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-[520px]"
          >
            <CommandConsole />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AgencyTaskBoard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <BrainViewer />
          </motion.div>
        </div>

        {/* Orchestration Tree (Right — 3 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="xl:col-span-3 min-h-[800px]"
        >
          <AgentOrchestrationTree />
        </motion.div>
      </div>
    </div>
  );
}
