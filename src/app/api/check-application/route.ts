import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, applications, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    // Check authentication
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

    // Check if application exists
    const existingApplication = await db
      .select({
        userId: applications.userId,
        applicationSubmitted: applications.applicationSubmitted,
        stream: applications.stream,
      })
      .from(applications)
      .where(eq(applications.userId, userId))
      .limit(1);

    if (existingApplication.length > 0) {
      return NextResponse.json({
        hasApplication: true,
        applicationSubmitted: existingApplication[0].applicationSubmitted,
        stream: existingApplication[0].stream,
      });
    }

    return NextResponse.json({
      hasApplication: false,
      applicationSubmitted: false,
      stream: null,
    });
  } catch (error) {
    console.error("Error checking application:", error);
    return NextResponse.json(
      { error: "Failed to check application" },
      { status: 500 },
    );
  }
}
