export default async function handler(req, res) {
  try {
    console.log("Request received:", req.method);

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { email, firstname, lastname, company } = req.body || {};

    console.log("Parsed body:", { email, firstname, lastname, company });

    if (!email || !firstname || !lastname || !company) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
}
