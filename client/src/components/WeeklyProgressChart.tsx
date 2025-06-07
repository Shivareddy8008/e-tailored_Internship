import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp } from "lucide-react";

interface WeeklyProgressData {
  day: string;
  completed: number;
  planned: number;
}

export function WeeklyProgressChart() {
  const { data: weeklyData, isLoading } = useQuery<WeeklyProgressData[]>({
    queryKey: ["/api/dashboard/weekly-progress"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <CardHeader className="p-0 mb-6">
          <div className="flex items-center justify-between">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-32 h-10" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Skeleton className="w-full h-64 rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
      <CardHeader className="p-0 mb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Progress
          </CardTitle>
          <Select defaultValue="7days">
            <SelectTrigger className="w-40 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                dataKey="day" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend />
              <Bar 
                dataKey="completed" 
                fill="hsl(207, 90%, 54%)" 
                name="Completed Tasks"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="planned" 
                fill="hsl(210, 20%, 98%)" 
                stroke="hsl(207, 90%, 54%)"
                strokeWidth={2}
                name="Planned Tasks"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
