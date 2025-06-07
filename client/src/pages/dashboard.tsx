import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Dashboard } from "@/components/Dashboard";
import { User } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem("businesshub_user");
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setLocation("/");
      }
    } else {
      // Redirect to onboarding if no user data found
      setLocation("/");
    }
    
    setLoading(false);
  }, [setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Skeleton className="w-40 h-8" />
              <div className="flex items-center space-x-4">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-24 h-6" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Skeleton className="w-80 h-10 mb-2" />
            <Skeleton className="w-96 h-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-full h-32 rounded-xl" />
            ))}
          </div>
          
          <Skeleton className="w-full h-80 rounded-xl mb-8" />
          <Skeleton className="w-full h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <Dashboard user={user} />;
}
