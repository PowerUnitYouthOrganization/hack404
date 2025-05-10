import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db/index";
import { waitlistEmails } from "@/db/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { email } = req.body;

		if (!email) {
			return res.status(400).json({ error: "Email is required" });
		}

		try {
			await db.insert(waitlistEmails).values({ email });
			return res.status(200).json({ message: "Email added to waitlist" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to add email" });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
