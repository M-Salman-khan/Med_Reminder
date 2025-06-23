
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { MedicationList } from "@/components/medication/MedicationList";
import { AddMedicationForm } from "@/components/medication/AddMedicationForm";
import { TodaySchedule } from "@/components/dashboard/TodaySchedule";
import { AdherenceChart } from "@/components/dashboard/AdherenceChart";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface DashboardProps {
  user: string | null;
  onLogout: () => void;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  duration: number;
  instructions?: string;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Aspirin",
      dosage: "75mg",
      frequency: "daily",
      times: ["08:00"],
      startDate: "2025-01-01",
      duration: 30,
      instructions: "Take with food"
    },
    {
      id: "2",
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "daily",
      times: ["20:00"],
      startDate: "2025-01-01",
      duration: 90,
      instructions: "Take with dinner"
    }
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication = {
      ...medication,
      id: Date.now().toString()
    };
    setMedications([...medications, newMedication]);
    setIsAddDialogOpen(false);
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Today's Schedule */}
          <div className="lg:col-span-1">
            <TodaySchedule medications={medications} />
          </div>
          
          {/* Middle Column - Medications List */}
          <div className="lg:col-span-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Medications</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Medication</DialogTitle>
                  </DialogHeader>
                  <AddMedicationForm onAdd={handleAddMedication} />
                </DialogContent>
              </Dialog>
            </div>
            <MedicationList 
              medications={medications} 
              onDelete={handleDeleteMedication}
            />
          </div>
          
          {/* Right Column - Adherence Chart */}
          <div className="lg:col-span-1">
            <AdherenceChart />
          </div>
        </div>
      </div>
    </div>
  );
};
