import { motion } from 'framer-motion';
import { WhatsappLogoIcon } from '@phosphor-icons/react';

export function WhatsAppToggle() {
  return (
    <motion.a
      href="https://wa.me/917869161842"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      whileHover={{ scale: 1.05, y: -4, boxShadow: '6px 6px 0 var(--charcoal)' }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        width: 56,
        height: 56,
        borderRadius: 18,
        background: '#25D366',
        color: 'var(--bone)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3.5px solid var(--charcoal)',
        boxShadow: '4px 4px 0 var(--charcoal)',
        cursor: 'pointer',
      }}
    >
      <WhatsappLogoIcon weight="duotone" size={32} color="var(--charcoal)" />
    </motion.a>
  );
}
