import { getLocale } from 'next-intl/server';

export default async function PrivacyPage() {
  const locale = await getLocale();

  if (locale === 'en') return <PrivacyEN />;
  return <PrivacyNL />;
}

function PrivacyNL() {
  return (
    <div className="py-16 bg-white">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-black text-dark mb-2">Privacyverklaring</h1>
        <p className="text-dark/40 text-sm mb-10">Laatste update: juli 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">1. Wie zijn wij?</h2>
          <p className="text-dark/70 leading-relaxed">
            CARAVON.NL is een bedrijf gespecialiseerd in onderhoud en reparatie van campers en caravans in Nederland.
            U kunt contact met ons opnemen via <a href="mailto:info@caravon.nl" className="text-orange hover:underline">info@caravon.nl</a> of telefonisch via <a href="tel:+31641380360" className="text-orange hover:underline">+31641380360</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">2. Welke gegevens verzamelen wij?</h2>
          <p className="text-dark/70 leading-relaxed mb-3">
            Wij verzamelen uitsluitend gegevens die u zelf invult bij het maken van een afspraak via ons contactformulier:
          </p>
          <ul className="list-disc pl-5 text-dark/70 space-y-1">
            <li>Naam</li>
            <li>Telefoonnummer</li>
            <li>E-mailadres</li>
            <li>Type voertuig</li>
            <li>Omschrijving van het probleem</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">3. Waarvoor gebruiken wij uw gegevens?</h2>
          <p className="text-dark/70 leading-relaxed">
            Uw gegevens worden uitsluitend gebruikt om uw afspraak te verwerken en u te contacteren over uw reparatie of onderhoud. Wij gebruiken uw gegevens niet voor marketingdoeleinden en delen ze niet met derden.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">4. Hoe lang bewaren wij uw gegevens?</h2>
          <p className="text-dark/70 leading-relaxed">
            Uw gegevens worden bewaard zolang dit noodzakelijk is voor de uitvoering van de afspraak, en daarna niet langer dan 1 jaar.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">5. Cookies</h2>
          <p className="text-dark/70 leading-relaxed">
            Wij maken alleen gebruik van functionele cookies die noodzakelijk zijn voor de werking van de website (zoals het bijhouden van de beheerdersessie). Er worden geen tracking- of advertentiecookies gebruikt.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">6. Uw rechten</h2>
          <p className="text-dark/70 leading-relaxed">
            U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact op via <a href="mailto:info@caravon.nl" className="text-orange hover:underline">info@caravon.nl</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-dark mb-3">7. Contact</h2>
          <p className="text-dark/70 leading-relaxed">
            Heeft u vragen over deze privacyverklaring? Neem dan contact met ons op via <a href="mailto:info@caravon.nl" className="text-orange hover:underline">info@caravon.nl</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

function PrivacyEN() {
  return (
    <div className="py-16 bg-white">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-black text-dark mb-2">Privacy Policy</h1>
        <p className="text-dark/40 text-sm mb-10">Last updated: July 2026</p>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">1. Who are we?</h2>
          <p className="text-dark/70 leading-relaxed">
            CARAVON.NL is a company specialised in maintenance and repair of motorhomes and caravans in the Netherlands.
            You can contact us at <a href="mailto:info@caravon.nl" className="text-orange hover:underline">info@caravon.nl</a> or by phone at <a href="tel:+31641380360" className="text-orange hover:underline">+31641380360</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">2. What data do we collect?</h2>
          <p className="text-dark/70 leading-relaxed mb-3">
            We only collect data you provide when booking an appointment:
          </p>
          <ul className="list-disc pl-5 text-dark/70 space-y-1">
            <li>Name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Vehicle type</li>
            <li>Problem description</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">3. How do we use your data?</h2>
          <p className="text-dark/70 leading-relaxed">
            Your data is used solely to process your appointment and contact you about your repair or maintenance. We do not use your data for marketing and do not share it with third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">4. How long do we keep your data?</h2>
          <p className="text-dark/70 leading-relaxed">
            Your data is kept for as long as necessary to fulfil the appointment, and no longer than 1 year thereafter.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">5. Cookies</h2>
          <p className="text-dark/70 leading-relaxed">
            We only use functional cookies necessary for the website to operate (such as maintaining the admin session). No tracking or advertising cookies are used.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-black text-dark mb-3">6. Your rights</h2>
          <p className="text-dark/70 leading-relaxed">
            You have the right to access, correct or delete your personal data. Please contact us at <a href="mailto:info@caravon.nl" className="text-orange hover:underline">info@caravon.nl</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-dark mb-3">7. Contact</h2>
          <p className="text-dark/70 leading-relaxed">
            Questions about this privacy policy? Contact us at <a href="mailto:info@caravon.nl" className="text-orange hover:underline">info@caravon.nl</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
