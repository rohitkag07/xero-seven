import { useState } from 'react';
import { useRealtimeLeads } from '../../hooks/useRealtimeLeads';
import { useLeads } from '../../hooks/useLeads';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Pencil, Trash2, AlertCircle, Loader, X, Wifi, WifiOff } from 'lucide-react';
import { useLeadFilters } from '../../stores/useDataFilters';
import { FilterBar } from '../../components/dashboard/FilterBar';
import { useMemo } from 'react';

export function LeadsPage() {
  const { user } = useAuth();
  const { leads, loading, error, isSubscribed } = useRealtimeLeads({
    teamId: user?.teamId,
  });
  const { createLead, updateLead, deleteLead } = useLeads({
    teamId: user?.teamId,
    limit: 50,
  });

  const { searchQuery, setSearchQuery, sortBy, setSortBy } = useLeadFilters();

  const filteredAndSortedLeads = useMemo(() => {
    let result = [...leads];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company && l.company.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return result;
  }, [leads, searchQuery, sortBy]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ResetForm = () => {
    setFormData({ name: '', email: '', phone: '', company: '' });
    setEditingId(null);
    setShowForm(false);
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      if (editingId) {
        await updateLead(editingId, {
          ...formData,
          id: editingId,
          createdAt: new Date().toISOString(),
        });
      } else {
        await createLead({
          ...formData,
          ownerId: user?.id,
          teamId: user?.teamId,
        });
      }
      ResetForm();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save lead');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure? This cannot be undone.')) {
      try {
        await deleteLead(id);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : 'Failed to delete lead');
      }
    }
  };

  const handleEdit = (lead: any) => {
    setEditingId(lead.id);
    setFormData({
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.company || '',
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-white">Leads</h1>
            <p className="text-zinc-400 mt-1">Manage and track potential customers</p>
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
          onClick={() => {
            ResetForm();
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>

      <FilterBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 flex items-gap-3">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit Error */}
      {submitError && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 flex items-gap-3">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {editingId ? 'Edit Lead' : 'Add New Lead'}
              </h2>
              <button
                onClick={ResetForm}
                className="text-zinc-400 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                  placeholder="Lead name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                  placeholder="lead@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
                  placeholder="Company name"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={ResetForm}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-lg transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !formData.name || !formData.email}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting && <Loader size={16} className="animate-spin" />}
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && !leads.length ? (
        <div className="text-center py-12">
          <Loader size={32} className="animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-zinc-400">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
          <p className="text-zinc-400 mb-4">No leads yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            <Plus size={18} />
            Add your first lead
          </button>
        </div>
      ) : filteredAndSortedLeads.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
          <p className="text-zinc-400 mb-4">No leads match your search criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">
                  Phone
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-300">
                  Company
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="py-4 px-4 text-white font-medium">{lead.name}</td>
                  <td className="py-4 px-4 text-zinc-400">{lead.email}</td>
                  <td className="py-4 px-4 text-zinc-400">{lead.phone || '—'}</td>
                  <td className="py-4 px-4 text-zinc-400">{lead.company || '—'}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(lead)}
                        className="p-2 hover:bg-white/10 text-zinc-400 hover:text-white rounded transition"
                        title="Edit lead"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="p-2 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded transition"
                        title="Delete lead"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats Footer */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center text-sm text-zinc-400">
        {filteredAndSortedLeads.length} {filteredAndSortedLeads.length === 1 ? 'lead' : 'leads'}
      </div>
    </div>
  );
}
