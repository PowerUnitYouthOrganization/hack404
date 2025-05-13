import { NextApiRequest, NextApiResponse } from "next";
import { waitlistDb, waitlistEmails } from "@/db/waitlistSchema";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ error: "Email is required" });
		}

		try {
			await waitlistDb.insert(waitlistEmails).values({ email });
			return res.status(200).json({ message: "Email added to waitlist" });
		} catch (error: any) {
			console.error(error);
			if (error.code === "23505") {
				return res.status(409).json({ error: "Email already on waitlist" });
			} else {
				return res.status(500).json({ error: "Internal server error" });
			}
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
