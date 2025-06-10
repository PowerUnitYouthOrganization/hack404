import { Resend } from "resend";
import { NextResponse } from "next/server";

const apiKey = process.env.RESEND_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

/**
 * POST /api/send-email
 * Send a welcome email to the user.
 * @param {Request} request - The request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function POST(request: Request) {
  try {
    // Check if Resend is properly configured
    if (!resend) {
      console.error("Resend API key is missing");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    // Parse request body
    const { email } = await request.json();

    console.log("Sending welcome email to:", email);

    if (!email) {
      console.error("No email provided");
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Send direct email with a clean template
    const { data, error } = await resend.emails.send({
      from: "Hack404 <hello@hack404.dev>",
      to: [email],
      subject: "Welcome to Hack404!",
      html: `
        <div style="font-family: 'FH Lecturis', Arial, sans-serif; padding: 20px; color: #333">
          <p>Hey there, thank you for signing up for Hack404's information list!</p>
          <p>We're excited for our first iteration happening this July 4-6. Stay tuned - hacker applications will open shortly.</p>
          <p>In the meantime, check out our Instagram - <a href="https://www.instagram.com/hack404.dev/" style="color: #0366d6; text-decoration: none;">@hack404.dev</a>.</p>
          <p>Sincerely,<br />The Hack404 Team</p>
          
          <div style="margin-top: 20px; text-align: left;">
            <img 
              src="https://resend-attachments.s3.amazonaws.com/ecYDid3FS9WKMEj" 
              alt="Hack404 Logo" 
              style="max-width: 150px; height: auto;"
            />
          </div>
        </div>
      `,
    });
    if (error) {
      console.error("Error sending email:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in email API:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
