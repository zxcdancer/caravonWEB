import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import { routing } from '@/i18n/routing';
import IntroAnimation from '@/components/intro/IntroAnimation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/CookieBanner';
import WhatsAppButton from '@/components/WhatsAppButton';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={montserrat.variable}>
      <body className="min-h-screen w-full flex flex-col antialiased font-sans">
        <NextIntlClientProvider messages={messages}>
          <IntroAnimation />
          <Header locale={locale} />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CookieBanner />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
