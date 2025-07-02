import { NextRequest, NextResponse } from "next/server";
import { db, applications } from "@/db/schema";
import { eq, count, desc } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    // Get total applications count
    const totalApplicationsResult = await db
      .select({ count: count() })
      .from(applications);

    // Get submitted applications
    const submittedApplicationsResult = await db
      .select({ count: count() })
      .from(applications)
      .where(eq(applications.applicationSubmitted, true));

    // Get reviewed applications
    const reviewedApplicationsResult = await db
      .select({ count: count() })
      .from(applications)
      .where(eq(applications.accepted, true));

    // Get applications by stream
    const beginnerApplicationsResult = await db
      .select({ count: count() })
      .from(applications)
      .where(eq(applications.stream, "beginner"));

    const normalApplicationsResult = await db
      .select({ count: count() })
      .from(applications)
      .where(eq(applications.stream, "normal"));

    // Get recent applications (last 10)
    const recentApplications = await db
      .select({
        name: applications.name,
        email: applications.email,
        stream: applications.stream,
        submitted: applications.applicationSubmitted,
        reviewed: applications.accepted,
        createdAt: applications.createdAt,
      })
      .from(applications)
      .orderBy(desc(applications.createdAt))
      .limit(10);

    const response = {
      totalApplications: totalApplicationsResult[0].count,
      submittedApplications: submittedApplicationsResult[0].count,
      reviewedApplications: reviewedApplicationsResult[0].count,
      pendingReview:
        submittedApplicationsResult[0].count -
        reviewedApplicationsResult[0].count,
      streams: {
        beginner: beginnerApplicationsResult[0].count,
        normal: normalApplicationsResult[0].count,
      },
      recentApplications,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching application statistics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
