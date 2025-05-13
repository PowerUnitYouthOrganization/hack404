import { NextResponse } from 'next/server';
import dns from 'dns/promises';
import net from 'net';

// Simple function to check if a server is responsive
async function checkServerExists(domain: string, port = 25): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    
    // Set a timeout for the connection attempt
    socket.setTimeout(5000);
    
    // Handle connection
    socket.on('connect', () => {
      socket.end();
      resolve(true);
    });
    
    // Handle errors
    socket.on('error', () => {
      resolve(false);
    });
    
    // Handle timeout
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    
    // Attempt to connect
    socket.connect(port, domain);
  });
}

// Enhanced SMTP check to test if an email address exists
async function checkEmailExists(email: string, domain: string, mxServer: string): Promise<{exists: boolean, message: string}> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let smtpResponse = '';
    const username = email.split('@')[0];
    let stage = 0;
    
    socket.setTimeout(10000); // 10 second timeout
    
    socket.on('data', (data) => {
      smtpResponse += data.toString();
      
      // Basic SMTP conversation
      if (stage === 0 && smtpResponse.includes('220')) {
        socket.write(`HELO example.com\r\n`);
        stage = 1;
        smtpResponse = '';
      } else if (stage === 1 && smtpResponse.includes('250')) {
        socket.write(`MAIL FROM:<verify@example.com>\r\n`);
        stage = 2;
        smtpResponse = '';
      } else if (stage === 2 && smtpResponse.includes('250')) {
        socket.write(`RCPT TO:<${email}>\r\n`);
        stage = 3;
        smtpResponse = '';
      } else if (stage === 3) {
        // Check if recipient is accepted
        const isAccepted = smtpResponse.startsWith('250');
        socket.write('QUIT\r\n');
        socket.end();
        
        if (isAccepted) {
          resolve({ exists: true, message: 'Email address exists' });
        } else {
          resolve({ exists: false, message: `Email rejected: ${smtpResponse.trim()}` });
        }
      }
    });
    
    // Handle errors
    socket.on('error', (err) => {
      resolve({ exists: false, message: `Connection error: ${err.message}` });
    });
    
    // Handle timeout
    socket.on('timeout', () => {
      socket.destroy();
      resolve({ exists: false, message: 'Connection timeout' });
    });
    
    // Connect to the mail server
    socket.connect(25, mxServer);
  });
}

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
      // Check MX records
      const records = await dns.resolveMx(domain);
      const hasMX = records && records.length > 0;
      
      if (!hasMX) {
        return NextResponse.json({ 
          valid: false, 
          reason: 'Domain does not have valid MX records' 
        });
      }
      
      // Check if the primary mail server is responsive
      const primaryMailServer = records[0]?.exchange;
      if (primaryMailServer) {
        const serverExists = await checkServerExists(primaryMailServer);
        
        if (!serverExists) {
          return NextResponse.json({ 
            valid: false, 
            reason: 'Email server not responding' 
          });
        }
        
        // Try to verify if the specific email exists
        // Note: Many servers block this type of verification to prevent spam
        try {
          const { exists, message } = await checkEmailExists(email, domain, primaryMailServer);
          return NextResponse.json({ 
            valid: exists, 
            reason: exists ? '' : message 
          });
        } catch (error) {
          // If the email check fails, we'll still consider the email valid since the server exists
          return NextResponse.json({ valid: true });
        }
      }
      
      return NextResponse.json({ valid: true });
    } catch (error) {
      return NextResponse.json({ valid: false, reason: 'Unable to verify domain' });
    }
  } catch (error) {
    return NextResponse.json({ valid: false, reason: 'Invalid request' }, { status: 400 });
  }
}
