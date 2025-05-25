import { db, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * POST /api/check-email
 * Check if an email is already registered in the user table.
 * @param {Request} req - The request object.
 * @returns {Promise<NextResponse>} - The response object.
 */
export async function POST(req: Request): Promise<NextResponse> {
	try {
		const body = await req.json();
		const { email } = body;

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const existingUser = await db
			.select()
			.from(users)
			.where(eq(users.email, email.toLowerCase()))
			.execute()
			.then((results) => results[0]);

		return NextResponse.json({
			exists: !!existingUser,
		});
	} catch (error) {
		console.error("Error checking email:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
