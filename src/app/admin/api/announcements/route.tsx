import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/db/schema';
import { announcements, pushSubscriptions } from '@/db/schema';
import webpush from 'web-push';
import { desc, eq, inArray } from 'drizzle-orm';

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

    const author = await db
      .select({ firstName: users.firstName })
      .from(users)
      .where(eq(users.id, authorId))
      .limit(1);

    const notificationPayload = JSON.stringify({ 
      title, 
      content, 
      author: (author[0]?.firstName || 'Unknown').trim(), 
    });    console.log(notificationPayload)

    // Send notifications and collect failed subscription IDs
    const failedSubscriptionIds: number[] = [];
    
    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: {
                p256dh: sub.p256dh,
                auth: sub.auth,
              },
            },
            notificationPayload
          );
        } catch (error: any) {
          console.error(`Failed to send notification to subscription ${sub.id}:`, error);
          
          // Check if it's a client error (invalid subscription)
          if (error.statusCode === 410 || error.statusCode === 404 || error.statusCode === 400) {
            failedSubscriptionIds.push(sub.id);
          }
        }
      })
    );    // Remove invalid subscriptions from database
    if (failedSubscriptionIds.length > 0) {
      try {
        await db
          .delete(pushSubscriptions)
          .where(inArray(pushSubscriptions.id, failedSubscriptionIds));
        
        console.log(`Removed ${failedSubscriptionIds.length} invalid subscription(s) from database`);
      } catch (dbError) {
        console.error('Error removing invalid subscriptions from database:', dbError);
      }
    }

    return NextResponse.json(newAnnouncement[0], { status: 201 });
}