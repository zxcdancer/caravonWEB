'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const locale = useLocale();
  const privacyPath = locale === 'nl' ? '/privacy' : `/${locale}/privacy`;

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark text-white px-4 py-4 shadow-2xl">
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-white/80 leading-relaxed">
          {locale === 'nl'
            ? <>Wij gebruiken functionele cookies voor het correct functioneren van deze website. Meer informatie vindt u in onze{' '}<Link href={privacyPath} className="underline hover:text-orange transition-colors">privacyverklaring</Link>.</>
            : <>We use functional cookies to ensure this website works correctly. For more information, see our{' '}<Link href={privacyPath} className="underline hover:text-orange transition-colors">privacy policy</Link>.</>
          }
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-orange text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-orange/90 transition-colors whitespace-nowrap"
        >
          {locale === 'nl' ? 'Akkoord' : 'Accept'}
        </button>
      </div>
    </div>
  );
}
