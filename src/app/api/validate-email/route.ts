import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Basic validation - just check if it has an @ with something on both sides
    if (!email || !email.includes('@') || email.split('@')[0].length === 0 || email.split('@')[1].length === 0) {
      return NextResponse.json({ 
        valid: false, 
        reason: 'Please enter a valid email address' 
      }, { status: 400 });
    }
    
    // Consider all emails with basic format to be valid
    return NextResponse.json({ valid: true });
    
    /* Original complex validation code removed */
  } catch (error) {
    return NextResponse.json({ valid: false, reason: 'Invalid request' }, { status: 400 });
  }
}
