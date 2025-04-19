import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM || 'team@poweredby.agency';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, audioUrl } = req.body;

  if (!email || !audioUrl) {
    return res.status(400).json({ error: 'Missing email or audioUrl' });
  }

  try {
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

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Email failed', details: error });
  }
}
