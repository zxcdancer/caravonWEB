'use client';

import { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import BeforeAfterSlider from './BeforeAfterSlider';

type GalleryItem = {
  filename: string;
  category: 'voor' | 'na';
  uploadedAt: string;
};

type Tab = 'vergelijking' | 'all' | 'voor' | 'na';

export default function GalleryGrid() {
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [tab, setTab] = useState<Tab>('vergelijking');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then((data: GalleryItem[]) => { setPhotos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const voorPhotos = photos.filter(p => p.category === 'voor');
  const naPhotos = photos.filter(p => p.category === 'na');

  // Pair nth voor with nth na
  const pairs = Array.from(
    { length: Math.min(voorPhotos.length, naPhotos.length) },
    (_, i) => ({ voor: voorPhotos[i], na: naPhotos[i] })
  );

  const gridPhotos =
    tab === 'all' ? photos :
    tab === 'voor' ? voorPhotos :
    tab === 'na' ? naPhotos : [];

  const slides = gridPhotos.map(p => ({ src: `/images/gallery/${p.filename}` }));

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'vergelijking', label: 'Voor / Na', count: pairs.length },
    { key: 'all', label: 'Alle foto\'s', count: photos.length },
    { key: 'voor', label: 'Voor', count: voorPhotos.length },
    { key: 'na', label: 'Na', count: naPhotos.length },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-24 text-gray-400">
        <div className="text-5xl mb-4">🖼️</div>
        <p className="text-lg font-medium">Foto&apos;s komen binnenkort</p>
      </div>
    );
  }

  return (
    <>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition flex items-center gap-1.5 ${
              tab === t.key
                ? 'bg-[#E8640A] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === t.key ? 'bg-white/25' : 'bg-gray-200 text-gray-500'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Vergelijking (before/after sliders) */}
      {tab === 'vergelijking' && (
        pairs.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium">Nog geen voor/na paren beschikbaar</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pairs.map((pair, i) => (
              <BeforeAfterSlider
                key={i}
                voorSrc={`/images/gallery/${pair.voor.filename}`}
                naSrc={`/images/gallery/${pair.na.filename}`}
              />
            ))}
          </div>
        )
      )}

      {/* Photo grid */}
      {tab !== 'vergelijking' && (
        gridPhotos.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="font-medium">Geen foto&apos;s in deze categorie</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {gridPhotos.map((photo, i) => (
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

            <Lightbox
              open={open}
              close={() => setOpen(false)}
              index={index}
              slides={slides}
              on={{ view: ({ index: i }) => setIndex(i) }}
            />
          </>
        )
      )}
    </>
  );
}
