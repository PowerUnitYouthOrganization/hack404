"use client";

import { useSession } from "next-auth/react";

export default function Map() {
  return (
    <main className="flex flex-col h-full overflow-hidden gap-6">
      <div className="flex-1 border border-[rgba(48,242,242,0.2)] tablet:mx-2 rounded-lg overflow-hidden backdrop-blur-[25px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.7714118906033!2d-79.39918712382281!3d43.6607348711018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3507c2ae5979%3A0x877d95bac233a7f5!2sMyhal%20Centre%20for%20Engineering%20Innovation%20and%20Entrepreneurship%20(MY)!5e1!3m2!1sen!2sca!4v1751324907357!5m2!1sen!2sca"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>
    </main>
  );
}
