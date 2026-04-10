import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  teamId?: string;
  ownerId?: string;
  createdAt: string;
}

interface UseLeadsOptions {
  teamId?: string;
  limit?: number;
}

export function useLeads(options: UseLeadsOptions = {}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_leads').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setLeads(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch leads';
      setError(errorMessage);
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  }, [options.teamId, options.limit]);

  // Initial fetch
  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Create lead
  const createLead = useCallback(
    async (input: Omit<Lead, 'id' | 'createdAt'>) => {
      try {
        setError(null);
        const { data, error: insertError } = await insforge.database
          .from('agency_leads')
          .insert({
            name: input.name,
            email: input.email,
            phone: input.phone,
            company: input.company,
            team_id: input.teamId,
            owner_id: input.ownerId,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (data) {
          setLeads((prev) => [data, ...prev]);
        }
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create lead';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  // Update lead
  const updateLead = useCallback(async (id: string, input: Partial<Lead>) => {
    try {
      setError(null);
      const { data, error: updateError } = await insforge.database
        .from('agency_leads')
        .update({
          name: input.name,
          email: input.email,
          phone: input.phone,
          company: input.company,
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (data) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? (data as Lead) : lead))
        );
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update lead';
      setError(errorMessage);
      throw err;
    }
  }, []);

  // Delete lead
  const deleteLead = useCallback(async (id: string) => {
    try {
      setError(null);
      const { error: deleteError } = await insforge.database
        .from('agency_leads')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete lead';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
    deleteLead,
  };
}
