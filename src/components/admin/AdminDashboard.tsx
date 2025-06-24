'use client';

import Link from 'next/link';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Megaphone,
  Users,
  Settings,
  BarChart3,
  FileText,
  Shield
} from 'lucide-react';

const adminRoutes = [
  {
    title: 'Announcements',
    description: 'Manage and create announcements for users',
    href: '/admin/announcements',
    icon: Megaphone,
    color: '#30F2F2'
  },
  {
    title: 'Users',
    description: 'View and manage user accounts',
    href: '/admin/users',
    icon: Users,
    color: '#30F2F2'
  },
  {
    title: 'Applications',
    description: 'Review hacker applications',
    href: '/admin/applications',
    icon: FileText,
    color: '#30F2F2'
  },
  {
    title: 'Analytics',
    description: 'View platform statistics and metrics',
    href: '/admin/analytics',
    icon: BarChart3,
    color: '#30F2F2'
  },
  {
    title: 'Permissions',
    description: 'Manage admin roles and permissions',
    href: '/admin/permissions',
    icon: Shield,
    color: '#30F2F2'
  },
  {
    title: 'Settings',
    description: 'Configure platform settings',
    href: '/admin/settings',
    icon: Settings,
    color: '#30F2F2'
  }
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-white/60 text-lg font-light">
          Manage your Hack404 platform
        </p>
      </div>
      {/* Admin Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminRoutes.map((route) => {
          const IconComponent = route.icon;
          
          return (
            <Card 
              key={route.href}
              className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px] hover:bg-[rgba(48,242,242,0.15)] transition-all duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-md bg-[rgba(48,242,242,0.20)]">
                    <IconComponent className="w-6 h-6 text-cyan-300" />
                  </div>
                  <CardTitle className="text-white text-xl font-normal font-['FH_Lecturis_Rounded']">
                    {route.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-white/60 text-sm font-light">
                  {route.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={route.href}>
                  <div className="flex p-1 items-center gap-1 rounded-[100px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px] h-12 hover:bg-[rgba(48,242,242,0.30)] transition-all duration-200">
                    <button
                      type="button"
                      className="h-10 flex pr-3 py-2 pl-4 justify-center items-center gap-2 text-[14px] rounded-[100px] font-light cursor-pointer text-black transition-all hover:brightness-110 w-full"
                      style={{ backgroundColor: route.color }}
                    >
                      Access {route.title}
                      <svg
                        className="w-4 h-4 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Quick Stats Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-6">
          Quick Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">--</div>
              <div className="text-white/60 text-sm">Total Users</div>
            </CardContent>
          </Card>
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">--</div>
              <div className="text-white/60 text-sm">Applications</div>
            </CardContent>
          </Card>
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">--</div>
              <div className="text-white/60 text-sm">Announcements</div>
            </CardContent>
          </Card>
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">--</div>
              <div className="text-white/60 text-sm">Active Sessions</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
