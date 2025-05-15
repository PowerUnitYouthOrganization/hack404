import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const apiKey = process.env.RESEND_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(request: Request) {
  try {
    if (!resend) {
      console.error("❌ Resend API key is missing");
      return NextResponse.json(
        { error: 'Contact service not configured' },
        { status: 500 }
      );
    }
    
    const { email, firstName } = await request.json();
    
    console.log("👤 Adding contact to Resend:", email);
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Use audience ID from your Resend dashboard
    const audienceId = process.env.RESEND_AUDIENCE_ID || ''; 
    
    const { data, error } = await resend.contacts.create({
      email: email,
      firstName: firstName || email.split('@')[0], // Use part before @ if no name provided
      unsubscribed: false,
      audienceId: audienceId
    });

    if (error) {
      console.error('Error adding contact:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Contact added successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in add contact API:', error);
    return NextResponse.json(
      { error: 'Failed to add contact' },
      { status: 500 }
    );
  }
}
