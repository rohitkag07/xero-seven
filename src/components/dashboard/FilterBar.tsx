

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: 'newest' | 'oldest' | 'name';
  setSortBy: (s: 'newest' | 'oldest' | 'name') => void;
}

export function FilterBar({ searchQuery, setSearchQuery, sortBy, setSortBy }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-zinc-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="search"
            name="search"
            className="block w-full pl-9 pr-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
            placeholder="Search..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="sort" className="sr-only">Sort by</label>
        <select
          id="sort"
          name="sort"
          className="block w-full px-3 py-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 appearance-none cursor-pointer"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name')}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Alphabetical</option>
        </select>
      </div>
    </div>
  );
}
