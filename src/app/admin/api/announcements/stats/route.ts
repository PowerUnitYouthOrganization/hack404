import { NextRequest, NextResponse } from "next/server";
import { db, users, announcements } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    // Get total announcements count
    const totalAnnouncementsResult = await db
      .select({ count: count() })
      .from(announcements);

    // Get all announcements with author information
    const allAnnouncements = await db
      .select({
        id: announcements.id,
        title: announcements.title,
        content: announcements.content,
        createdAt: announcements.createdAt,
        authorName: users.firstName,
        authorEmail: users.email,
      })
      .from(announcements)
      .leftJoin(users, eq(announcements.authorId, users.id))
      .orderBy(desc(announcements.createdAt));

    // Get recent announcements (last 5)
    const recentAnnouncements = allAnnouncements.slice(0, 5);

    // Get announcements by author
    const announcementsByAuthor = await db
      .select({
        authorName: users.firstName,
        authorEmail: users.email,
        count: count(),
      })
      .from(announcements)
      .leftJoin(users, eq(announcements.authorId, users.id))
      .groupBy(users.firstName, users.email)
      .orderBy(desc(count()));

    const response = {
      totalAnnouncements: totalAnnouncementsResult[0].count,
      recentAnnouncements,
      allAnnouncements,
      announcementsByAuthor,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching announcement statistics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
