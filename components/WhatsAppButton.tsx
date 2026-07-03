'use client';

import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/31641380360"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg shadow-black/20 flex items-center justify-center"
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
  );
}
