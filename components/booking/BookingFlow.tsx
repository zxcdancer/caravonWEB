'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import Link from 'next/link';

const SERVICE_KEYS = [
  'onderhoud', 'diagnose', 'motor', 'remmen', 'elektronica',
  'woonmodule', 'installaties', 'zonnepanelen', 'mobiel'
] as const;

const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

type FormData = {
  naam: string;
  telefoon: string;
  email: string;
  voertuig: 'camper' | 'caravan' | 'anders';
  omschrijving: string;
};

export default function BookingFlow() {
  const t = useTranslations('booking');
  const ts = useTranslations('services');
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!date || !time || !service) return;
    setLoading(true);
    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          service,
          date: date.toISOString(),
          time,
          locale,
        }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // Step indicators
  const StepBar = () => (
    <div className="flex items-center justify-center gap-2 mb-10">
      {[1, 2, 3].map(s => (
        <div key={s} className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
            s < step ? 'bg-orange text-white' :
            s === step ? 'bg-dark text-white' :
            'bg-gray-100 text-dark/30'
          }`}>
            {s < step ? '✓' : s}
          </div>
          {s < 3 && <div className={`w-12 h-0.5 ${s < step ? 'bg-orange' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  );

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-black text-dark mb-3">{t('success.title')}</h2>
        <p className="text-dark/60 mb-8">{t('success.message')}</p>
        <Link
          href={`/${locale}`}
          className="bg-orange text-white font-bold px-8 py-3 rounded-full hover:bg-orange-dark transition-colors"
        >
          {t('success.back')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <StepBar />

      {/* Step 1: Service selection */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-black text-dark mb-2">{t('step1.title')}</h2>
          <p className="text-dark/50 text-sm mb-6">{t('step1.subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICE_KEYS.map(key => (
              <button
                key={key}
                onClick={() => setService(key)}
                className={`p-4 rounded-xl border-2 text-left font-semibold text-sm transition-all ${
                  service === key
                    ? 'border-orange bg-orange/5 text-dark'
                    : 'border-gray-100 bg-gray-50 text-dark/70 hover:border-orange/30'
                }`}
              >
                {ts(`items.${key}.title` as never)}
              </button>
            ))}
          </div>
          <button
            disabled={!service}
            onClick={() => setStep(2)}
            className="mt-6 w-full bg-orange text-white font-bold py-4 rounded-xl disabled:opacity-30 hover:bg-orange-dark transition-colors"
          >
            {t('form.next')} →
          </button>
        </div>
      )}

      {/* Step 2: Date & time */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-black text-dark mb-2">{t('step2.title')}</h2>
          <p className="text-dark/50 text-sm mb-6">{t('step2.subtitle')}</p>

          <div className="flex justify-center mb-6">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={[
                { before: new Date() },
                { dayOfWeek: [0, 6] }, // Disable weekends
              ]}
              className="border border-gray-100 rounded-2xl p-4"
            />
          </div>

          {date && (
            <div>
              <p className="text-sm font-bold text-dark mb-3">Kies een tijdstip:</p>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                      time === slot
                        ? 'bg-orange text-white'
                        : 'bg-gray-100 text-dark hover:bg-orange/10'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border-2 border-gray-200 text-dark font-bold py-4 rounded-xl hover:border-dark transition-colors"
            >
              ← {t('form.back')}
            </button>
            <button
              disabled={!date || !time}
              onClick={() => setStep(3)}
              className="flex-1 bg-orange text-white font-bold py-4 rounded-xl disabled:opacity-30 hover:bg-orange-dark transition-colors"
            >
              {t('form.next')} →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact form */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl font-black text-dark mb-2">{t('step3.title')}</h2>
          <p className="text-dark/50 text-sm mb-6">{t('step3.subtitle')}</p>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">{t('form.naam')} *</label>
              <input
                {...register('naam', { required: true })}
                placeholder={t('form.naamPlaceholder')}
                className={`w-full px-4 py-3 rounded-xl border ${errors.naam ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-orange transition-colors`}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">{t('form.telefoon')} *</label>
              <input
                {...register('telefoon', { required: true })}
                type="tel"
                placeholder={t('form.telefoonPlaceholder')}
                className={`w-full px-4 py-3 rounded-xl border ${errors.telefoon ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-orange transition-colors`}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">{t('form.email')} *</label>
              <input
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                type="email"
                placeholder={t('form.emailPlaceholder')}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-orange transition-colors`}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">{t('form.voertuig')}</label>
              <select
                {...register('voertuig')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange transition-colors bg-white"
              >
                <option value="camper">{t('form.voertuigOptions.camper')}</option>
                <option value="caravan">{t('form.voertuigOptions.caravan')}</option>
                <option value="anders">{t('form.voertuigOptions.anders')}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-dark mb-1.5">{t('form.omschrijving')}</label>
              <textarea
                {...register('omschrijving')}
                rows={3}
                placeholder={t('form.omschrijvingPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-orange transition-colors resize-none"
              />
            </div>
          </div>

          {/* Summary */}
          {date && time && service && (
            <div className="mt-4 p-4 bg-orange/5 border border-orange/20 rounded-xl text-sm text-dark/70">
              <strong className="text-dark">Samenvatting:</strong>{' '}
              {service} • {date.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })} • {time}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex-1 border-2 border-gray-200 text-dark font-bold py-4 rounded-xl hover:border-dark transition-colors"
            >
              ← {t('form.back')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange text-white font-bold py-4 rounded-xl disabled:opacity-70 hover:bg-orange-dark transition-colors"
            >
              {loading ? '...' : t('form.submit')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
