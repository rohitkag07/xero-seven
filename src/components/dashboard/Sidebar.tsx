import { Link, useLocation } from 'react-router-dom';
import { SquaresFour, Users, ProjectorScreenChart, ChartLineUp, Robot, FileText, X, Crosshair } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const NAV_ITEMS = [
  { name: 'Overview', path: '/dashboard', icon: <SquaresFour size={24} /> },
  { name: 'Mission Control', path: '/dashboard/mission-control', icon: <Crosshair size={24} /> },
  { name: 'Leads', path: '/dashboard/leads', icon: <Users size={24} /> },
  { name: 'Clients', path: '/dashboard/clients', icon: <Users size={24} /> },
  { name: 'Proposals', path: '/dashboard/proposals', icon: <FileText size={24} /> },
  { name: 'Projects', path: '/dashboard/projects', icon: <ProjectorScreenChart size={24} /> },
  { name: 'Analytics', path: '/dashboard/analytics', icon: <ChartLineUp size={24} /> },
  { name: 'AI Fleet', path: '/dashboard/agents', icon: <Robot size={24} /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-zinc-950/95 md:bg-zinc-950/80 backdrop-blur-xl border-r border-zinc-900/50 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-zinc-900/50">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => onClose()}>
            <Robot size={28} weight="duotone" className="text-emerald-500 group-hover:animate-pulse-slow" />
            <span className="font-geist text-xl font-bold tracking-tight text-white">Xero Seven</span>
          </Link>
          <button onClick={onClose} className="md:hidden text-zinc-400 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => onClose()}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                {item.icon}
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute left-0 w-1 h-8 bg-emerald-500 rounded-r-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Profile */}
        <div className="p-4 border-t border-zinc-900/50">
          <div className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-zinc-400 font-medium">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-zinc-950 font-bold text-sm shrink-0 uppercase">
              {user?.fullName?.charAt(0) || 'R'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user?.fullName || 'Rohit Kag'}</p>
              <p className="text-xs text-zinc-500 truncate capitalize">{user?.role || 'Admin'}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
