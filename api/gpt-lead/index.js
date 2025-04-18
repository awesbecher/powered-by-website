module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, firstname, lastname, company } = req.body || {};

    if (!email || !firstname || !lastname || !company) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    console.log('📥 New GPT Lead:', { email, firstname, lastname, company });

    // TODO: send email/slack/etc here

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('❌ API Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
