import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Applications | Hack404",
  description: "Apply to Hack404",
};

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
