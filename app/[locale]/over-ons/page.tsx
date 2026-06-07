import { getTranslations, getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function OverOnsPage() {
  const t = await getTranslations('about');
  const tc = await getTranslations('cta');
  const locale = await getLocale();

  return (
    <div>
      {/* Header */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #F5C5A3 0%, #FBE8D8 100%)' }}>
        <h1 className="text-5xl font-black text-dark mb-4">{t('title')}</h1>
        <p className="text-dark/60 text-xl font-medium">{t('subtitle')}</p>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-dark mb-4">Ons verhaal</h2>
              <p className="text-dark/70 leading-relaxed text-lg mb-4">{t('story')}</p>
              <p className="text-dark/70 leading-relaxed text-lg">{t('mission')}</p>
            </div>
            <div className="bg-peach-light rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🚐</div>
                <div className="text-2xl font-black text-dark">CARAVON.NL</div>
                <div className="text-dark/60 mt-1 font-medium italic">Wij zorgen, u reist</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ background: '#F5C5A3' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-black text-dark mb-10">Onze waarden</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🏆', key: 'kwaliteit' },
              { icon: '🤝', key: 'betrouwbaarheid' },
              { icon: '⚙️', key: 'service' },
            ].map(({ icon, key }) => (
              <div key={key} className="bg-white/70 rounded-2xl p-6">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="font-black text-dark text-lg">{t(`values.${key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-black text-white mb-4">{tc('title')}</h2>
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
