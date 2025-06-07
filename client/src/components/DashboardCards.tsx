import { useQuery } from "@tanstack/react-query";
import { Users, FolderOpen, Bell, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardStats {
  teamMembers: number;
  activeProjects: number;
  notifications: number;
}

export function DashboardCards() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <Skeleton className="w-16 h-6 rounded-full" />
              </div>
              <Skeleton className="w-20 h-4 mb-1" />
              <Skeleton className="w-16 h-8 mb-2" />
              <Skeleton className="w-24 h-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Team Members Card */}
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              +2 this week
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Team Members</h3>
          <p className="text-3xl font-bold text-slate-800">{stats?.teamMembers || 0}</p>
          <p className="text-sm text-slate-500 mt-2">Active team members</p>
        </CardContent>
      </Card>

      {/* Active Projects Card */}
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="h-6 w-6 text-success" />
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              3 due soon
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Active Projects</h3>
          <p className="text-3xl font-bold text-slate-800">{stats?.activeProjects || 0}</p>
          <p className="text-sm text-slate-500 mt-2">Projects in progress</p>
        </CardContent>
      </Card>

      {/* Notifications Card */}
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell className="h-6 w-6 text-orange-500" />
            </div>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              New
            </span>
          </div>
          <h3 className="text-slate-600 text-sm font-medium mb-1">Notifications</h3>
          <p className="text-3xl font-bold text-slate-800">{stats?.notifications || 0}</p>
          <p className="text-sm text-slate-500 mt-2">Unread notifications</p>
        </CardContent>
      </Card>
    </div>
  );
}
