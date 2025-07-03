"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home,
  LogOut,
  User,
  ChevronRight,
  Megaphone,
  FileText,
  BarChart3,
  Cog,
  QrCode,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { handleSignOut } from "@/lib/utils";
const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/hackerScanner", label: "Scanner", icon: QrCode },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone },
  { href: "/admin/users", label: "Users", icon: User },
  // { href: "/admin/applications", label: "Applications", icon: FileText },
  // { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  // { href: "/admin/settings", label: "Settings", icon: Cog },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Generate breadcrumb from pathname
  const generateBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumb = [];

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const href = "/" + segments.slice(0, i + 1).join("/");
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumb.push({ href, label });
    }

    return breadcrumb;
  };

  const breadcrumb = generateBreadcrumb();
  return (
    <header className="bg-[rgba(48,242,242,0.05)] border-b border-cyan-400/20 backdrop-blur-[25px] sticky top-0 z-50 w-full min-w-full">
      <div className="w-full px-2 sm:px-4 md:px-6 max-w-none">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 sm:py-4 min-w-0">
          {" "}
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-shrink-0">
            <Link
              href="/admin"
              className="flex items-center gap-2 sm:gap-3 min-w-0"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-[rgba(48,242,242,0.20)] flex items-center justify-center flex-shrink-0">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
              </div>{" "}
              <span className="text-lg sm:text-xl font-normal font-['FH_Lecturis_Rounded'] text-white truncate">
                <span className="hidden sm:inline">Hack404 </span>Admin
              </span>
            </Link>
          </div>
          {/* User Info and Actions */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 min-w-0">
            <div className="hidden sm:flex items-center gap-2 text-white/80 min-w-0">
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-light truncate">
                {session?.user?.name || "Admin"}
              </span>
            </div>

            <Link href="/" className="">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-cyan-400/30 hover:bg-[rgba(48,242,242,0.10)] hover:border-cyan-400/50 text-xs sm:text-sm px-2 sm:px-3"
              >
                {/* Return Icon */}
                <Home className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="inline">View Site</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-white border-cyan-400/30 hover:bg-[rgba(48,242,242,0.10)] hover:border-cyan-400/50 text-xs sm:text-sm px-2 sm:px-3"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="inline">Sign Out</span>
            </Button>
          </div>
        </div>{" "}
        {/* Breadcrumb Navigation */}
        {breadcrumb.length > 1 && (
          <div className="flex items-center gap-1 sm:gap-2 pb-2 sm:pb-4 text-xs sm:text-sm overflow-x-auto">
            {breadcrumb.map((item, index) => (
              <div
                key={item.href}
                className="flex items-center gap-1 sm:gap-2 flex-shrink-0"
              >
                {index > 0 && (
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" />
                )}
                <Link
                  href={item.href}
                  className={`${
                    index === breadcrumb.length - 1
                      ? "text-cyan-300 font-medium"
                      : "text-white/60 hover:text-white/80"
                  } transition-colors whitespace-nowrap`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        )}
        {/* Navigation Tabs */}
        <nav className="flex gap-0 sm:gap-1 pb-2 sm:pb-4 overflow-x-auto">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;

            return (
              <Link key={item.href} href={item.href} className="flex-shrink-0">
                <button
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-none text-xs sm:text-sm font-light transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[rgba(48,242,242,0.20)] text-cyan-300 border-b-2 border-cyan-300"
                      : "text-white/70 hover:text-white hover:bg-[rgba(48,242,242,0.10)]"
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
