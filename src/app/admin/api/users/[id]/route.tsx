// Takes a user ID and returns the user data
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";



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
    

    const userId = params.id;
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