
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Extract lead data from the request body
      const { name, email, company } = req.body;

      // Basic validation
      if (!name || !email || !company) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Here you would typically send this data to a CRM or database
      // For now, just log it and return a success response
      console.log('Lead captured:', { name, email, company });
      
      return res.status(200).json({ success: true, message: 'Lead information saved successfully!' });
    } catch (error) {
      console.error('Error processing lead:', error);
      return res.status(500).json({ error: 'Failed to process lead information' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
