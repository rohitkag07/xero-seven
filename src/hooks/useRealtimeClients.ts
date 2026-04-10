import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';
import type { Client } from './useClients';


export interface UseRealtimeClientsOptions {
  teamId?: string;
  onError?: (error: Error) => void;
}

export function useRealtimeClients(options: UseRealtimeClientsOptions = {}) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch initial clients
  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_clients').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setClients(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch clients';
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
        await fetchClients();

        // Ensure realtime is connected
        if (!insforge.realtime.isConnected) {
          await insforge.realtime.connect();
        }

        // Subscribe to real-time channel
        const channel = `clients:${options.teamId || 'global'}`;
        await insforge.realtime.subscribe(channel);
        
        // Listen for events
        const handleClientEvent = (payload: any) => {
          // Verify it's for our channel
          if (payload.meta?.channel !== channel) return;

          const { action, data, id } = payload;

          if (action === 'INSERT' && data) {
            setClients((prev) => [data, ...prev]);
          } else if (action === 'UPDATE' && data) {
            setClients((prev) =>
              prev.map((client) => (client.id === id ? data : client))
            );
          } else if (action === 'DELETE' && id) {
            setClients((prev) => prev.filter((client) => client.id !== id));
          }
        };

        insforge.realtime.on('CLIENT_CHANGE', handleClientEvent);
        setIsSubscribed(true);
        console.log('✅ Subscribed to clients channel:', channel);

        unsubscribe = () => {
          insforge.realtime.off('CLIENT_CHANGE', handleClientEvent);
          insforge.realtime.unsubscribe(channel);
          console.log('🔌 Unsubscribed from clients channel');
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
  }, [options.teamId, fetchClients, options]);

  // Fallback to polling every 30 seconds if not subscribed
  useEffect(() => {
    if (isSubscribed) return;

    const interval = setInterval(() => {
      fetchClients();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [isSubscribed, fetchClients]);

  return {
    clients,
    loading,
    error,
    isSubscribed,
    refetch: fetchClients,
  };
}
