import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, audioUrl } = await req.json();

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: email,
      subject: 'Your AI Voice Message',
      html: `
        <p>Here's your AI-generated voice message:</p>
        <p><a href="${audioUrl}" target="_blank">Click here to listen</a></p>
        <p>— Powered_by Voice Agent</p>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}
