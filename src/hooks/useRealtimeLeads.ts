import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';
import type { Lead } from './useLeads';


export interface UseRealtimeLeadsOptions {
  teamId?: string;
  onError?: (error: Error) => void;
}

export function useRealtimeLeads(options: UseRealtimeLeadsOptions = {}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch initial leads
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_leads').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setLeads(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leads';
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
        await fetchLeads();

        // Ensure realtime is connected
        if (!insforge.realtime.isConnected) {
          await insforge.realtime.connect();
        }

        // Subscribe to real-time channel
        const channel = `leads:${options.teamId || 'global'}`;
        await insforge.realtime.subscribe(channel);
        
        // Listen for events
        const handleLeadEvent = (payload: any) => {
          // Verify it's for our channel
          if (payload.meta?.channel !== channel) return;
          
          const { action, data, id } = payload;

          if (action === 'INSERT' && data) {
            setLeads((prev) => [data, ...prev]);
          } else if (action === 'UPDATE' && data) {
            setLeads((prev) =>
              prev.map((lead) => (lead.id === id ? data : lead))
            );
          } else if (action === 'DELETE' && id) {
            setLeads((prev) => prev.filter((lead) => lead.id !== id));
          }
        };

        insforge.realtime.on('LEAD_CHANGE', handleLeadEvent);
        setIsSubscribed(true);
        console.log('✅ Subscribed to leads channel:', channel);

        unsubscribe = () => {
          insforge.realtime.off('LEAD_CHANGE', handleLeadEvent);
          insforge.realtime.unsubscribe(channel);
          console.log('🔌 Unsubscribed from leads channel');
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
  }, [options.teamId, fetchLeads, options]);

  // Fallback to polling every 30 seconds if not subscribed
  useEffect(() => {
    if (isSubscribed) return;

    const interval = setInterval(() => {
      fetchLeads();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [isSubscribed, fetchLeads]);

  return {
    leads,
    loading,
    error,
    isSubscribed,
    refetch: fetchLeads,
  };
}
