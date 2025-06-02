
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract the data from the request body
      const { to, subject, message } = req.body;

      // Basic validation
      if (!to || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Here you would typically connect to an email service
      // For now, just log it and return a success response
      console.log('Email data:', { to, subject, message });
      
      return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
