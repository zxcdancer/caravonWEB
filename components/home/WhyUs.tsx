'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const WHY_KEYS = ['kwaliteit', 'prijzen', 'mobiel', 'ervaring'] as const;
const WHY_ICONS: Record<string, string> = {
  kwaliteit:      '🏆',
  prijzen:        '💶',
  mobiel:         '🚐',
  ervaring:       '🛠️',
};

export default function WhyUs() {
  const t = useTranslations('whyUs');

  return (
    <section className="py-20" style={{ background: '#F5C5A3' }}>
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="w-full text-center mb-12">
          <h2 className="text-4xl font-black text-dark">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_KEYS.map(key => (
            <motion.div
              key={key}
              className="bg-white/70 backdrop-blur rounded-2xl p-6 text-center cursor-default"
              whileHover={{ y: -6, scale: 1.02, boxShadow: '0 16px 32px rgba(0,0,0,0.10)' }}
              transition={{ duration: 0.2 }}
            >
              <motion.div className="text-4xl mb-4" whileHover={{ scale: 1.2 }} transition={{ duration: 0.15 }}>
                {WHY_ICONS[key]}
              </motion.div>
              <h3 className="font-black text-dark text-lg mb-2">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-dark/60 text-sm leading-relaxed">
                {t(`items.${key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
