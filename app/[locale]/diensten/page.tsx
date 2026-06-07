import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';
import { getServiceCategories } from '@/lib/services-data';

export default async function DienstenPage() {
  const t = await getTranslations('services');
  const tc = await getTranslations('cta');
  const locale = await getLocale();
  const categories = getServiceCategories(locale);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #F5C5A3 0%, #FBE8D8 100%)' }}>
        <div className="w-full max-w-3xl mx-auto px-6">
          <h1 className="text-5xl font-black text-dark mb-4">{t('title')}</h1>
          <p className="text-dark/60 text-xl font-medium">{t('subtitle')}</p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-base font-black text-dark uppercase tracking-wider pb-4 mb-4 border-b border-gray-100">
                  {cat.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-orange font-bold text-base shrink-0 leading-5">+</span>
                      <span className="text-dark/80 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile service highlight */}
          <div className="rounded-2xl bg-orange p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                ★ {t('mobileServiceBadge')}
              </div>
              <h2 className="text-2xl font-black mb-1">{t('mobileService')}</h2>
              <p className="text-white/80 text-sm">{t('mobileServiceDesc')}</p>
            </div>
            <Link
              href={`/${locale}/afspraak`}
              className="shrink-0 bg-white text-orange font-black px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors text-sm whitespace-nowrap"
            >
              {t('bookAppointment')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark text-center">
        <div className="w-full max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-4">{tc('title')}</h2>
          <p className="text-white/60 mb-6">{tc('subtitle')}</p>
          <Link
            href={`/${locale}/afspraak`}
            className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-full hover:bg-orange-dark transition-colors"
          >
            {tc('button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
