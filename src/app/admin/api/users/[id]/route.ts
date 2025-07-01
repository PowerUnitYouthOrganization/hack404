// Takes a user ID and returns the user data
import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";
import { type UserAction, UserActions } from "./actions";

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

    const body = await request.json();
    const action = body.action as UserAction;

    if (!action || !(action in UserActions)) {
      return NextResponse.json(
        { error: "Invalid action provided" },
        { status: 400 },
      );
    }

    await UserActions[action](userId);

    // Fetch the updated user data to return to the client
    const updatedUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!updatedUser.length) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error("Error processing user action:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
