import { getTranslations, getLocale } from 'next-intl/server';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export default async function GalerijPage() {
  const t = await getTranslations('gallery');

  return (
    <div>
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #F5C5A3 0%, #FBE8D8 100%)' }}>
        <h1 className="text-5xl font-black text-dark mb-4">{t('title')}</h1>
        <p className="text-dark/60 text-xl font-medium">{t('subtitle')}</p>
      </section>

      <section className="py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <GalleryGrid />
        </div>
      </section>
    </div>
  );
}
