'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { getServiceCategories } from '@/lib/services-data';

function ServiceCard({ cat }: { cat: { title: string; items: string[] } }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = cat.items.length > 5;
  const visibleItems = expanded ? cat.items : cat.items.slice(0, 5);

  return (
    <motion.div
      className="p-6 rounded-2xl border border-gray-100 bg-gray-50 cursor-default"
      whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="font-black text-dark text-sm uppercase tracking-wider mb-4 pb-3 border-b border-gray-200">
        {cat.title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {visibleItems.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-dark/70">
            <span className="text-orange font-bold shrink-0 leading-5">+</span>
            <span>{item}</span>
          </li>
        ))}
        <AnimatePresence>
          {expanded && cat.items.slice(5).map((item) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2.5 text-sm text-dark/70 overflow-hidden"
            >
              <span className="text-orange font-bold shrink-0 leading-5">+</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-3 text-xs font-bold text-orange hover:underline flex items-center gap-1 transition-colors"
        >
          {expanded
            ? '− Minder tonen'
            : `+ ${cat.items.length - 5} meer`
          }
        </button>
      )}
    </motion.div>
  );
}

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
            <ServiceCard key={cat.title} cat={cat} />
          ))}

          <motion.div className="p-6 rounded-2xl border-2 border-orange bg-orange/5 flex flex-col justify-between"
            whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(232,100,10,0.15)' }}
            transition={{ duration: 0.2 }}
          >
            <div>
              <div className="text-xs font-bold text-orange uppercase tracking-widest mb-3">
                ★ {t('mobileServiceBadge')}
              </div>
              <h3 className="font-black text-dark text-base mb-2">{t('mobileService')}</h3>
              <p className="text-sm text-dark/60 leading-relaxed">{t('mobileServiceDesc')}</p>
            </div>
            <Link
              href={locale === 'nl' ? '/afspraak' : `/${locale}/afspraak`}
              className="mt-5 inline-block text-center bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors"
            >
              {t('bookAppointment')}
            </Link>
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <Link
            href={locale === 'nl' ? '/diensten' : `/${locale}/diensten`}
            className="inline-flex items-center gap-2 text-orange font-bold hover:underline"
          >
            {t('viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
