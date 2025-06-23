
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, Calendar, Clock, X } from "lucide-react";
import { Medication } from "@/components/dashboard/Dashboard";

interface MedicationListProps {
  medications: Medication[];
  onDelete: (id: string) => void;
}

export const MedicationList = ({ medications, onDelete }: MedicationListProps) => {
  const formatFrequency = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'twice-daily': return '2x Daily';
      case 'three-times-daily': return '3x Daily';
      case 'weekly': return 'Weekly';
      default: return frequency;
    }
  };

  return (
    <div className="space-y-3">
      {medications.map((medication) => (
        <Card key={medication.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Pill className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{medication.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{medication.dosage}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {formatFrequency(medication.frequency)}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {medication.duration} days
                    </Badge>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Times: {medication.times.join(', ')}
                  </div>
                  
                  {medication.instructions && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      {medication.instructions}
                    </p>
                  )}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                onClick={() => onDelete(medication.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {medications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Pill className="mx-auto h-12 w-12 text-gray-300 mb-2" />
          <p>No medications added yet</p>
          <p className="text-sm">Click "Add Medication" to get started</p>
        </div>
      )}
    </div>
  );
};
