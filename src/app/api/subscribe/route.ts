import { NextRequest, NextResponse } from 'next/server';
import { db, users } from '@/db/schema';
import { pushSubscriptions } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

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
    const userId = userResult[0].id;

    const subscription = await req.json();
    await db.insert(pushSubscriptions).values({
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
      userId: userId,
    });
    return NextResponse.json({ message: 'Subscription saved.' }, { status: 201 });
}
