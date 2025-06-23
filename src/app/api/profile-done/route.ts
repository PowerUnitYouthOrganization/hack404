import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * GET /api/profile-done
 * Check if the current authenticated user has completed their profile.
 * This endpoint is secured and uses the session to identify the user.
 * @param {Request} req - The request object (not used directly, but required by Next.js).
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user's profile is done
    const existingUser = await db
      .select({ profileCompleted: users.profileCompleted })
      .from(users)
      .where(eq(users.id, session.user.id))
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
