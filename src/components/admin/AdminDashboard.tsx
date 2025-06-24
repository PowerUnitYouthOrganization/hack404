'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RoundedButton from '@/components/ui/roundedbutton';
import { 
  Megaphone,
  Users,
  Settings,
  BarChart3,
  FileText,
  Shield,
  QrCode
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
    title: 'HackerScanner',
    description: 'Scan hackerQR and manage user accounts fast and efficiently',
    href: '/admin/hackerScanner',
    icon: QrCode,
    color: '#30F2F2'
  },
  {
    title: 'Comming Soon',
    description: 'View and manage user accounts',
    href: '/admin/users',
    icon: Users,
    color: '#30F2F2'
  },
  {
    title: 'Comming Soon',
    description: 'View and manage user accounts',
    href: '/admin/users2',
    icon: Users,
    color: '#30F2F2'
  },
  {
    title: 'Comming Soon',
    description: 'View and manage user accounts',
    href: '/admin/users3',
    icon: Users,
    color: '#30F2F2'
  },
  {
    title: 'Comming Soon',
    description: 'View and manage user accounts',
    href: '/admin/users4',
    icon: Users,
    color: '#30F2F2'
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: '--',
    totalApplications: '--',
    totalAnnouncements: '--',
    isLoading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch all stats in parallel
        const [usersResponse, applicationsResponse, announcementsResponse] = await Promise.all([
          fetch('/admin/api/total-users'),
          fetch('/admin/api/applications'),
          fetch('/admin/api/announcements-stats')
        ]);

        if (usersResponse.ok && applicationsResponse.ok && announcementsResponse.ok) {
          const [usersData, applicationsData, announcementsData] = await Promise.all([
            usersResponse.json(),
            applicationsResponse.json(),
            announcementsResponse.json()
          ]);

          setStats({
            totalUsers: usersData.totalUsers || 0,
            totalApplications: applicationsData.totalApplications || 0,
            totalAnnouncements: announcementsData.totalAnnouncements || 0,
            isLoading: false
          });
        } else {
          console.error('Failed to fetch admin statistics');
          setStats(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error fetching admin statistics:', error);
        setStats(prev => ({ ...prev, isLoading: false }));
      }
    };

    fetchStats();
  }, []);
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
              </CardHeader>              <CardContent className="pt-0">
                <Link href={route.href}>
                  <RoundedButton
                    type="button"
                    color={route.color}
                  >
                    Access {route.title}
                  </RoundedButton>
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
        </h2>        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">
                {stats.isLoading ? '--' : stats.totalUsers}
              </div>
              <div className="text-white/60 text-sm">Total Users</div>
            </CardContent>
          </Card>
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">
                {stats.isLoading ? '--' : stats.totalApplications}
              </div>
              <div className="text-white/60 text-sm">Applications</div>
            </CardContent>
          </Card>
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-300 mb-1">
                {stats.isLoading ? '--' : stats.totalAnnouncements}
              </div>
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
