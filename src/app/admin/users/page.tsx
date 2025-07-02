"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  UserCheck,
  UserCog,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Settings,
  Award,
  Mail,
  UserPlus,
  MoreVertical,
  X,
} from "lucide-react";

interface UserStats {
  totalUsers: number;
  completedProfiles: number;
  adminUsers: number;
  streams: {
    beginner: number;
    normal: number;
    unassigned: number;
  };
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  stream: "beginner" | "normal" | null;
  isadmin: boolean;
  profileCompleted: boolean;
  checkedin: boolean;
  rsvp: boolean;
  meal: boolean;
  microhackscomplete: number;
  emailVerified: Date | null;
}

interface UserListResponse {
  users: User[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export default function UsersPage() {
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    completedProfiles: 0,
    adminUsers: 0,
    streams: {
      beginner: 0,
      normal: 0,
      unassigned: 0,
    },
  });
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userListLoading, setUserListLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [streamFilter, setStreamFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusPopup, setStatusPopup] = useState<{
    userId: string;
    position: { x: number; y: number };
  } | null>(null);

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/admin/api/users/total");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Fetch users list
  useEffect(() => {
    const fetchUsers = async () => {
      setUserListLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: "20",
          search,
          stream: streamFilter,
          sortBy,
          sortOrder,
        });

        const response = await fetch(`/admin/api/users?${params}`);
        if (response.ok) {
          const data: UserListResponse = await response.json();
          setUsers(data.users);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setUserListLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, search, streamFilter, sortBy, sortOrder]);

  const handleSearch = () => {
    setSearch(searchInput);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setCurrentPage(1);
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      const response = await fetch(`/admin/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        // Refresh the user list
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: "20",
          search,
          stream: streamFilter,
          sortBy,
          sortOrder,
        });

        const refreshResponse = await fetch(`/admin/api/users?${params}`);
        if (refreshResponse.ok) {
          const data: UserListResponse = await refreshResponse.json();
          setUsers(data.users);
        }
      }
    } catch (error) {
      console.error("Error performing user action:", error);
    }
  };

  const getDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.name || user.email || "Unknown User";
  };

  const handleStatusHeaderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setStatusPopup({
      userId: "legend", // Special ID for legend
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      },
    });
  };

  const closeStatusPopup = () => {
    setStatusPopup(null);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (statusPopup) {
        closeStatusPopup();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [statusPopup]);

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-4 sm:py-8 max-w-none">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-2">
          User Management
        </h1>
        <p className="text-white/60 text-sm sm:text-base font-light">
          View and manage user accounts
        </p>
      </div>

      {/* Statistics Dashboard */}
      <div className="mb-8">
        <h2 className="text-xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-4">
          User Statistics
        </h2>

        {/* Stream Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-cyan-300 mb-1">
                {loading ? "--" : stats.streams.beginner}
              </div>
              <div className="text-white/60 text-sm">Beginner Stream</div>
            </CardContent>
          </Card>

          <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-cyan-300 mb-1">
                {loading ? "--" : stats.streams.normal}
              </div>
              <div className="text-white/60 text-sm">Normal Stream</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* User List Section */}
      <div className="mb-8">
        <h2 className="text-xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-4">
          User List
        </h2>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search users by name or email..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="p-2 bg-[rgba(48,242,242,0.10)] border-cyan-400/20 text-white placeholder:text-white/40"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="px-4 bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400/30 rounded-none"
              variant="outline"
            >
              Search
            </Button>
            {(search || searchInput) && (
              <Button
                onClick={handleClearSearch}
                className="bg-red-400/20 text-red-300 border border-red-400/30 hover:bg-red-400/30 px-4 rounded-none"
                variant="outline"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <select
            value={streamFilter}
            onChange={(e) => setStreamFilter(e.target.value)}
            className="px-3 py-2 bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 text-white rounded-md"
          >
            <option value="">All Streams</option>
            <option value="beginner">Beginner</option>
            <option value="normal">Normal</option>
          </select>
        </div>

        {/* Active Search Indicator */}
        {search && (
          <div className="mb-4 p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-cyan-300 text-sm">
                Searching for: <span className="font-medium">"{search}"</span>
              </span>
              <Button
                onClick={handleClearSearch}
                size="sm"
                variant="ghost"
                className="text-cyan-300 hover:text-cyan-200 h-auto p-1"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}

        {/* User Table */}
        <Card className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px]">
          <CardContent className="p-0">
            {userListLoading ? (
              <div className="p-8 text-center text-white/60">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center text-white/60">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cyan-400/20">
                      <th className="text-left p-2 text-white/80 font-medium">
                        User
                      </th>
                      <th className="text-left p-2 text-white/80 font-medium hidden sm:table-cell">
                        Email
                      </th>
                      <th className="text-left px-4 py-2 text-white/80 font-medium">
                        Stream
                      </th>
                      <th
                        className="text-center px-4 py-2 text-white/80 font-medium cursor-pointer hover:text-cyan-300 transition-colors"
                        onClick={handleStatusHeaderClick}
                        title="Click for status legend"
                      >
                        Status
                      </th>
                      <th className="text-center p-2 text-white/80 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-cyan-400/10 hover:bg-[rgba(48,242,242,0.05)]"
                      >
                        <td className="py-4 px-2">
                          <div>
                            <div className="text-white font-medium">
                              {getDisplayName(user)}
                            </div>
                            {user.isadmin && (
                              <div className="text-xs text-cyan-300 flex items-center gap-1">
                                <Settings className="w-3 h-3" />
                                Admin
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <span className="text-white/80">{user.email}</span>
                            {user.emailVerified && (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              user.stream === "beginner"
                                ? "bg-blue-500/20 text-blue-300"
                                : user.stream === "normal"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                            }`}
                          >
                            {user.stream || "rejected"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                user.checkedin ? "bg-green-400" : "bg-gray-400"
                              }`}
                              title={`Checked ${user.checkedin ? "In" : "Out"}`}
                            />
                            <div
                              className={`w-2 h-2 rounded-full ${
                                user.meal ? "bg-blue-400" : "bg-gray-400"
                              }`}
                              title={`${user.meal ? "Already eaten" : "Has not eaten"}`}
                            />
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-2">
                            {!user.checkedin && user.rsvp && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleUserAction(user.id, "checkin")
                                }
                                className="text-xs bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30"
                              >
                                Check In
                              </Button>
                            )}
                            {user.checkedin && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleUserAction(user.id, "checkout")
                                }
                                className="text-xs bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30"
                              >
                                Check Out
                              </Button>
                            )}
                            {!user.isadmin && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleUserAction(user.id, "makeAdmin")
                                }
                                className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                              >
                                Make Admin
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-white/60 text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="bg-[rgba(48,242,242,0.10)] border-cyan-400/20 text-white hover:bg-[rgba(48,242,242,0.20)]"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="bg-[rgba(48,242,242,0.10)] border-cyan-400/20 text-white hover:bg-[rgba(48,242,242,0.20)]"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Status Popup */}
      {statusPopup && (
        <div
          className="fixed z-50 bg-[rgba(0,0,0,0.9)] border border-cyan-400/30 rounded-md p-4 backdrop-blur-md"
          style={{
            left: statusPopup.position.x,
            top: statusPopup.position.y,
            transform: "translateX(-50%) translateY(-100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-white text-sm space-y-3 min-w-[200px]">
            <h3 className="text-cyan-300 font-medium mb-3">Status Legend</h3>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span>Checked In</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span>Meal Received</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span>Inactive/Not Done</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
