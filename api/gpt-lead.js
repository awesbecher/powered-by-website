import { Resend } from 'resend';
import PDFDocument from 'pdfkit';
import getStream from 'get-stream';

const resend = new Resend(process.env.RESEND_API_KEY);
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const hubspotToken = process.env.HUBSPOT_API_KEY;
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
    `You are an AI voice agent for ${company}. When someone calls, answer
