import { getTranslations, getLocale } from 'next-intl/server';

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div>
      {/* Header */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #F5C5A3 0%, #FBE8D8 100%)' }}>
        <h1 className="text-5xl font-black text-dark mb-4">{t('title')}</h1>
        <p className="text-dark/60 text-xl font-medium">{t('subtitle')}</p>
      </section>

      <section className="py-16 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-black text-dark mb-6">Contactgegevens</h2>
              <div className="flex flex-col gap-4">
                {[
                  { icon: '🌐', label: t('website'), value: 'caravon.nl', href: 'https://caravon.nl' },
                  { icon: '✉️', label: t('email'), value: 'caravon.nl@gmail.com', href: 'mailto:caravon.nl@gmail.com' },
                  { icon: '📞', label: t('phone'), value: '+3107777777', href: 'tel:+3107777777' },
                  { icon: '🕐', label: t('hours'), value: t('hoursValue'), href: null },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <div className="text-xs font-bold text-dark/40 uppercase tracking-wider mb-0.5">{label}</div>
                      {href ? (
                        <a href={href} className="font-semibold text-dark hover:text-orange transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="font-semibold text-dark">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple contact form */}
            <div>
              <h2 className="text-2xl font-black text-dark mb-6">Stuur een bericht</h2>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-dark mb-1.5">{t('form.naam')}</label>
                  <input
                    type="text"
                    placeholder="Uw naam"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-1.5">{t('form.email')}</label>
                  <input
                    type="email"
                    placeholder="uw@email.nl"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-1.5">{t('form.bericht')}</label>
                  <textarea
                    rows={4}
                    placeholder="Uw bericht..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-dark placeholder:text-dark/30 focus:outline-none focus:border-orange transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange text-white font-bold py-3.5 rounded-xl hover:bg-orange-dark transition-colors"
                >
                  {t('form.submit')}
                </button>
              </form>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-12 rounded-2xl overflow-hidden bg-gray-100 h-64 flex items-center justify-center text-dark/40 font-medium">
            <div className="text-center">
              <div className="text-4xl mb-2">📍</div>
              <div>Google Maps — adres invoeren in next stap</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
