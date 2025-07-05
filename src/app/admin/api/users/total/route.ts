import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    // Get total user count
    const totalUsersResult = await db.select({ count: count() }).from(users);

    // Get users with completed profiles
    const completedProfilesResult = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.profileCompleted, true));

    // Get admin users
    const adminUsersResult = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.isadmin, true));

    // Get users by stream
    const beginnerStreamResult = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.stream, "beginner"));    const normalStreamResult = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.stream, "normal"));

    // Get checked-in users (present hackers)
    const checkedInUsersResult = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.checkedin, true));

    const response = {
      totalUsers: totalUsersResult[0].count,
      completedProfiles: completedProfilesResult[0].count,
      adminUsers: adminUsersResult[0].count,
      checkedInUsers: checkedInUsersResult[0].count,
      streams: {
        beginner: beginnerStreamResult[0].count,
        normal: normalStreamResult[0].count,
        unassigned:
          totalUsersResult[0].count -
          beginnerStreamResult[0].count -
          normalStreamResult[0].count,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
