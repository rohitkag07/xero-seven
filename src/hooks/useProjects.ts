import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';

export interface Project {
  id: string;
  title: string;
  clientId?: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  teamId?: string;
  ownerId?: string;
  createdAt: string;
}

interface UseProjectsOptions {
  teamId?: string;
  limit?: number;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_projects').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }, [options.teamId, options.limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(
    async (input: Omit<Project, 'id' | 'createdAt'>) => {
      try {
        setError(null);
        const { data, error: insertError } = await insforge.database
          .from('agency_projects')
          .insert({
            title: input.title,
            client_id: input.clientId,
            status: input.status,
            team_id: input.teamId,
            owner_id: input.ownerId,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (data) {
          setProjects((prev) => [data, ...prev]);
        }
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create project';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const updateProject = useCallback(async (id: string, input: Partial<Project>) => {
    try {
      setError(null);
      const { data, error: updateError } = await insforge.database
        .from('agency_projects')
        .update({
          title: input.title,
          client_id: input.clientId,
          status: input.status,
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (data) {
        setProjects((prev) =>
          prev.map((project) => (project.id === id ? (data as Project) : project))
        );
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    try {
      setError(null);
      const { error: deleteError } = await insforge.database
        .from('agency_projects')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
