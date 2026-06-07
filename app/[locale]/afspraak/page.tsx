import { getTranslations } from 'next-intl/server';
import BookingFlow from '@/components/booking/BookingFlow';

export default async function AfspraakPage() {
  const t = await getTranslations('booking');

  return (
    <div>
      {/* Header */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #F5C5A3 0%, #FBE8D8 100%)' }}>
        <h1 className="text-4xl sm:text-5xl font-black text-dark mb-3">{t('title')}</h1>
        <p className="text-dark/60 text-lg font-medium">{t('subtitle')}</p>
      </section>

      <section className="py-12 bg-white">
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
          <BookingFlow />
        </div>
      </section>
    </div>
  );
}
