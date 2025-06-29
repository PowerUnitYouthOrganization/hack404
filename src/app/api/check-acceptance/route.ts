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
      .select({ id: users.id, isAdmin: users.isadmin })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user[0].isAdmin) {
      return NextResponse.json({
        applied: true,
        accepted: true,
      });
    }

    const userId = user[0].id;

    // check if accepted
    const accepted = await db
      .select({ accepted: applications.accepted })
      .from(applications)
      .where(eq(applications.userId, userId))
      .limit(1);

    if (accepted.length > 0) {
      return NextResponse.json({
        applied: true,
        accepted: true,
      });
    }

    const applied = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId))
      .limit(1);

    if (applied.length > 0) {
      return NextResponse.json({
        applied: true,
        accepted: false,
      });
    }

    return NextResponse.json({
      applied: false,
      accepted: false,
    });
  } catch (error) {
    console.error("Error checking application:", error);
    return NextResponse.json(
      { error: "Failed to check application" },
      { status: 500 },
    );
  }
}
