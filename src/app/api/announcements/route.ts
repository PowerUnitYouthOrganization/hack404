import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/db/schema';
import { announcements, pushSubscriptions } from '@/db/schema';
import webpush from 'web-push';
import { desc, eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    const limitNumber = limit ? parseInt(limit, 10) : undefined;

    const baseQuery = db.select().from(announcements).orderBy(desc(announcements.createdAt));

    const finalQuery = limitNumber ? baseQuery.limit(limitNumber) : baseQuery;

    const allAnnouncements = await finalQuery;

    return NextResponse.json(allAnnouncements);
}
