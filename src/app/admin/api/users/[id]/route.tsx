// Takes a user ID and returns the user data
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";

async function makeAdmin(userId: string) {
  // Logic to set the user as admin
  // This function should update the user's isadmin field in the database
  console.log(`Making user ${userId} an admin`);
  const result = await db.update(users).set({ isadmin: true }).where(eq(users.id, userId));
  console.log(`Database update result: "${result}"`);
  console.log(`Successfully made user ${userId} an admin`);
}

async function removeAdmin(userId: string) {
  // Logic to remove admin status from the user
  // This function should update the user's isadmin field in the database
  console.log(`Removing admin status from user ${userId}`);
  await db.update(users).set({ isadmin: false }).where(eq(users.id, userId));
}

export const UserActions = {
  makeAdmin,
  removeAdmin
} as const;

export type UserAction = keyof typeof UserActions;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("GET request to /admin/api/users/[id]");
  try {
    const authResult = await verifyAdminAccess();
    
    if (!authResult.authorized) {
        return authResult.response;
    }
    
    

    const userId = (await params).id;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch user data from the database
    const user = await db.
      select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user[0]);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("PUT request to /admin/api/users/[id]");
  try {
    const authResult = await verifyAdminAccess();
    
    if (!authResult.authorized) {
        return authResult.response;
    }

    const userId = (await params).id;
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const data = await request.json();

    if (data.action in UserActions) {
      await UserActions[data.action as keyof typeof UserActions](userId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ message: "Action completed successfully" });
  } catch (error) {
    console.error("Error processing user action:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}