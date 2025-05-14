import { type NextApiRequest, type NextApiResponse } from "next";
import { waitlistDb, waitlistEmails } from "@/db/waitlistSchema";
import { isValidEmailFormat, domainHasMX } from "@/app/utils/emailValidation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email } = req.body as { email: string };

    // Basic validation
    if (!isValidEmailFormat(email)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    // MX record validation
    const hasMX = await domainHasMX(email);
    if (!hasMX) {
      return res.status(400).json({
        error: "Email domain appears to be invalid or has no mail server",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      await waitlistDb
        .insert(waitlistEmails)
        .values({ email: normalizedEmail });
      return res.status(200).json({ message: "Email added to waitlist" });
    } catch (error: unknown) {
      console.error(error);
      // Type guard to check if error has a code property
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "23505"
      ) {
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
