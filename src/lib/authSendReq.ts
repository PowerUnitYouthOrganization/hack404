import React from "react";
import { LaunchpadLoginEmail } from "../components/login-email";
import { render } from "@react-email/render";

interface Theme {
  brandColor?: string;
  buttonText?: string;
}

export async function sendVerificationRequest(params: {
  identifier: any;
  provider: any;
  url: any;
  theme: any;
}) {
  const { identifier: to, provider, url, theme } = params;
  const { host } = new URL(url);

  let htmlContent: string;
  try {
    htmlContent = await render(
      React.createElement(LaunchpadLoginEmail, {
        loginLink: url,
      }),
    );
  } catch (error) {
    console.error("Error rendering email template:", error);
    // Fallback to simple HTML
    const escapedHost = host.replace(/\./g, "&#8203;.");
    htmlContent = `
			<body>
				<p>Sign in to <strong>${escapedHost}</strong></p>
				<a href="${url}">Sign in</a>
				<p>If you didn't request this email, please ignore it.</p>
			</body>
		`;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject: `Ready to see your launchpad?`,
      html: htmlContent,
      text: text({ url, host }),
    }),
  });

  if (!res.ok)
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
  return `Ready to see your launchpad?

Hey there 👋

Thank you for creating a Hack404 account!

Click the link below to login and start your application:
${url}

This link will expire in 15 minutes.

Sincerely,
The Hack404 Team

---
July 4 – 6, 2025 | Toronto, Ontario
hack404.dev`;
}
