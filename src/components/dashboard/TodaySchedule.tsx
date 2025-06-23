
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, X } from "lucide-react";
import { Medication } from "./Dashboard";
import { useState } from "react";

interface TodayScheduleProps {
  medications: Medication[];
}

interface ScheduleItem {
  medicationId: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  missed: boolean;
}

export const TodaySchedule = ({ medications }: TodayScheduleProps) => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(() => {
    const items: ScheduleItem[] = [];
    medications.forEach(med => {
      med.times.forEach(time => {
        items.push({
          medicationId: med.id,
          name: med.name,
          dosage: med.dosage,
          time,
          taken: false,
          missed: false
        });
      });
    });
    return items.sort((a, b) => a.time.localeCompare(b.time));
  });

  const handleMarkTaken = (index: number) => {
    const updated = [...scheduleItems];
    updated[index] = { ...updated[index], taken: true, missed: false };
    setScheduleItems(updated);
  };

  const handleMarkMissed = (index: number) => {
    const updated = [...scheduleItems];
    updated[index] = { ...updated[index], missed: true, taken: false };
    setScheduleItems(updated);
  };

  const getStatusBadge = (item: ScheduleItem) => {
    if (item.taken) {
      return <Badge className="bg-green-100 text-green-800">Taken</Badge>;
    }
    if (item.missed) {
      return <Badge variant="destructive">Missed</Badge>;
    }
    return <Badge variant="secondary">Pending</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Today's Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scheduleItems.map((item, index) => (
            <div key={`${item.medicationId}-${item.time}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  {getStatusBadge(item)}
                </div>
                <p className="text-xs text-gray-600">{item.dosage} at {item.time}</p>
              </div>
              
              {!item.taken && !item.missed && (
                <div className="flex space-x-1 ml-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                    onClick={() => handleMarkTaken(index)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                    onClick={() => handleMarkMissed(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          {scheduleItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Clock className="mx-auto h-12 w-12 text-gray-300 mb-2" />
              <p>No medications scheduled for today</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
