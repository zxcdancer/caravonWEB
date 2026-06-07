'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

type Props = {
  voorSrc: string;
  naSrc: string;
  fullscreen?: boolean;
};

function SliderInner({ voorSrc, naSrc, fullscreen = false }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  useEffect(() => {
    const stop = () => { dragging.current = false; };
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none touch-none cursor-ew-resize ${
        fullscreen ? 'w-full h-full' : 'w-full h-full rounded-2xl'
      }`}
      onMouseMove={e => { if (dragging.current) updatePosition(e.clientX); }}
      onTouchMove={e => { if (dragging.current) updatePosition(e.touches[0].clientX); }}
    >
      <img
        src={naSrc}
        alt="Na reparatie"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <img
        src={voorSrc}
        alt="Voor reparatie"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center z-10 cursor-ew-resize"
        style={{ left: `${position}%` }}
        onMouseDown={e => { e.stopPropagation(); dragging.current = true; }}
        onTouchStart={e => { e.stopPropagation(); dragging.current = true; }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6 4L2 9L6 14M12 4L16 9L12 14" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none">
        Voor
      </div>
      <div className="absolute top-3 right-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none">
        Na
      </div>
    </div>
  );
}

export default function BeforeAfterSlider({ voorSrc, naSrc }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  return (
    <>
      {/* Card with hover scale + zoom icon */}
      <div
        className="group relative aspect-[4/3] cursor-zoom-in transition-transform duration-300 hover:scale-[1.03] hover:z-10"
        onClick={() => setModalOpen(true)}
      >
        <SliderInner voorSrc={voorSrc} naSrc={naSrc} />

        {/* Zoom hint on hover */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-hover:ring-white/60 transition-all duration-300 pointer-events-none" />
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/>
          </svg>
        </div>
      </div>

      {/* Fullscreen modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ aspectRatio: '16/10' }}
            onClick={e => e.stopPropagation()}
          >
            <SliderInner voorSrc={voorSrc} naSrc={naSrc} fullscreen />

            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              Sluiten
              <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-lg leading-none">×</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
