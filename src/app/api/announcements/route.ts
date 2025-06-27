import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db, announcements, users } from "@/db/schema";
import { desc, eq, lt } from "drizzle-orm";

// Example queries:
// /api/announcements?limit=10
// /api/announcements?limit=5&cursor=2023-12-01T10:30:00.000Z

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");
  const cursor = searchParams.get("cursor");
  const limitNumber = parseInt(limit || "10") || 50;

  // Ensure minimum and maximum values
  const safeLimitNumber = Math.min(Math.max(limitNumber, 1), 20);

  // Build the base query
  const baseQuery = db
    .select({
      id: announcements.id,
      title: announcements.title,
      content: announcements.content,
      author: users.name,
      authorId: announcements.authorId,
      createdAt: announcements.createdAt,
      authorImage: users.image,
    })
    .from(announcements)
    .leftJoin(users, eq(announcements.authorId, users.id));

  // Add cursor condition if provided
  let query;
  if (cursor) {
    const cursorDate = new Date(cursor);
    query = baseQuery
      .where(lt(announcements.createdAt, cursorDate))
      .orderBy(desc(announcements.createdAt))
      .limit(safeLimitNumber);
  } else {
    query = baseQuery
      .orderBy(desc(announcements.createdAt))
      .limit(safeLimitNumber);
  }
  const allAnnouncements = await query;

  // Calculate next cursor
  const nextCursor = allAnnouncements.length > 0 
    ? allAnnouncements[allAnnouncements.length - 1].createdAt?.toISOString()
    : null;

  return NextResponse.json({
    data: allAnnouncements,
    nextCursor: nextCursor,
    hasMore: allAnnouncements.length === safeLimitNumber
  });
}
