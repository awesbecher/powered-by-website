import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const companyEmail = 'team@poweredby.agency';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, company } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const leadText = `*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company}`;

  const emailHtml = `
    <div style="font-family: sans-serif; color: #333;">
      <img src="https://poweredby.agency/assets/FullLogo_Transparent_NoBuffer.png" alt="Powered_by Logo" width="180" style="margin-bottom: 20px;" />

      <h2 style="color: #8B5CF6;">You're in. Let’s build your voice agent.</h2>

      <p>Hi ${name},</p>
      <p>Thanks for reaching out to <strong>Powered_by</strong>. We’re excited to help <strong>${company}</strong> explore what an AI voice agent can do.</p>

      <p>👇 Here are your next steps:</p>
      <ul>
        <li><a href="https://poweredby.agency/trynow" style="color:#8B5CF6;">Try a Demo Experience</a></li>
        <li><a href="https://cal.com/team-powered-by-dfbtbb/get-started-today" style="color:#8B5CF6;">Book a Live Build Call</a></li>
      </ul>

      <p>We’ll follow up shortly. In the meantime, feel free to reply with any questions.</p>
      <p>– The Powered_by Team</p>

      <hr style="margin-top: 40px;" />
      <p style="font-size: 12px; color: #888;">You’re receiving this email because you submitted your info to Powered_by. Questions? Contact us at <a href="mailto:team@poweredby.agency">team@poweredby.agency</a>.</p>
    </div>
  `;

  try {
    // 🔔 Send Slack message
    await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: '🚀 *New GPT Lead Received!*',
        blocks: [
          { type: 'section', text: { type: 'mrkdwn', text: leadText } },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: '_Submitted via Powered_by Voice Agent Builder_',
              },
            ],
          },
        ],
      }),
    });

    // 📧 Email lead
    await resend.emails.send({
      from: 'Powered_by Team <team@poweredby.agency>',
      to: email,
      subject: 'Let’s build your AI voice agent',
      html: emailHtml,
    });

    // 📧 Email internal team
    await resend.emails.send({
      from: 'Lead Bot <team@poweredby.agency>',
      to: companyEmail,
      subject: `New GPT Lead: ${name} from ${company}`,
      html: `<p><strong>Name:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Company:</strong> ${company}</p>`,
    });

    res.status(200).json({ message: 'Lead submitted and emails sent' });
  } catch (err) {
    console.error('Lead handler error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
