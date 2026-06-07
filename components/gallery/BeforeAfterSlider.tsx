'use client';

import { useRef, useState, useCallback, useEffect } from 'react';

type Props = {
  voorSrc: string;
  naSrc: string;
};

export default function BeforeAfterSlider({ voorSrc, naSrc }: Props) {
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
      className="relative aspect-[4/3] overflow-hidden rounded-2xl select-none touch-none cursor-ew-resize"
      onMouseMove={e => { if (dragging.current) updatePosition(e.clientX); }}
      onTouchMove={e => { if (dragging.current) updatePosition(e.touches[0].clientX); }}
    >
      {/* Na image — full width, bottom layer */}
      <img
        src={naSrc}
        alt="Na reparatie"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Voor image — clipped to left side */}
      <img
        src={voorSrc}
        alt="Voor reparatie"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center z-10 cursor-ew-resize"
        style={{ left: `${position}%` }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
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
