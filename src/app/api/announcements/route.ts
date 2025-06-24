import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db, announcements } from '@/db/schema';
import webpush from 'web-push';
import { desc, eq } from 'drizzle-orm';

// Example querys:
// /api/announcements?limit=10&offset=0
// /api/announcements?limit=5&offset=10

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const limitNumber = parseInt(limit || '1', 10) || 50;
    const offsetNumber = parseInt(offset || '0', 10) || 0;

    // Ensure minimum values
    const safeLimitNumber = Math.max(limitNumber, 1);
    const safeOffsetNumber = Math.max(offsetNumber, 0);

    const allAnnouncements = await db
        .select()
        .from(announcements)
        .orderBy(desc(announcements.createdAt))
        .offset(safeOffsetNumber)
        .limit(safeLimitNumber);

    return NextResponse.json(allAnnouncements);
}
