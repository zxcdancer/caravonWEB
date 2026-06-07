'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRAME_SVGS } from './LogoFrames';

const FRAME_MS = 200;
const PAUSE_MS = 1500;
const FLY_DURATION = 0.6;

type Phase = 'playing' | 'waiting' | 'flying' | 'done';

export default function IntroAnimation() {
  const [show, setShow] = useState(false);
  const [phase, setPhase] = useState<Phase>('playing');
  const [frameIdx, setFrameIdx] = useState(0);

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined') {
      const seen = sessionStorage.getItem('caravon-intro-seen');
      if (seen) return;
      sessionStorage.setItem('caravon-intro-seen', '1');
    }
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || phase !== 'playing') return;
    if (frameIdx < FRAME_SVGS.length - 1) {
      const t = setTimeout(() => setFrameIdx(i => i + 1), FRAME_MS);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase('waiting'), FRAME_MS);
      return () => clearTimeout(t);
    }
  }, [show, phase, frameIdx]);

  useEffect(() => {
    if (!show || phase !== 'waiting') return;
    const t = setTimeout(() => setPhase('flying'), PAUSE_MS);
    return () => clearTimeout(t);
  }, [show, phase]);

  useEffect(() => {
    if (!show || phase !== 'flying') return;
    const t = setTimeout(() => setPhase('done'), FLY_DURATION * 1000 + 100);
    return () => clearTimeout(t);
  }, [show, phase]);

  if (!show || phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ backgroundColor: '#F5C5A3' }}
        animate={phase === 'flying' ? {
          opacity: 0,
          transition: { duration: FLY_DURATION, ease: 'easeInOut' }
        } : { opacity: 1 }}
      >
        {/* SVG frame animation (drawing effect) */}
        <motion.div
          className="w-full max-w-[560px] px-8"
          animate={phase === 'flying' ? {
            y: -320,
            scale: 0.36,
            transition: { duration: FLY_DURATION, ease: [0.4, 0, 0.2, 1] }
          } : {}}
        >
          {/* SVG frames — draw effect */}
          <div className="relative w-full" style={{ paddingTop: '16.94%' }}>
            {FRAME_SVGS.map((svg, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-100"
                style={{ opacity: i === frameIdx ? 1 : 0 }}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ))}
          </div>

          {/* Underline */}
          <div
            className="h-[2px] mt-2 bg-dark/40 origin-left"
            style={{
              transform: phase !== 'playing' ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="mt-6 text-dark/60 text-sm font-medium tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'waiting' ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          Kwalitatieve reparaties voor campers & caravans
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
