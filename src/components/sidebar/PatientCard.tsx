import { UserCircle } from "lucide-react";

interface PatientCardProps {
  patientId?: string;
  // Add other relevant patient props based on actual data
}

export default function PatientCard({ patientId = "N/A" }: PatientCardProps) {
  return (
    <div className="p-4">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <UserCircle className="w-5 h-5 text-pink" />
        Patient Focus
      </h3>
      <p className="text-sm text-muted-foreground">
        Displaying info for Patient ID: {patientId}
      </p>
      {/* TODO: Add actual patient details and actions */}
    </div>
  );
}
