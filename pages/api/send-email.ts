import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const { email, audioUrl } = req.body

  try {
    const data = await resend.emails.send({
      from: 'team@poweredby.agency',
      to: email,
      subject: 'Your Powered_by Voice Agent Audio',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px;">
          <h2 style="color: #8B5CF6;">Powered_by Voice Agent</h2>
          <p>Here is your custom audio output:</p>
          <audio controls style="width: 100%; margin-top: 12px;">
            <source src="${audioUrl}" type="audio/wav" />
            Your browser does not support the audio tag.
          </audio>
          <p style="margin-top: 24px;">Thanks for using Powered_by.<br/>— The Team</p>
        </div>
      `
    })

    return res.status(200).json({ status: 'sent', data })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ error: 'Failed to send email.' })
  }
}
