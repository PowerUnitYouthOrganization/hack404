import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { db, applications, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Configure Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req: NextRequest) {
	try {
		// Check authentication
		const session = await auth();

		if (!session?.user?.email) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		// Get user ID from session
		const user = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.email, session.user.email))
			.limit(1);

		if (!user.length) {
			return NextResponse.json(
				{ error: "User not found" },
				{ status: 404 },
			);
		}

		const userId = user[0].id;

		// Parse form data
		const formData = await req.formData();

		// Get form fields
		const failureProud = formData.get("failureProud") as string;
		const forgetLearn = formData.get("forgetLearn") as string;
		const workshops = JSON.parse(
			(formData.get("workshops") as string) || "[]",
		);
		const avatarPixels = JSON.parse(
			(formData.get("avatarPixels") as string) || "[]",
		);
		const avatarFile = formData.get("avatar") as File;

		console.log("Received form data:", {
			failureProud,
			forgetLearn,
			workshops,
			avatarPixels,
			avatarFile,
		});
		// Validate required fields
		if (!failureProud || !forgetLearn || !avatarFile) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 },
			);
		}

		// Upload avatar to Cloudinary
		const bytes = await avatarFile.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const cloudinaryResult = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream(
					{
						folder: "hack404/avatars",
						public_id: `avatar_${userId}_${Date.now()}`,
						resource_type: "image",
					},
					(error, result) => {
						if (error) reject(error);
						else resolve(result);
					},
				)
				.end(buffer);
		});

		const avatarUrl = (cloudinaryResult as any).secure_url;

		// Prepare application data
		const applicationData = {
			userId,
			applicationSubmitted: true,
			applicationReviewed: false,
			failureProud,
			forgetLearn,
			avatar: avatarPixels, // Store pixel data as array
			avatarUrl, // Store Cloudinary URL
			workshops,
			createdAt: new Date(),
		};

		console.log("Application data to insert:", applicationData);

		// Check if application already exists
		const existingApplication = await db
			.select({ userId: applications.userId })
			.from(applications)
			.where(eq(applications.userId, userId))
			.limit(1);
		
		console.log("Existing application check:", existingApplication);

		if (existingApplication.length == 0) {
			// add application
			await db.insert(applications).values(applicationData);
			// update user image
			await db
				.update(users)
				.set({ image: avatarUrl, profileCompleted: true })
				.where(eq(users.id, userId));
		} else {
			return NextResponse.json(
				{ error: "Application already submitted" },
				{ status: 400 },
			);
		}

		return NextResponse.json({
			success: true,
			message: "Application submitted successfully",
			avatarUrl,
		});
	} catch (error) {
		console.error("Error submitting application:", error);
		return NextResponse.json(
			{ error: "Failed to submit application" },
			{ status: 500 },
		);
	}
}
