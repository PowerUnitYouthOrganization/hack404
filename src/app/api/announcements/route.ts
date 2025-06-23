import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/db/schema';
import { announcements, pushSubscriptions } from '@/db/schema';
import webpush from 'web-push';
import { desc, eq } from 'drizzle-orm';

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userResult = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, session.user.email))
        .limit(1);

    if (!userResult.length) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const authorId = userResult[0].id;

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const newAnnouncement = await db.insert(announcements).values({ title, content, authorId }).returning();

    const subscriptions = await db.select().from(pushSubscriptions);

    const notificationPayload = JSON.stringify({ title, content });

    await Promise.all(
      subscriptions.map(sub =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          },
          notificationPayload
        )
      )
    );

    return NextResponse.json(newAnnouncement[0], { status: 201 });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    const limitNumber = limit ? parseInt(limit, 10) : undefined;

    const baseQuery = db.select().from(announcements).orderBy(desc(announcements.createdAt));

    const finalQuery = limitNumber ? baseQuery.limit(limitNumber) : baseQuery;

    const allAnnouncements = await finalQuery;

    return NextResponse.json(allAnnouncements);
}
