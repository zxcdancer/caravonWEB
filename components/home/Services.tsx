'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { getServiceCategories } from '@/lib/services-data';

export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();
  const categories = getServiceCategories(locale);

  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl font-black text-dark mb-3">{t('title')}</h2>
          <p className="text-dark/50 text-lg font-medium">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div key={cat.title} className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
              <h3 className="font-black text-dark text-sm uppercase tracking-wider mb-4 pb-3 border-b border-gray-200">
                {cat.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {cat.items.slice(0, 5).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-dark/70">
                    <span className="text-orange font-bold shrink-0 leading-5">+</span>
                    <span>{item}</span>
                  </li>
                ))}
                {cat.items.length > 5 && (
                  <li className="text-xs text-dark/35 pl-5">
                    +{cat.items.length - 5} meer
                  </li>
                )}
              </ul>
            </div>
          ))}

          <div className="p-6 rounded-2xl border-2 border-orange bg-orange/5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-orange uppercase tracking-widest mb-3">
                ★ {t('mobileServiceBadge')}
              </div>
              <h3 className="font-black text-dark text-base mb-2">{t('mobileService')}</h3>
              <p className="text-sm text-dark/60 leading-relaxed">{t('mobileServiceDesc')}</p>
            </div>
            <Link
              href={`/${locale}/afspraak`}
              className="mt-5 inline-block text-center bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors"
            >
              {t('bookAppointment')}
            </Link>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href={`/${locale}/diensten`}
            className="inline-flex items-center gap-2 text-orange font-bold hover:underline"
          >
            {t('viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
