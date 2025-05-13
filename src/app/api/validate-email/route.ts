import { NextResponse } from 'next/server';
import dns from 'dns/promises';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ valid: false, reason: 'Invalid email format' }, { status: 400 });
    }
    
    // Extract domain and check MX records
    const domain = email.split('@')[1];
    try {
      const records = await dns.resolveMx(domain);
      const hasMX = records && records.length > 0;
      
      return NextResponse.json({ 
        valid: hasMX, 
        reason: hasMX ? '' : 'Domain does not have valid MX records' 
      });
    } catch (error) {
      return NextResponse.json({ valid: false, reason: 'Unable to verify domain' });
    }
  } catch (error) {
    return NextResponse.json({ valid: false, reason: 'Invalid request' }, { status: 400 });
  }
}
