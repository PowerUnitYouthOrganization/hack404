import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db, announcements, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// Example queries:
// /api/announcements?limit=10&offset=0
// /api/announcements?limit=5&offset=10

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const limitNumber = parseInt(limit || "1", 10) || 50;
  const offsetNumber = parseInt(offset || "0", 10) || 0;

  // Ensure minimum values
  const safeLimitNumber = Math.max(limitNumber, 1);
  const safeOffsetNumber = Math.max(offsetNumber, 0);

  const allAnnouncements = await db
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
    .leftJoin(users, eq(announcements.authorId, users.id))
    .orderBy(desc(announcements.createdAt))
    .offset(safeOffsetNumber)
    .limit(safeLimitNumber);

  return NextResponse.json(allAnnouncements);
}
