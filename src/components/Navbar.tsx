import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'SERVICES',   path: '/services' },
  { label: 'PRODUCTION', path: '/production' },
  { label: 'ABOUT',      path: '/about' },
  { label: 'CONTACT',    path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-zinc-900 focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-max"
      >
        <div
          style={{
            background: 'var(--bone)',
            border: '3px solid var(--charcoal)',
            borderRadius: 999,
            padding: '6px 8px',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            boxShadow: '4px 4px 0 var(--charcoal)',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              paddingLeft: 10,
              paddingRight: 12,
              textDecoration: 'none',
            }}
          >
            {/* X mark */}
            <div
              style={{
                width: 30,
                height: 30,
                background: 'var(--charcoal)',
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 16,
                  color: 'var(--mustard)',
                  lineHeight: 1,
                }}
              >
                X
              </span>
            </div>
            <span
              style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 13,
                color: 'var(--charcoal)',
                letterSpacing: '0.06em',
              }}
            >
              XERO SEVEN
            </span>
          </Link>

          {/* Divider */}
          <div style={{ width: 2, height: 20, background: 'var(--charcoal)', opacity: 0.2, borderRadius: 1, margin: '0 4px' }} />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '7px 14px',
                  borderRadius: 999,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  background: location.pathname === link.path ? 'var(--charcoal)' : 'transparent',
                  color: location.pathname === link.path ? 'var(--bone)' : 'var(--charcoal)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Status dot + Get Started */}
          <div className="hidden md:flex items-center gap-3 ml-2 mr-1">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#22c55e',
                  display: 'inline-block',
                  boxShadow: '0 0 0 2px rgba(34,197,94,0.3)',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  color: 'var(--charcoal)',
                  opacity: 0.7,
                }}
              >
                INDORE
              </span>
            </div>
            <Link to="/dashboard">
              <button
                style={{
                  background: 'var(--red)',
                  color: 'var(--bone)',
                  border: '2.5px solid var(--charcoal)',
                  borderRadius: 999,
                  padding: '7px 16px',
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0 var(--charcoal)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-1px,-1px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '4px 4px 0 var(--charcoal)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(0,0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '3px 3px 0 var(--charcoal)';
                }}
              >
                DASHBOARD ↗
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: 'var(--charcoal)',
              fontSize: 20,
              lineHeight: 1,
            }}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
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
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              background: 'var(--bone)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 36,
                    color: 'var(--charcoal)',
                    textDecoration: 'none',
                    padding: '8px 0',
                    letterSpacing: '0.04em',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.4 }}
              style={{ marginTop: 24 }}
            >
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <button
                  style={{
                    background: 'var(--red)',
                    color: 'var(--bone)',
                    border: '3px solid var(--charcoal)',
                    borderRadius: 999,
                    padding: '14px 32px',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 14,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    boxShadow: '4px 4px 0 var(--charcoal)',
                  }}
                >
                  DASHBOARD ↗
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
