'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Background image with blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/back.png"
          alt="CARAVON.NL gebouw"
          fill
          priority
          className="object-cover object-center scale-105"
          style={{ filter: 'blur(6px)' }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-dark/55" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl"
        >
          {/* Main headline */}
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-[0.95] mb-6 whitespace-pre-line drop-shadow-lg">
            {t('slogan')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl leading-relaxed font-medium">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Link
                href={`/${locale}/afspraak`}
                className="inline-block bg-orange text-white font-bold text-base px-8 py-4 rounded-full hover:bg-orange-dark transition-colors shadow-lg shadow-black/30"
              >
                {t('cta')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
              <Link
                href={`/${locale}/diensten`}
                className="inline-block bg-white/15 backdrop-blur-sm text-white font-bold text-base px-8 py-4 rounded-full hover:bg-white/25 transition-colors border border-white/30"
              >
                {t('ctaSecondary')}
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="white" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
