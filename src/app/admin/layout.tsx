import { db, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";

/**
 * The gatekeeper for protected routes in the application.
 * @param param0 - The children components to render within the protected layout.
 * @returns Children components if the user is authenticated, otherwise redirects to the login page.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    console.log("User is not authenticated, redirecting to login");
    redirect("/login");
  }
  
  if (!session.user?.id) {
    console.log("User ID is not available, redirecting to login");
    redirect("/login");
  }

  const user = await db
    .select({ isAdmin: users.isadmin })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (!user.length) {
    console.log("User not found in the database, redirecting to login");
    redirect("/login");
  }

  if (!user[0].isAdmin) {
    // forbidden access for non-admin users
    console.log("User is not an admin, redirecting to home page");
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
}
