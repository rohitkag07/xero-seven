import { useState } from 'react';
import { Pencil, Trash2, AlertCircle, X, Plus, CheckCircle, Loader, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useRealtimeProjects } from '../../hooks/useRealtimeProjects';
import type { Project } from '../../hooks/useProjects';
import { useProjects } from '../../hooks/useProjects';
import { useProjectFilters } from '../../stores/useDataFilters';
import { FilterBar } from '../../components/dashboard/FilterBar';
import { useMemo } from 'react';

const STATUS_COLORS: Record<string, string> = {
  planning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border border-green-500/30',
  'on-hold': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
};

export function ProjectsPage() {
  const { user } = useAuth();
  const { projects, loading, error, isSubscribed } = useRealtimeProjects({ teamId: user?.teamId });
  const { createProject, updateProject, deleteProject } = useProjects({ teamId: user?.teamId });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'createdAt'>>({ title: '', status: 'planning' });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { searchQuery, setSearchQuery, sortBy, setSortBy } = useProjectFilters();

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.status?.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      // NOTE: Project type usually has createdAt, but if not we can sort by id or nothing
      if (sortBy === 'name') {
        return (a.title || '').localeCompare(b.title || '');
      }
      return 0; // Or standard sort if createdAt exists
    });

    return result;
  }, [projects, searchQuery, sortBy]);

  const handleAdd = () => {
    setFormData({ title: '', status: 'planning' });
    setEditingId(null);
    setSubmitError(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title || '',
      status: project.status || 'planning',
    });
    setEditingId(project.id);
    setSubmitError(null);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setSubmitError('Project title is required');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      if (editingId) {
        await updateProject(editingId, formData);
      } else {
        await createProject(formData);
      }

      setShowForm(false);
      setFormData({ title: '', status: 'planning' });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this project?')) {
      try {
        await deleteProject(id);
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
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Projects</h1>
            <p className="text-zinc-400">Track the status of all active and completed client deployments.</p>
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
          <Plus size={20} /> Add Project
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
              <h2 className="text-2xl font-bold text-white">{editingId ? 'Edit Project' : 'Add Project'}</h2>
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
                <label className="block text-sm font-medium text-zinc-300 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'planning' | 'in-progress' | 'completed' | 'on-hold' })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="planning">Planning</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
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
      ) : projects.length === 0 ? (
        /* Empty State */
        <div className="bg-zinc-900/30 border border-dashed border-zinc-800/50 rounded-3xl p-16 text-center">
          <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
          <p className="text-zinc-400 mb-6">Add your first project to get started</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-colors"
          >
            <Plus size={18} /> Add Project
          </button>
        </div>
      ) : filteredAndSortedProjects.length === 0 ? (
        <div className="bg-zinc-900/30 border border-dashed border-zinc-800/50 rounded-3xl p-16 text-center">
          <p className="text-zinc-400 mb-6">No projects match your search criteria.</p>
        </div>
      ) : (
        /* Table */
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm min-w-[800px]">
              <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800/50">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {filteredAndSortedProjects.map((project) => (
                <tr key={project.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{project.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[project.status] || STATUS_COLORS.planning}`}>
                      {project.status?.replace('-', ' ') || 'planning'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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
        <span className="text-sm">Total Projects: <span className="font-bold text-white">{filteredAndSortedProjects.length}</span></span>
      </div>
    </div>
  );
}
