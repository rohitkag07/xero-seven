import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ListIcon, XIcon } from '@phosphor-icons/react';

const navLinks = [
  { label: 'SERVICES',     path: '/services' },
  { label: 'HOW IT WORKS', path: '/how-it-works' },
  { label: 'ABOUT',        path: '/about' },
  { label: 'CONTACT',      path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="absolute -top-full -left-full focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-white focus:text-zinc-900 focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        className="absolute top-0 left-0 right-0 w-full z-50"
        style={{
          background: 'var(--mustard)',
          borderBottom: '3px solid var(--charcoal)',
          boxShadow: '0 3px 0 var(--charcoal)',
          borderRadius: 0,
        }}
      >
        <div
          style={{
            background: 'transparent',
            border: 'none',
            borderRadius: 0,
            padding: '16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            boxShadow: 'none',
            width: '100%',
            justifyContent: 'space-between',
            minWidth: 0,
            overflow: 'hidden',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
          className="w-full min-w-0 px-4 md:px-8"
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              paddingLeft: 8,
              paddingRight: 10,
              textDecoration: 'none',
              flexShrink: 0,
              minWidth: 0,
            }}
            className="md:gap-10 md:pl-10 md:pr-12 min-w-0"
          >
            {/* X mark */}
            <div
              style={{
                width: 36,
                height: 36,
                background: 'var(--charcoal)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="md:w-[44px] md:h-[44px] md:rounded-[12px]"
            >
              <span
                style={{
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 16,
                  color: 'var(--mustard)',
                  lineHeight: 1,
                }}
                className="md:text-xl"
              >
                X
              </span>
            </div>
            <span
              style={{
                fontFamily: '"Archivo Black", sans-serif',
                fontSize: 14,
                color: 'var(--charcoal)',
                letterSpacing: '0.06em',
                display: 'block',
              }}
              className="md:text-base"
            >
              XERO SEVEN
            </span>
          </Link>

          {/* Divider */}
          <div style={{ width: 2, height: 20, background: 'var(--charcoal)', opacity: 0.2, borderRadius: 1, margin: '0 4px' }} className="hidden md:block" />

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-2 min-w-0">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  background: location.pathname === link.path ? 'var(--charcoal)' : 'transparent',
                  color: location.pathname === link.path ? 'var(--bone)' : 'var(--charcoal)',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Status dot + Get Started */}
          <div className="hidden md:flex items-center gap-4 ml-2 mr-2 min-w-0">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--mint)',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(99,226,180,0.3)',
                  animation: 'pulse 2s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
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
                  border: '3px solid var(--charcoal)',
                  borderRadius: 999,
                  padding: '10px 20px',
                  fontFamily: '"Archivo Black", sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0 var(--charcoal)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(-2px,-2px)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '6px 6px 0 var(--charcoal)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translate(0,0)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '4px 4px 0 var(--charcoal)';
                }}
              >
                DASHBOARD ↗
              </button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-auto"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: 'var(--charcoal)',
              fontSize: 24,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 0,
            }}
          >
            {isOpen ? <XIcon weight="bold" size={28} /> : <ListIcon weight="bold" size={28} />}
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
              gap: 12,
              paddingTop: 80,
              paddingBottom: 40,
              paddingLeft: 16,
              paddingRight: 16,
            }}
            onClick={() => setIsOpen(false)}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 28,
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
              onClick={(e) => e.stopPropagation()}
            >
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <button
                  style={{
                    background: 'var(--red)',
                    color: 'var(--bone)',
                    border: '3px solid var(--charcoal)',
                    borderRadius: 999,
                    padding: '12px 24px',
                    fontFamily: '"Archivo Black", sans-serif',
                    fontSize: 12,
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
