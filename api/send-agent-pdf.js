import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import getStream from 'get-stream';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, company, prompt, config } = req.body;

  if (!email || !prompt || !name || !company) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create PDF
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.fillColor('#8B5CF6').fontSize(20).text('Powered_by AI Voice Agent Config', { align: 'center' });
  doc.moveDown().fillColor('white').fontSize(12);
  doc.text(`Name: ${name}`);
  doc.text(`Email: ${email}`);
  doc.text(`Company: ${company}`);

  doc.moveDown().fillColor('#8B5CF6').fontSize(14).text('Generated Prompt:');
  doc.fillColor('white').fontSize(10).text(prompt, { lineGap: 4 });

  doc.moveDown().fillColor('#8B5CF6').fontSize(14).text('Configuration (JSON):');
  doc.fillColor('white').fontSize(10).text(JSON.stringify(config, null, 2), { lineGap: 2 });

  doc.end();
  const pdfBuffer = await getStream.buffer(doc);

  try {
    await resend.emails.send({
      from: 'Powered_by <team@poweredby.agency>',
      to: email,
      subject: `Your Agent Config: ${name}`,
      html: `<p>Hi there,</p><p>Attached is the AI voice agent configuration you generated using the Powered_by Builder.</p><p>– The Powered_by Team</p>`,
      attachments: [
        {
          filename: `Powered_by_Agent_Config.pdf`,
          content: pdfBuffer.toString('base64'),
        },
      ],
    });

    res.status(200).json({ message: 'Email sent' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
