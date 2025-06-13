import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * PATCH /api/reset-profile
 * Reset user's profile completion status to false
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Update user's profileCompleted status to false
    const result = await db
      .update(users)
      .set({
        profileCompleted: false,
      })
      .where(eq(users.email, session.user.email.toLowerCase()));

    console.log(result);

    return NextResponse.json({
      success: true,
      message: "Profile completion status reset successfully",
    });
  } catch (error) {
    console.error("Error resetting profile completion:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
