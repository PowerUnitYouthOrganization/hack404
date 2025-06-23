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

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the user is admin
    const user = await db
        .select({ isAdmin: users.isadmin })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

    if (!user.length) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user[0].isAdmin) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const authorId = session.user.id;

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