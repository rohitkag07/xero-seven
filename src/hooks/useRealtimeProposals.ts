import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';
import type { Proposal } from './useProposals';


export interface UseRealtimeProposalsOptions {
  teamId?: string;
  onError?: (error: Error) => void;
}

export function useRealtimeProposals(options: UseRealtimeProposalsOptions = {}) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch initial proposals
  const fetchProposals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_proposals').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProposals(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch proposals';
      setError(errorMessage);
      options.onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setLoading(false);
    }
  }, [options.teamId, options]);

  // Subscribe to real-time updates
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const subscribe = async () => {
      try {
        // Fetch initial data first
        await fetchProposals();

        // Ensure realtime is connected
        if (!insforge.realtime.isConnected) {
          await insforge.realtime.connect();
        }

        // Subscribe to real-time channel
        const channel = `proposals:${options.teamId || 'global'}`;
        await insforge.realtime.subscribe(channel);
        
        // Listen for events
        const handleProposalEvent = (payload: any) => {
          // Verify it's for our channel
          if (payload.meta?.channel !== channel) return;

          const { action, data, id } = payload;

          if (action === 'INSERT' && data) {
            setProposals((prev) => [data, ...prev]);
          } else if (action === 'UPDATE' && data) {
            setProposals((prev) =>
              prev.map((proposal) => (proposal.id === id ? data : proposal))
            );
          } else if (action === 'DELETE' && id) {
            setProposals((prev) => prev.filter((proposal) => proposal.id !== id));
          }
        };

        insforge.realtime.on('PROPOSAL_CHANGE', handleProposalEvent);
        setIsSubscribed(true);
        console.log('✅ Subscribed to proposals channel:', channel);

        unsubscribe = () => {
          insforge.realtime.off('PROPOSAL_CHANGE', handleProposalEvent);
          insforge.realtime.unsubscribe(channel);
          console.log('🔌 Unsubscribed from proposals channel');
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Subscription failed';
        console.error('Realtime subscription error:', err);
        setError(errorMessage);
        options.onError?.(err instanceof Error ? err : new Error(errorMessage));
        setIsSubscribed(false);
      }
    };

    subscribe();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [options.teamId, fetchProposals, options]);

  // Fallback to polling every 30 seconds if not subscribed
  useEffect(() => {
    if (isSubscribed) return;

    const interval = setInterval(() => {
      fetchProposals();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [isSubscribed, fetchProposals]);

  return {
    proposals,
    loading,
    error,
    isSubscribed,
    refetch: fetchProposals,
  };
}
