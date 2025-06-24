import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { db, sessions, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { DefaultSession, Session } from 'next-auth';

type ISODateString = string;

export interface AdminSession {
  user: DefaultUser
  expires: ISODateString
}

export interface DefaultUser {
  id: string
  name: string
  email: string
  image?: string | null
}

export async function verifyAdminAccess(session?: Session | null): Promise<{ authorized: false; response?: NextResponse; } | { authorized: true; sessions: AdminSession; }> {
    if (!session) {
        session = await auth();
    }

    if (!session || !session.user?.id) {
        return { 
            authorized: false, 
            response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) 
        };
    }


    // Check if the user is admin
    const user = await db
        .select({ isAdmin: users.isadmin })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1);

    if (!user.length) {
        return { 
            authorized: false, 
            response: NextResponse.json({ error: "User not found" }, { status: 404 }) 
        };
    }

    if (!user[0].isAdmin) {
        return { 
            authorized: false, 
            response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) 
        };
    }

    if (!session.user.email || !session.user.name) {
        throw new Error(`Session user must have email and name defined. Check DB for user with ID: ${session.user.id}`);
    }

    return { 
        authorized: true, 
        sessions: {
            ...session,
            user: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image
            }
        } satisfies AdminSession,
    };
}
