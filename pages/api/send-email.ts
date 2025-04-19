// pages/api/send-email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, audioUrl } = req.body;

  if (!email || !audioUrl) {
    return res.status(400).json({ error: 'Missing email or audioUrl' });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'team@poweredby.agency',
      to: [email],
      subject: 'Your Powered_by Voice Message',
      html: `
        <h2>Your Powered_by Voice Message</h2>
        <p>Click below to listen:</p>
        <audio controls style="width:100%; margin-top:12px;">
          <source src="${audioUrl}" type="audio/wav">
          Your browser does not support the audio element.
        </audio>
        <p><a href="${audioUrl}" download>Download the Audio</a></p>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
