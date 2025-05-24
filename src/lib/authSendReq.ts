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
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${provider.apiKey}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			from: provider.from,
			to,
			subject: `Sign in to ${host}`,
			html: html({ url, host, theme }),
			text: text({ url, host }),
		}),
	});

	if (!res.ok)
		throw new Error("Resend error: " + JSON.stringify(await res.json()));
}

function html(params: { url: string; host: string; theme: Theme }) {
	const { url, host } = params;
	const escapedHost = host.replace(/\./g, "&#8203;.");

	// should move to a different file
	return `
	<body>
		<p>Sign in to <strong>${escapedHost}</strong></p>
		<a href="${url}">Sign in</a>
		<p>If you didn't request this email, please ignore it.</p>
	</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
	return `Sign in to ${host}\n${url}\n\n`;
}
