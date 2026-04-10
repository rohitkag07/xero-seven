import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, Lightning } from '@phosphor-icons/react';

const navLinks = [
  { label: 'Services', path: '/services' },
  { label: 'Production', path: '/production' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Skip Navigation Link — visible on focus for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-zinc-900 focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-max"
      >
        {/* Outer bezel shell */}
        <div className="p-1.5 rounded-full bg-white/[0.03] border border-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          {/* Inner core */}
          <div className="bg-zinc-900/90 backdrop-blur-xl rounded-full px-2 py-1.5 flex items-center gap-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <Link to="/" className="flex items-center gap-2 pl-3 pr-2">
              <div className="w-6 h-6 rounded-lg bg-accent flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <Lightning weight="fill" className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-outfit font-semibold text-sm text-white tracking-tight">
                Xero Seven
              </span>
            </Link>

            {/* Divider */}
            <div className="w-px h-4 bg-white/8 mx-1" />

            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] font-dmsans ${
                    location.pathname === link.path
                      ? 'text-white bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : 'text-zinc-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button-in-button pattern */}
            <Link to="/dashboard" className="hidden md:flex items-center ml-1">
              <span className="group inline-flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-white text-zinc-900 font-outfit font-medium text-xs tracking-wide transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-zinc-100 active:scale-[0.97]">
                Dashboard
                <span className="w-5 h-5 rounded-full bg-zinc-900/10 flex items-center justify-center group-hover:bg-zinc-900/20 transition-colors">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 6.5L6.5 1.5M6.5 1.5H2.5M6.5 1.5V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors ml-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X weight="bold" className="w-4 h-4 text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <List weight="bold" className="w-4 h-4 text-zinc-400" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-2"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block text-4xl font-outfit font-light text-zinc-400 hover:text-white transition-colors duration-400 py-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-8"
            >
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="btn-primary">
                Dashboard
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
