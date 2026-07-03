'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface HeaderProps {
  locale: string;
}

const NAV_KEYS = ['diensten', 'galerij', 'afspraak', 'overOns', 'contact'] as const;
const NAV_HREFS: Record<string, string> = {
  diensten: '/diensten',
  galerij: '/galerij',
  afspraak: '/afspraak',
  overOns: '/over-ons',
  contact: '/contact',
};

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  const localePath = (path: string) => locale === 'nl' ? path : `/${locale}${path}`;
  const otherLocale = locale === 'nl' ? 'en' : 'nl';
  const otherLocalePath = otherLocale === 'nl' ? '/' : `/${otherLocale}`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href={localePath('/')} className="flex items-center shrink-0">
          <motion.div layoutId="caravon-logo">
            <Image
              src="/logo.png"
              alt="CARAVON.NL"
              width={200}
              height={34}
              priority
              className="h-8 w-auto"
            />
          </motion.div>
        </Link>

        {/* Desktop nav — centred */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_KEYS.map(key => (
            <Link
              key={key}
              href={localePath(NAV_HREFS[key])}
              className="text-sm font-semibold text-dark hover:text-orange transition-colors"
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            href={otherLocalePath}
            className="text-xs font-bold text-gray-400 hover:text-dark uppercase tracking-wider transition-colors"
          >
            {otherLocale}
          </Link>
          <Link
            href={localePath('/afspraak')}
            className="bg-orange text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-orange-dark transition-colors whitespace-nowrap"
          >
            {t('afspraakButton')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-dark"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-dark transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-dark transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-dark transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_KEYS.map(key => (
            <Link
              key={key}
              href={localePath(NAV_HREFS[key])}
              className="text-sm font-semibold text-dark"
              onClick={() => setMenuOpen(false)}
            >
              {t(key)}
            </Link>
          ))}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <Link href={otherLocalePath} className="text-xs font-bold text-gray-400 uppercase">
              {otherLocale}
            </Link>
            <Link
              href={localePath('/afspraak')}
              className="bg-orange text-white text-sm font-bold px-5 py-2 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              {t('afspraakButton')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
