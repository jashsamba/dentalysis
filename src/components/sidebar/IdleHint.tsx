import { Info } from "lucide-react";

export default function IdleHint() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <Info className="w-10 h-10 text-muted-foreground mb-4" />
      <p className="text-sm text-muted-foreground">
        Ask DentAI a question! Relevant info or actions will appear here.
      </p>
    </div>
  );
}
