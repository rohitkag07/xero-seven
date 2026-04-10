import { useState } from 'react';
import { Pencil, Trash2, AlertCircle, X, Plus, CheckCircle, Loader, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useRealtimeClients } from '../../hooks/useRealtimeClients';
import type { Client } from '../../hooks/useClients';
import { useClients } from '../../hooks/useClients';
import { useClientFilters } from '../../stores/useDataFilters';
import { FilterBar } from '../../components/dashboard/FilterBar';
import { useMemo } from 'react';

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border border-green-500/30',
  inactive: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
  prospect: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
};

export function ClientsPage() {
  const { user } = useAuth();
  const { clients, loading, error, isSubscribed } = useRealtimeClients({ teamId: user?.teamId });
  const { createClient, updateClient, deleteClient } = useClients({ teamId: user?.teamId });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Client, 'id' | 'createdAt'>>({ name: '', company: '', status: 'prospect' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { searchQuery, setSearchQuery, sortBy, setSortBy } = useClientFilters();

  const filteredAndSortedClients = useMemo(() => {
    let result = [...clients];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(q) ||
          c.company?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      // NOTE: client type typically has createdAt, fallback to default.
      if (sortBy === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      }
      return 0; // Simple fallback
    });

    return result;
  }, [clients, searchQuery, sortBy]);

  const handleAdd = () => {
    setFormData({ name: '', company: '', status: 'prospect' });
    setEditingId(null);
    setSubmitError(null);
    setShowForm(true);
  };

  const handleEdit = (client: Client) => {
    setFormData({
      name: client.name || '',
      company: client.company || '',
      status: client.status || 'prospect',
    });
    setEditingId(client.id);
    setSubmitError(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setSubmitError('Client name is required');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      if (editingId) {
        await updateClient(editingId, formData);
      } else {
        await createClient(formData);
      }

      setShowForm(false);
      setFormData({ name: '', company: '', status: 'prospect' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save client');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this client?')) {
      try {
        await deleteClient(id);
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Clients</h1>
            <p className="text-zinc-400">Manage your client relationships and track their status.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
            {isSubscribed ? (
              <>
                <Wifi size={16} className="text-emerald-500" />
                <span className="text-xs text-emerald-400 font-medium">Live</span>
              </>
            ) : (
              <>
                <WifiOff size={16} className="text-yellow-500" />
                <span className="text-xs text-yellow-400 font-medium">Polling</span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-colors"
        >
          <Plus size={20} /> Add Client
        </button>
      </div>

      <div className="mb-6">
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Client' : 'Add Client'}</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {submitError && (
              <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 mb-4">
                <AlertCircle size={18} />
                <span className="text-sm">{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Company (optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'prospect' })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="prospect">Prospect</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? <Loader size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                {submitting ? 'Saving...' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader size={32} className="text-emerald-500 animate-spin" />
        </div>
      ) : clients.length === 0 ? (
        /* Empty State */
        <div className="bg-zinc-900/30 border border-dashed border-zinc-800/50 rounded-3xl p-16 text-center">
          <h3 className="text-xl font-bold text-white mb-2">No clients yet</h3>
          <p className="text-zinc-400 mb-6">Add your first client to get started</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-colors"
          >
            <Plus size={18} /> Add Client
          </button>
        </div>
      ) : filteredAndSortedClients.length === 0 ? (
        <div className="bg-zinc-900/30 border border-dashed border-zinc-800/50 rounded-3xl p-16 text-center">
          <p className="text-zinc-400 mb-6">No clients match your search criteria.</p>
        </div>
      ) : (
        /* Table */
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredAndSortedClients.map((client) => (
                <tr key={client.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{client.name}</td>
                  <td className="px-6 py-4 text-zinc-400">{client.company || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[client.status] || STATUS_COLORS.prospect}`}>
                      {client.status || 'prospect'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-zinc-400 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-4 text-center text-zinc-400">
        <span className="text-sm">Total Clients: <span className="font-bold text-white">{filteredAndSortedClients.length}</span></span>
      </div>
    </div>
  );
}
