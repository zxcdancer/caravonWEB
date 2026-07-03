'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

export default function WhatsAppButton() {
  const [showLabel, setShowLabel] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    // Show label after button appears (1.5s delay + 0.5s buffer)
    const showTimer = setTimeout(() => setShowLabel(true), 2000);
    // Hide label after 10 seconds
    const hideTimer = setTimeout(() => setShowLabel(false), 12000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  const label = locale === 'nl' ? 'Neem contact op!' : 'Contact us!';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">

      {/* Label with arrow */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative flex items-center"
          >
            <div className="bg-dark text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap">
              {label}
            </div>
            {/* Arrow pointing right toward the button */}
            <div
              className="w-0 h-0 shrink-0"
              style={{
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
                borderLeft: '8px solid #1A1A1A',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/31641380360"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
        className="w-14 h-14 rounded-full shadow-lg shadow-black/20 flex items-center justify-center shrink-0"
        style={{ backgroundColor: '#25D366' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
      >
        <svg viewBox="0 0 32 32" width="30" height="30" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.47.676 4.783 1.853 6.763L2 30l7.447-1.824A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.6a11.56 11.56 0 0 1-5.88-1.6l-.42-.25-4.42 1.08 1.12-4.3-.28-.44A11.56 11.56 0 0 1 4.4 16C4.4 9.593 9.593 4.4 16 4.4S27.6 9.593 27.6 16 22.407 27.6 16 27.6zm6.33-8.67c-.347-.174-2.053-1.013-2.373-1.128-.32-.116-.553-.174-.787.174-.233.347-.9 1.128-1.107 1.36-.2.232-.406.26-.753.087-.347-.174-1.463-.54-2.787-1.72-1.03-.92-1.726-2.054-1.927-2.4-.2-.347-.02-.534.152-.707.155-.155.347-.406.52-.608.174-.2.233-.347.347-.578.116-.233.058-.435-.029-.608-.087-.174-.787-1.893-1.08-2.593-.284-.68-.573-.587-.787-.598l-.67-.012c-.233 0-.608.087-.927.434-.32.347-1.213 1.187-1.213 2.893s1.24 3.36 1.414 3.593c.174.233 2.44 3.727 5.907 5.227.826.356 1.47.568 1.973.727.828.263 1.583.226 2.18.137.665-.1 2.053-.84 2.344-1.653.29-.813.29-1.51.203-1.653-.086-.145-.32-.232-.666-.406z"/>
        </svg>
      </motion.a>
    </div>
  );
}
