import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db/schema";
import { count } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (action === "resetAllMeals") {
      // Reset all user meals to false
      const result = await db.update(users).set({ meal: false });

      // Get count of affected users
      const totalUsersResult = await db.select({ count: count() }).from(users);

      return NextResponse.json(
        {
          success: true,
          message: `Reset meal status for all ${totalUsersResult[0].count} users`,
          affectedUsers: totalUsersResult[0].count,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Invalid action provided" },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error performing bulk action:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
