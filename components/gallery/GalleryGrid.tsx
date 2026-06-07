'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Placeholder gallery items (replace with real photos)
const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `https://placehold.co/800x600/F5C5A3/1A1A1A?text=Werk+${i + 1}`,
  thumb: `https://placehold.co/400x300/F5C5A3/1A1A1A?text=Werk+${i + 1}`,
  label: `Project ${i + 1}`,
}));

export default function GalleryGrid() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = GALLERY_ITEMS.map(item => ({ src: item.src }));

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {GALLERY_ITEMS.map((item, i) => (
          <button
            key={item.id}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="group relative aspect-square overflow-hidden rounded-xl bg-peach-light"
          >
            <img
              src={item.thumb}
              alt={item.label}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors" />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </>
  );
}
