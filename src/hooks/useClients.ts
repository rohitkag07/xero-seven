import { useState, useEffect, useCallback } from 'react';
import { insforge } from '../lib/insforge';

export interface Client {
  id: string;
  name: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  teamId?: string;
  ownerId?: string;
  createdAt: string;
}

interface UseClientsOptions {
  teamId?: string;
  limit?: number;
}

export function useClients(options: UseClientsOptions = {}) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let query = insforge.database.from('agency_clients').select('*');

      if (options.teamId) {
        query = query.eq('team_id', options.teamId);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setClients(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch clients';
      setError(errorMessage);
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  }, [options.teamId, options.limit]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = useCallback(
    async (input: Omit<Client, 'id' | 'createdAt'>) => {
      try {
        setError(null);
        const { data, error: insertError } = await insforge.database
          .from('agency_clients')
          .insert({
            name: input.name,
            company: input.company,
            status: input.status,
            team_id: input.teamId,
            owner_id: input.ownerId,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (data) {
          setClients((prev) => [data, ...prev]);
        }
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create client';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const updateClient = useCallback(async (id: string, input: Partial<Client>) => {
    try {
      setError(null);
      const { data, error: updateError } = await insforge.database
        .from('agency_clients')
        .update({
          name: input.name,
          company: input.company,
          status: input.status,
        })
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;
      if (data) {
        setClients((prev) =>
          prev.map((client) => (client.id === id ? (data as Client) : client))
        );
      }
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update client';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const deleteClient = useCallback(async (id: string) => {
    try {
      setError(null);
      const { error: deleteError } = await insforge.database
        .from('agency_clients')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      setClients((prev) => prev.filter((client) => client.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete client';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    clients,
    loading,
    error,
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  };
}
