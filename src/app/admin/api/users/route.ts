import { NextRequest, NextResponse } from "next/server";
import { db, users } from "@/db/schema";
import { eq, like, or, desc, asc, count } from "drizzle-orm";
import { verifyAdminAccess } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const authResult = await verifyAdminAccess();

  if (!authResult.authorized) {
    return authResult.response;
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const stream = searchParams.get("stream") || "";
    const sortBy = searchParams.get("sortBy") || "name";
    const sortOrder = searchParams.get("sortOrder") || "asc";

    const offset = (page - 1) * limit;

    // Build where conditions
    const whereConditions = [];

    if (search) {
      whereConditions.push(
        or(
          like(users.name, `%${search}%`),
          like(users.email, `%${search}%`),
          like(users.firstName, `%${search}%`),
          like(users.lastName, `%${search}%`),
        ),
      );
    }

    if (stream && (stream === "beginner" || stream === "normal")) {
      whereConditions.push(eq(users.stream, stream));
    }

    // Build order by
    let orderColumn;
    switch (sortBy) {
      case "email":
        orderColumn = users.email;
        break;
      case "firstName":
        orderColumn = users.firstName;
        break;
      case "lastName":
        orderColumn = users.lastName;
        break;
      case "stream":
        orderColumn = users.stream;
        break;
      default:
        orderColumn = users.name;
    }
    const orderDirection = sortOrder === "desc" ? desc : asc;

    // Get total count
    const totalCountResult = await db
      .select({ count: count() })
      .from(users)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined);

    const totalUsers = totalCountResult[0].count;

    // Get users with pagination
    const usersList = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        stream: users.stream,
        isadmin: users.isadmin,
        profileCompleted: users.profileCompleted,
        checkedin: users.checkedin,
        rsvp: users.rsvp,
        meal: users.meal,
        microhackscomplete: users.microhackscomplete,
        emailVerified: users.emailVerified,
      })
      .from(users)
      .where(whereConditions.length > 0 ? whereConditions[0] : undefined)
      .orderBy(orderDirection(orderColumn))
      .limit(limit)
      .offset(offset);

    const totalPages = Math.ceil(totalUsers / limit);

    return NextResponse.json(
      {
        users: usersList,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
