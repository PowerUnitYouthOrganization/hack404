import { waitlistDb, waitlistEmails } from "@/db/waitlistSchema";
import { isValidEmailFormat, domainHasMX } from "@/app/utils/emailValidation";

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email: string };

    // Basic validation
    if (!isValidEmailFormat(email)) {
      return Response.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    // MX record validation
    const hasMX = await domainHasMX(email);
    if (!hasMX) {
      return Response.json(
        { error: "Email domain appears to be invalid or has no mail server" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      await waitlistDb
        .insert(waitlistEmails)
        .values({ email: normalizedEmail });
      return Response.json(
        { message: "Email added to waitlist" },
        { status: 200 },
      );
    } catch (error: any) {
      console.error(error);
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "23505"
      ) {
        return Response.json(
          { error: "Email already on waitlist" },
          { status: 409 },
        );
      } else {
        return Response.json(
          { error: "Internal server error" },
          { status: 500 },
        );
      }
    }
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}
