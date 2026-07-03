'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  const localePath = (path: string) => locale === 'nl' ? path : `/${locale}${path}`;

  return (
    <footer className="bg-dark text-white pt-12 pb-6">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="mb-3">
              <Image src="/logo-black.png" alt="CARAVON.NL" width={160} height={48} className="h-12 w-auto" />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{t('tagline')}</p>
            <div className="mt-4 flex flex-col gap-1 text-sm text-white/60">
              <a href="mailto:caravon.nl@gmail.com" className="hover:text-white transition-colors">
                caravon.nl@gmail.com
              </a>
              <a href="tel:+31641380360" className="hover:text-white transition-colors">
                +31641380360
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/40">
              {t('links')}
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { key: 'diensten', href: '/diensten' },
                { key: 'galerij', href: '/galerij' },
                { key: 'afspraak', href: '/afspraak' },
                { key: 'overOns', href: '/over-ons' },
                { key: 'contact', href: '/contact' },
              ].map(({ key, href }) => (
                <Link
                  key={key}
                  href={localePath(href)}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {tn(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-white/40">
              {t('contact')}
            </h3>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <span>caravon.nl</span>
              <a href="mailto:caravon.nl@gmail.com" className="hover:text-white transition-colors">
                caravon.nl@gmail.com
              </a>
              <a href="tel:+31641380360" className="hover:text-white transition-colors">
                +31641380360
              </a>
              <span className="mt-2 text-white/40 text-xs">Ma–Vr: 08:00–17:00</span>
            </div>
          </div>
        </div>

        <div className="pt-6 text-center text-white/30 text-xs flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© {year} CARAVON.NL — {t('rights')}</span>
          <span className="hidden sm:inline">·</span>
          <Link href={localePath('/privacy')} className="hover:text-white/60 transition-colors">
            Privacyverklaring
          </Link>
        </div>
      </div>
    </footer>
  );
}
