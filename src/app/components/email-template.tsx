import * as React from 'react';

interface EmailTemplateProps {
  // firstName parameter removed
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({}) => (
  <div style={{ 
    fontFamily: "'FH Lecturis', Arial, sans-serif", 
    padding: '20px', 
    color: '#333' 
  }}>
    <p>Hey there, thank you for signing up for Hack404's information list! We're excited for our first iteration happening this July 4-6. Stay tuned - hacker applications will open shortly.</p>
    <p>In the meantime, check out our Instagram - <a href="https://www.instagram.com/hack404.dev/" style={{ color: '#0366d6', textDecoration: 'none' }}>@hack404.dev</a>.</p>
    <p>Sincerely,<br />The Hack404 Team</p>
    
    <div style={{ marginTop: '20px', textAlign: 'left' }}>
      <img 
        src="https://hack404.dev/blackfull.png" 
        alt="" 
        style={{ maxWidth: '150px', height: 'auto' }}
      />
    </div>
  </div>
);