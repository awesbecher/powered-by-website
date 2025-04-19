import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM || 'team@poweredby.agency';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { email, audioUrl } = req.body;

    if (!email || !audioUrl) {
      return res.status(400).json({ error: 'Missing email or audioUrl' });
    }

    const html = `
      <p>Here’s your audio message:</p>
      <a href="${audioUrl}" target="_blank">Click here to listen</a>
    `;

    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your Powered_by audio message',
      html,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
