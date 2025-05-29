import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * The gatekeeper for protected routes in the application.
 * @param param0 - The children components to render within the protected layout.
 * @returns Children components if the user is authenticated, otherwise redirects to the login page.
 */
export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
