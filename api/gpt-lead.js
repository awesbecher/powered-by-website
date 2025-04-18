// /pages/api/gpt-lead.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, company } = req.body;

  if (!name || !email || !company) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  const payload = {
    text: `🚀 *New GPT Lead Received!*`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company}`,
        },
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `_Submitted via Powered_by Voice Agent Builder_`,
          },
        ],
      },
    ],
  };

  try {
    const slackResponse = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!slackResponse.ok) {
      throw new Error(`Slack webhook failed: ${slackResponse.statusText}`);
    }

    res.status(200).json({ message: 'Lead submitted successfully' });
  } catch (err) {
    console.error('Slack Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

