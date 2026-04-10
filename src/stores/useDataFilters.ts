import { create } from 'zustand';

interface FilterState {
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'name';
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'newest' | 'oldest' | 'name') => void;
  reset: () => void;
}

const createFilterStore = () =>
  create<FilterState>((set) => ({
    searchQuery: '',
    sortBy: 'newest',
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setSortBy: (sortBy) => set({ sortBy }),
    reset: () => set({ searchQuery: '', sortBy: 'newest' }),
  }));

export const useLeadFilters = createFilterStore();
export const useProjectFilters = createFilterStore();
export const useClientFilters = createFilterStore();
export const useProposalFilters = createFilterStore();
