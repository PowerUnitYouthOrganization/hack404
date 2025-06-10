import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * GET /api/profile-done?email=user@example.com
 * Check if user has completed their profile.
 * @param {Request} req - The request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user's profile is done
    const existingUser = await db
      .select({ profileCompleted: users.profileCompleted })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (!existingUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      profileDone: existingUser[0].profileCompleted || false,
    });
  } catch (error) {
    console.error("Error checking profile completion:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
