import { NextResponse } from 'next/server';
import { isValidEmailFormat, domainHasMX } from '@/app/utils/emailValidation';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Basic format validation
    if (!isValidEmailFormat(email)) {
      return NextResponse.json({ 
        valid: false, 
        reason: 'Please enter a valid email address' 
      }, { status: 400 });
    }
    
    // Check MX records for the domain
    const hasMX = await domainHasMX(email);
    if (!hasMX) {
      return NextResponse.json({
        valid: false,
        reason: 'Email domain appears to be invalid or has no mail server'
      }, { status: 400 });
    }
    
    // Email passed format check and has valid MX records
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Error validating email:', error);
    return NextResponse.json({ valid: false, reason: 'Invalid request' }, { status: 400 });
  }
}
