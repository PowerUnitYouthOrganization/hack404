import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, profiles, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { mapFormDataToProfile } from "@/lib/profile-mapping";

/**
 * Handles the POST request to save user profile data.
 * @param req NextRequest - The incoming request containing profile data.
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user ID from session
    const user = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;
    const formData = await req.json();

    // Map form data to database schema
    const profileData = mapFormDataToProfile(formData, userId);

    // Check if profile already exists
    const existingProfile = await db
      .select({ userId: profiles.userId })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    if (existingProfile.length > 0) {
      // Update existing profile
      await db
        .update(profiles)
        .set(profileData)
        .where(eq(profiles.userId, userId));
    } else {
      // Insert new profile
      await db.insert(profiles).values(profileData);
    }

    // Update user's profileCompleted status
    await db
      .update(users)
      .set({ profileCompleted: true })
      .where(eq(users.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
