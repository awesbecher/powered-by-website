import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, audioUrl } = req.body;

  if (!email || !audioUrl) {
    return res.status(400).json({ error: 'Missing email or audioUrl' });
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'team@poweredby.agency',
      to: email,
      subject: '🎧 Your AI Voice Clip from Powered_by',
      html: `
        <div style="font-family: sans-serif; color: #111;">
          <img src="https://poweredby.agency/assets/FullLogo_Transparent_NoBuffer.png" alt="Powered_by Logo" style="max-width: 200px; margin-bottom: 20px;" />
          <h2 style="color: #8B5CF6;">Your AI voice clip is ready 🎙️</h2>
          <p>Click below to listen to your voice clip powered by your AI agent.</p>
          <a href="${audioUrl}" style="display: inline-block; background-color: #8B5CF6; color: white; padding: 14px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">▶ Play Audio</a>
          <p style="margin-top: 30px;">Need help building your own AI voice agent? <a href="https://poweredby.agency/trynow">Book a session with our team.</a></p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Resend Error]', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
