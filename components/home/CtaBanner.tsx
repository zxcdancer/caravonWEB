'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function CtaBanner() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="py-20 bg-dark">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
          {t('title')}
        </h2>
        <p className="text-white/60 text-lg mb-8 font-medium">
          {t('subtitle')}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/afspraak`}
            className="bg-orange text-white font-bold text-base px-8 py-4 rounded-full hover:bg-orange-dark transition-colors"
          >
            {t('button')}
          </Link>
          <div className="text-white/40 text-sm">
            {t('or')}{' '}
            <a href="tel:+31641380360" className="text-white font-bold hover:text-orange transition-colors">
              {t('phone')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
