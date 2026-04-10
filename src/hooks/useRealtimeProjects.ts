import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';
import type { Project } from './useProjects';


export interface UseRealtimeProjectsOptions {
  teamId?: string;
  onError?: (error: Error) => void;
}

export function useRealtimeProjects(options: UseRealtimeProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Fetch initial projects
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_projects').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
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
        await fetchProjects();

        // Ensure realtime is connected
        if (!insforge.realtime.isConnected) {
          await insforge.realtime.connect();
        }

        // Subscribe to real-time channel
        const channel = `projects:${options.teamId || 'global'}`;
        await insforge.realtime.subscribe(channel);
        
        // Listen for events
        const handleProjectEvent = (payload: any) => {
          // Verify it's for our channel
          if (payload.meta?.channel !== channel) return;

          const { action, data, id } = payload;

          if (action === 'INSERT' && data) {
            setProjects((prev) => [data, ...prev]);
          } else if (action === 'UPDATE' && data) {
            setProjects((prev) =>
              prev.map((project) => (project.id === id ? data : project))
            );
          } else if (action === 'DELETE' && id) {
            setProjects((prev) => prev.filter((project) => project.id !== id));
          }
        };

        insforge.realtime.on('PROJECT_CHANGE', handleProjectEvent);
        setIsSubscribed(true);
        console.log('✅ Subscribed to projects channel:', channel);

        unsubscribe = () => {
          insforge.realtime.off('PROJECT_CHANGE', handleProjectEvent);
          insforge.realtime.unsubscribe(channel);
          console.log('🔌 Unsubscribed from projects channel');
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
  }, [options.teamId, fetchProjects, options]);

  // Fallback to polling every 30 seconds if not subscribed
  useEffect(() => {
    if (isSubscribed) return;

    const interval = setInterval(() => {
      fetchProjects();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [isSubscribed, fetchProjects]);

  return {
    projects,
    loading,
    error,
    isSubscribed,
    refetch: fetchProjects,
  };
}
