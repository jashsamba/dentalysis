import { useQuery } from "@tanstack/react-query";
import kpiData from "@/mocks/kpis.json"; // Import mock data
import React from "react";

// Define the structure of a single KPI based on the JSON
export interface Kpi {
  id: string;
  title: string;
  value: string;
  delta: string;
  icon: string; // We'll map this string to an icon component later
}

// Define the structure of the entire data including thresholds
interface KpiData {
  kpis: Kpi[];
  thresholds: { [key: string]: number };
}

// Placeholder for actual Supabase fetch function
const fetchKpisFromSupabase = async (): Promise<KpiData> => {
  console.log("Fetching KPIs from Supabase (placeholder)... Zzz...");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  // TODO: Replace with actual Supabase client call
  // const { data, error } = await supabase.from('kpi_view').select('*');
  // if (error) throw new Error(error.message);
  // return data as KpiData; // Assuming the view returns data in the correct shape

  // For now, return mock data
  return kpiData as KpiData;
};

// Custom hook to fetch KPIs
export function useKpis() {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO === "1";

  // Restore useQuery
  return useQuery<KpiData, Error>({
    queryKey: ["kpis"],
    queryFn: isDemoMode
      ? async () => kpiData as KpiData
      : fetchKpisFromSupabase,
    staleTime: 5 * 60 * 1000,
  });

  /* --- TEMPORARY SIMPLIFICATION (Remove) --- 
  // Simulate the structure returned by useQuery for now
  if (isDemoMode) {
      return {
          data: kpiData as KpiData,
          isLoading: false,
          error: null
      };
  } else {
       const [loading, setLoading] = React.useState(true); 
       const [error, setError] = React.useState<Error | null>(null);
       const [data, setData] = React.useState<KpiData | null>(null);

       React.useEffect(() => { 
            setLoading(true);
            fetchKpisFromSupabase()
                .then(d => setData(d))
                .catch(e => setError(e))
                .finally(() => setLoading(false));
       }, []);

       return { data, isLoading: loading, error };
  }
   --- END TEMPORARY SIMPLIFICATION --- */
}
