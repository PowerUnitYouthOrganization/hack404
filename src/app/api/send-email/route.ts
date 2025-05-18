import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import WaitlistEmail from '../../components/email-template';

const apiKey = process.env.RESEND_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(request: Request) {
  try {
    // Check if Resend is properly configured
    if (!resend) {
      console.error("Resend API key is missing");
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }
    
    // Parse request body
    const { email } = await request.json();
    
    console.log("Sending welcome email to:", email);
    
    if (!email) {
      console.error("No email provided");
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Send email using the React email component
    const { data, error } = await resend.emails.send({
      from: 'Hack404 <hello@hack404.dev>',
      to: [email],
      subject: 'Welcome to Hack404!',
      react: WaitlistEmail() // Use the React component instead of HTML
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in email API:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
