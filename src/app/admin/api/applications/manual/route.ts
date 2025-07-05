import { NextRequest, NextResponse } from "next/server";
import { db, applications, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const body = await req.json();
    const { email, applicationData } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await db
      .select({ id: users.id, name: users.name })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user.length) {
      return NextResponse.json(
        { error: "User not found with this email" },
        { status: 404 }
      );
    }

    const userId = user[0].id;
    const userName = user[0].name;

    // Check if application already exists
    const existingApplication = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId))
      .limit(1);

    if (existingApplication.length > 0) {
      return NextResponse.json(
        { error: "Application already exists for this user" },
        { status: 409 }
      );
    }    // Create default application data
    const defaultApplicationData = {
      userId,
      name: userName || "Manual Entry",
      email,
      applicationSubmitted: applicationData?.applicationSubmitted ?? true,
      accepted: applicationData?.accepted ?? false,
      stream: applicationData?.stream ?? "normal",
      shortAnswer1: applicationData?.shortAnswer1 ?? "Manually created application",
      shortAnswer2: applicationData?.shortAnswer2 ?? "Manually created application", 
      creativeQuestion: applicationData?.creativeQuestion ?? "Manually created application",
      avatar: applicationData?.avatar ?? [],
      avatarUrl: applicationData?.avatarUrl ?? "",
      workshops: applicationData?.workshops ?? [],
      activity: applicationData?.activity ?? "Manual Entry",
      resumeConsented: applicationData?.resumeConsented ?? true,
      overnightConsented: applicationData?.overnightConsented ?? false,
      aiUsed: applicationData?.aiUsed ?? false,
    };

    // Insert the application
    const newApplication = await db
      .insert(applications)
      .values(defaultApplicationData)
      .returning();

    return NextResponse.json({
      success: true,
      message: "Application created successfully",
      application: newApplication[0],
      userId,
    });
  } catch (error) {
    console.error("Error creating manual application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "Email parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Find user by email
    const user = await db
      .select({ 
        id: users.id, 
        name: users.name, 
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        stream: users.stream
      })
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user.length) {
      return NextResponse.json(
        { error: "User not found with this email" },
        { status: 404 }
      );
    }

    const userId = user[0].id;

    // Check if application already exists
    const existingApplication = await db
      .select()
      .from(applications)
      .where(eq(applications.userId, userId))
      .limit(1);

    return NextResponse.json({
      user: user[0],
      hasApplication: existingApplication.length > 0,
      application: existingApplication[0] || null,
    });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
