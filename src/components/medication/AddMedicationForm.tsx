
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Medication } from "@/components/dashboard/Dashboard";

interface AddMedicationFormProps {
  onAdd: (medication: Omit<Medication, 'id'>) => void;
}

export const AddMedicationForm = ({ onAdd }: AddMedicationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    times: [""],
    startDate: new Date().toISOString().split('T')[0],
    duration: 30,
    instructions: ""
  });
  const { toast } = useToast();

  const frequencyOptions = {
    'daily': { label: 'Once daily', timeSlots: 1 },
    'twice-daily': { label: 'Twice daily', timeSlots: 2 },
    'three-times-daily': { label: 'Three times daily', timeSlots: 3 },
    'weekly': { label: 'Weekly', timeSlots: 1 },
  };

  const handleFrequencyChange = (frequency: string) => {
    const timeSlots = (frequencyOptions as any)[frequency]?.timeSlots || 1;
    const newTimes = Array(timeSlots).fill("").map((_, index) => {
      if (index === 0) return "08:00";
      if (index === 1) return "14:00";
      if (index === 2) return "20:00";
      return "";
    });
    
    setFormData({
      ...formData,
      frequency,
      times: newTimes
    });
  };

  const handleTimeChange = (index: number, time: string) => {
    const newTimes = [...formData.times];
    newTimes[index] = time;
    setFormData({ ...formData, times: newTimes });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dosage || !formData.frequency) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.times.some(time => !time)) {
      toast({
        title: "Error",
        description: "Please set all medication times",
        variant: "destructive",
      });
      return;
    }

    onAdd(formData);
    toast({
      title: "Success",
      description: "Medication added successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Medication Name *</Label>
        <Input
          id="name"
          placeholder="e.g., Aspirin"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dosage">Dosage *</Label>
        <Input
          id="dosage"
          placeholder="e.g., 75mg, 1 tablet"
          value={formData.dosage}
          onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="frequency">Frequency *</Label>
        <Select value={formData.frequency} onValueChange={handleFrequencyChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(frequencyOptions).map(([key, value]) => (
              <SelectItem key={key} value={key}>{value.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.frequency && (
        <div className="space-y-2">
          <Label>Medication Times *</Label>
          {formData.times.map((time, index) => (
            <Input
              key={index}
              type="time"
              value={time}
              onChange={(e) => handleTimeChange(index, e.target.value)}
              required
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 30 })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instructions">Instructions (optional)</Label>
        <Textarea
          id="instructions"
          placeholder="e.g., Take with food, Avoid alcohol"
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          rows={2}
        />
      </div>

      <Button type="submit" className="w-full">
        Add Medication
      </Button>
    </form>
  );
};
