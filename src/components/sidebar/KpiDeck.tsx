import { TrendingUp } from "lucide-react";

interface KpiDeckProps {
  metric?: string;
  // Add other relevant KPI data props
}

export default function KpiDeck({ metric = "Default" }: KpiDeckProps) {
  return (
    <div className="p-4">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-pink" />
        Financial Snapshot
      </h3>
      <p className="text-sm text-muted-foreground">
        Showing KPIs related to: {metric}
      </p>
      {/* TODO: Add actual KPI cards/charts */}
    </div>
  );
}
