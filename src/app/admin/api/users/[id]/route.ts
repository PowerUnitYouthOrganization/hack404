// Takes a user ID and returns the user data
import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";
import { UserActions } from "./actions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  console.log("GET request to /admin/api/users/[id]");
  try {
    const authResult = await verifyAdminAccess();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const { id: userId } = await params;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    // Fetch user data from the database
    const user = await db
      .select()
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
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  console.log("PUT request to /admin/api/users/[id]");
  try {
    const authResult = await verifyAdminAccess();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const { id: userId } = await params;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    // Set the "checkedIn" column to true for the specified user
    const result = await db
      .update(users)
      .set({ checkedin: true })
      .where(and(eq(users.id, userId), eq(users.rsvp, true)));

    if (!result.length) {
      // It's possible the user ID didn't match any records
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User checked in successfully" });
  } catch (error) {
    console.error("Error checking in user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
