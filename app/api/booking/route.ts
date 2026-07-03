import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { naam, telefoon, email, voertuig, omschrijving, service, date, time, locale } = body;

    const adminEmail = process.env.ADMIN_EMAIL || 'info@caravon.nl';
    const resendKey = process.env.RESEND_API_KEY;
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

    const dateStr = new Date(date).toLocaleDateString('nl-NL', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    // Save to Google Sheets via Apps Script webhook
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            naam, telefoon, email, voertuig,
            service, date: dateStr, time,
            omschrijving: omschrijving || '',
            locale,
          }),
        });
      } catch (sheetsErr) {
        console.error('Google Sheets error:', sheetsErr);
      }
    }

    if (resendKey) {
      const { Resend } = await import('resend');
      const resend = new Resend(resendKey);

      // Email to admin
      await resend.emails.send({
        from: 'CARAVON.NL <noreply@caravon.nl>',
        to: adminEmail,
        subject: `Nieuwe afspraak: ${naam} — ${dateStr} ${time}`,
        html: `
          <h2>Nieuwe afspraak aanvraag</h2>
          <p><strong>Naam:</strong> ${naam}</p>
          <p><strong>Telefoon:</strong> ${telefoon}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Voertuig:</strong> ${voertuig}</p>
          <p><strong>Dienst:</strong> ${service}</p>
          <p><strong>Datum:</strong> ${dateStr}</p>
          <p><strong>Tijdstip:</strong> ${time}</p>
          <p><strong>Omschrijving:</strong> ${omschrijving || '—'}</p>
        `,
      });

      // Confirmation email to client
      await resend.emails.send({
        from: 'CARAVON.NL <noreply@caravon.nl>',
        to: email,
        subject: locale === 'nl'
          ? `Uw afspraak bij CARAVON.NL is bevestigd`
          : `Your appointment at CARAVON.NL is confirmed`,
        html: locale === 'nl' ? `
          <h2>Uw afspraak is bevestigd! ✅</h2>
          <p>Beste ${naam},</p>
          <p>Wij hebben uw afspraak ontvangen. Hieronder vindt u de details:</p>
          <p><strong>Dienst:</strong> ${service}</p>
          <p><strong>Datum:</strong> ${dateStr}</p>
          <p><strong>Tijdstip:</strong> ${time}</p>
          <p>Heeft u vragen? Neem gerust contact met ons op via info@caravon.nl of bel +31641380360.</p>
          <p>Tot ziens!<br/>Team CARAVON.NL</p>
        ` : `
          <h2>Your appointment is confirmed! ✅</h2>
          <p>Dear ${naam},</p>
          <p>We have received your appointment. Here are the details:</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${dateStr}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p>Questions? Contact us at info@caravon.nl or call +31641380360.</p>
          <p>See you soon!<br/>Team CARAVON.NL</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Booking error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
