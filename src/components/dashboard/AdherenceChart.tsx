
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const weeklyData = [
  { day: 'Mon', taken: 4, total: 4 },
  { day: 'Tue', taken: 3, total: 4 },
  { day: 'Wed', taken: 4, total: 4 },
  { day: 'Thu', taken: 2, total: 4 },
  { day: 'Fri', taken: 4, total: 4 },
  { day: 'Sat', taken: 3, total: 4 },
  { day: 'Sun', taken: 4, total: 4 },
];

export const AdherenceChart = () => {
  const totalTaken = weeklyData.reduce((sum, day) => sum + day.taken, 0);
  const totalScheduled = weeklyData.reduce((sum, day) => sum + day.total, 0);
  const adherenceRate = Math.round((totalTaken / totalScheduled) * 100);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Adherence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Adherence</span>
              <span className="font-medium">{adherenceRate}%</span>
            </div>
            <Progress value={adherenceRate} className="h-2" />
          </div>
          
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Bar dataKey="taken" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <span className="font-medium">{totalTaken}/{totalScheduled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Streak</span>
              <span className="font-medium">3 days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Next Dose</span>
              <span className="font-medium">8:00 PM</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
