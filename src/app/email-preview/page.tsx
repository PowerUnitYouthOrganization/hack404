"use client";

import { LaunchpadLoginEmail } from "@/components/login-email";

export default function EmailPreviewPage() {
  return (
    <LaunchpadLoginEmail
      username="testuser"
      loginLink="https://hack404.dev/login?token=preview-token"
      expiresInMinutes={15}
    />
  );
}
