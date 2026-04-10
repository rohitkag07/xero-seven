import { ChartLineUp } from '@phosphor-icons/react';

export function AnalyticsPage() {
  return (
    <div className="space-y-8 h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Analytics</h1>
        <p className="text-zinc-400">Deep dive into agency revenue, lead conversion, and agent performance.</p>
      </div>

      <div className="p-16 border border-dashed border-zinc-800/50 rounded-3xl text-center flex flex-col items-center justify-center h-96">
        <ChartLineUp size={48} className="text-zinc-700 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Not Enough Data Yet</h3>
        <p className="text-zinc-500 max-w-sm">
          Analytics will populate here once your agents start engaging with users over a larger period.
        </p>
      </div>
    </div>
  );
}
