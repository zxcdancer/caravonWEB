'use client';

import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

type GalleryItem = {
  filename: string;
  category: 'voor' | 'na';
  uploadedAt: string;
};

export default function GalleryGrid() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'voor' | 'na'>('all');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(data => { setPhotos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);
  const slides = filtered.map(p => ({ src: `/images/gallery/${p.filename}` }));

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Filter tabs */}
      {photos.length > 0 && (
        <div className="flex gap-2 mb-6 justify-center">
          {(['all', 'voor', 'na'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition ${
                filter === f
                  ? 'bg-[#E8640A] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'Alles' : f === 'voor' ? 'Voor reparatie' : 'Na reparatie'}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <div className="text-5xl mb-4">🖼️</div>
          <p className="text-lg font-medium">Foto&apos;s komen binnenkort</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo, i) => (
            <button
              key={photo.filename}
              onClick={() => { setIndex(i); setOpen(true); }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
            >
              <img
                src={`/images/gallery/${photo.filename}`}
                alt={photo.category === 'voor' ? 'Voor reparatie' : 'Na reparatie'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${
                photo.category === 'voor'
                  ? 'bg-blue-500/90 text-white'
                  : 'bg-green-500/90 text-white'
              }`}>
                {photo.category === 'voor' ? 'Voor' : 'Na'}
              </div>
            </button>
          ))}
        </div>
      )}

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
