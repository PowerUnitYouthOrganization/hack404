'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  Home,
  LogOut,
  User,
  ChevronRight
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { handleSignOut } from '@/lib/utils';
const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();


  // Generate breadcrumb from pathname
  const generateBreadcrumb = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumb = [];
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const href = '/' + segments.slice(0, i + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumb.push({ href, label });
    }
    
    return breadcrumb;
  };

  const breadcrumb = generateBreadcrumb();

  return (
    <header className="bg-[rgba(48,242,242,0.05)] border-b border-cyan-400/20 backdrop-blur-[25px] sticky top-0 z-50">
      <div className="container mx-auto px-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-[rgba(48,242,242,0.20)] flex items-center justify-center">
                <Home className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-xl font-normal font-['FH_Lecturis_Rounded'] text-white">
                Hack404 Admin
              </span>
            </Link>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <User className="w-4 h-4" />
              <span className="text-sm font-light">
                {session?.user?.name || 'Admin'}
              </span>
            </div>
            
            <Link href="/">
              <Button 
                variant="outline"
                size="sm"
                className="text-white border-cyan-400/30 hover:bg-[rgba(48,242,242,0.10)] hover:border-cyan-400/50"
              >
                View Site
              </Button>
            </Link>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-white border-cyan-400/30 hover:bg-[rgba(48,242,242,0.10)] hover:border-cyan-400/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        {breadcrumb.length > 1 && (
          <div className="flex items-center gap-2 pb-4 text-sm">
            {breadcrumb.map((item, index) => (
              <div key={item.href} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-white/40" />
                )}
                <Link 
                  href={item.href}
                  className={`${
                    index === breadcrumb.length - 1 
                      ? 'text-cyan-300 font-medium' 
                      : 'text-white/60 hover:text-white/80'
                  } transition-colors`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Tabs */}
        <nav className="flex gap-1 pb-4">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-none text-sm font-light transition-all ${
                    isActive
                      ? 'bg-[rgba(48,242,242,0.20)] text-cyan-300 border-b-2 border-cyan-300'
                      : 'text-white/70 hover:text-white hover:bg-[rgba(48,242,242,0.10)]'
                  }`}
                >
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                  {item.label}
                </button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
