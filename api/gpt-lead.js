import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import getStream from 'get-stream'; // to convert PDF stream to buffer

const resend = new Resend(process.env.RESEND_API_KEY);
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const companyEmail = 'team@poweredby.agency';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { name, email, company } = req.body;
  if (!name || !email || !company) return res.status(400).json({ message: 'Missing required fields' });

  const leadText = `*Name:* ${name}\n*Email:* ${email}\n*Company:* ${company}`;

  // 🔧 Generate PDF in memory
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.fillColor('#8B5CF6').fontSize(20).text('Powered_by AI Voice Agent Summary', { align: 'center' });
  doc.moveDown().fillColor('white').fontSize(12);
  doc.text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Company: ${company}`);

  doc.moveDown().fillColor('#8B5CF6').fontSize(14).text('What Your AI Voice Agent Can Do:');
  doc.fillColor('white').fontSize(12).list([
    'Handle Calls 24/7: Never miss a lead or patient call again.',
    'Automate Scheduling: Book, reschedule, and confirm appointments automatically.',
    'Answer FAQs: Handle common questions like hours, location, insurance accepted, etc.',
    'Smart Escalation: Forward urgent calls to real staff when needed.',
  ]);

  doc.moveDown().fillColor('#8B5CF6').fontSize(14).text('Sample Agent Prompt:');
  doc.fillColor('white').fontSize(12).text(
    `You are an AI voice agent for ${company}. When someone calls, answer questions about office hours, services, and book appointments. If the caller needs help with a specific technical issue, escalate to a human rep.`
  );

  doc.moveDown().fillColor('#8B5CF6').fontSize(14).text('What Happens Next?');
  doc.fillColor('white').fontSize(12).text(
    `The Powered_by team will be in touch shortly to start building your AI agent based on the requirements and workflows you provided.`
  );

  doc.end();
  const pdfBuffer = await getStream.buffer(doc);

  try {
    // 🔔 Slack alert
    await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: '🚀 *New GPT Lead Received!*',
        blocks: [
          { type: 'section', text: { type: 'mrkdwn', text: leadText } },
          {
            type: 'context',
            elements: [{ type: 'mrkdwn', text: '_Submitted via Powered_by Voice Agent Builder_' }],
          },
        ],
      }),
    });

    // 📧 Lead confirmation email with PDF attached
    await resend.emails.send({
      from: 'Powered_by Team <team@poweredby.agency>',
      to: email,
      subject: 'Your AI Agent Summary + Next Steps',
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! Your summary PDF is attached below.</p>
        <p>👇 Next steps:</p>
        <ul>
          <li><a href="https://poweredby.agency/trynow">Try a Demo Experience</a></li>
          <li><a href="https://cal.com/team-powered-by-dfbtbb/get-started-today">Book a Live Build Session</a></li>
        </ul>
        <p>– The Powered_by Team</p>
      `,
      attachments: [
        {
          filename: 'Powered_by_Agent_Summary.pdf',
          content: pdfBuffer.toString('base64'),
        },
      ],
    });

    // 📧 Internal team alert
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
