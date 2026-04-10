import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';

export interface Proposal {
  id: string;
  leadName: string;
  leadEmail: string;
  content: string;
  status: 'pending' | 'sent' | 'accepted' | 'rejected';
  teamId?: string;
  ownerId?: string;
  createdAt: string;
}

interface UseProposalsOptions {
  teamId?: string;
  limit?: number;
}

export function useProposals(options: UseProposalsOptions = {}) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_proposals').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProposals(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch proposals';
      setError(errorMessage);
      console.error('Error fetching proposals:', err);
    } finally {
      setLoading(false);
    }
  }, [options.teamId, options.limit]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const createProposal = useCallback(
    async (input: Omit<Proposal, 'id' | 'createdAt'>) => {
      try {
        setError(null);
        const { data, error: insertError } = await insforge.database
          .from('agency_proposals')
          .insert({
            lead_name: input.leadName,
            lead_email: input.leadEmail,
            content: input.content,
            status: input.status,
            team_id: input.teamId,
            owner_id: input.ownerId,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (data) {
          setProposals((prev) => [data, ...prev]);
        }
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create proposal';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const updateProposal = useCallback(async (id: string, input: Partial<Proposal>) => {
    try {
      setError(null);
      const { data, error: updateError } = await insforge.database
        .from('agency_proposals')
        .update({
          lead_name: input.leadName,
          lead_email: input.leadEmail,
          content: input.content,
          status: input.status,
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (data) {
        setProposals((prev) =>
          prev.map((proposal) => (proposal.id === id ? (data as Proposal) : proposal))
        );
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update proposal';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const deleteProposal = useCallback(async (id: string) => {
    try {
      setError(null);
      const { error: deleteError } = await insforge.database
        .from('agency_proposals')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setProposals((prev) => prev.filter((proposal) => proposal.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete proposal';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    proposals,
    loading,
    error,
    fetchProposals,
    createProposal,
    updateProposal,
    deleteProposal,
  };
}
