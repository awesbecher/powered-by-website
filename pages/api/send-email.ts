import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM || 'team@poweredby.agency';

export async function POST(req: Request) {
  try {
    const { email, audioUrl } = await req.json();

    if (!email || !audioUrl) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const htmlContent = `
      <p>Here is your voice recording from Powered_by:</p>
      <a href="${audioUrl}">Listen to Audio</a>
    `;

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your voice recording is ready',
      html: htmlContent,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Email failed', details: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
