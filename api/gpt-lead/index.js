module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, firstname, lastname, company } = req.body;

  if (!email || !firstname || !lastname || !company) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

  const hubspotPayload = {
    properties: {
      email,
      firstname,
      lastname,
      company,
      lead_source: 'Powered_by GPT',
      lifecyclestage: 'lead'
    }
  };

  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts',
