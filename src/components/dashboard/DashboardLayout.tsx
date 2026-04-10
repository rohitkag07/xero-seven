import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { List } from '@phosphor-icons/react';
import { Sidebar } from './Sidebar';

export function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-emerald-500/30 font-geist">
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header (visible only on small screens) */}
        <header className="h-16 border-b border-zinc-900/50 flex items-center px-4 md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 mr-3 text-zinc-400 hover:text-white bg-zinc-900/50 rounded-lg"
          >
            <List size={24} />
          </button>
          <span className="font-bold text-lg text-white">Xero Seven</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-10 max-w-7xl w-full mx-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
