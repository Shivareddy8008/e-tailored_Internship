import { User } from "@shared/schema";
import { DashboardCards } from "./DashboardCards";
import { WeeklyProgressChart } from "./WeeklyProgressChart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, User as UserIcon } from "lucide-react";

interface DashboardProps {
  user: User;
}

export function Dashboard({ user }: DashboardProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-800">ProjectFlow</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                <span className="text-slate-700 font-medium">
                  {user.firstName} {user.lastName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome back, {user.firstName}!
          </h2>
          <p className="text-slate-600">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Cards */}
        <DashboardCards />

        {/* Weekly Progress Chart */}
        <WeeklyProgressChart />

        {/* User Info Section */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <CardContent className="p-0">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-slate-600 mb-2">Personal Details</h4>
                <div className="space-y-2">
                  <p className="text-slate-800">
                    <span className="font-medium">Name:</span>{" "}
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-slate-800">
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-600 mb-2">Business Details</h4>
                <div className="space-y-2">
                  <p className="text-slate-800">
                    <span className="font-medium">Company:</span> {user.companyName}
                  </p>
                  <p className="text-slate-800">
                    <span className="font-medium">Industry:</span> {user.industry}
                  </p>
                  <p className="text-slate-800">
                    <span className="font-medium">Size:</span> {user.companySize}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
