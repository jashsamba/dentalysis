import { create } from "zustand";

// Define possible modes for the sidebar
type SidebarMode = "idle" | "patient" | "finance" | "uploader" | "image";

// Define the state structure
interface SidebarState {
  mode: SidebarMode;
  payload: any; // Can hold data needed by the specific sidebar component
  setMode: (mode: SidebarMode, payload?: any) => void;
}

// Create the Zustand store
export const useSidebarStore = create<SidebarState>((set) => ({
  mode: "idle", // Default mode
  payload: null,
  setMode: (mode, payload = null) => set({ mode, payload }),
}));

// Helper function to determine sidebar mode from prompt keywords
// TODO: Replace with more robust logic or LLM classification later
export const setSidebarFromPrompt = (prompt: string) => {
  const lowerPrompt = prompt.toLowerCase();
  const { setMode } = useSidebarStore.getState(); // Get setMode from the store

  // Simple keyword matching (can be expanded significantly)
  if (lowerPrompt.includes("patient") || lowerPrompt.includes("appointment")) {
    setMode("patient", { patientId: "mock-123" }); // Example payload
  } else if (
    lowerPrompt.includes("financ") ||
    lowerPrompt.includes("revenue") ||
    lowerPrompt.includes("kpi") ||
    lowerPrompt.includes("cost") ||
    lowerPrompt.includes("profit")
  ) {
    setMode("finance", { metric: "revenue" }); // Example payload
  } else if (
    lowerPrompt.includes("upload") ||
    lowerPrompt.includes("file") ||
    lowerPrompt.includes("csv")
  ) {
    setMode("uploader");
  } else if (
    lowerPrompt.includes("image") ||
    lowerPrompt.includes("x-ray") ||
    lowerPrompt.includes("scan")
  ) {
    setMode("image", {
      imageUrl:
        "https://placehold.co/600x400/EEE/31343C?text=X-Ray+Placeholder",
    }); // Example payload
  } else {
    // Optionally reset to idle if no keywords match, or keep the current mode
    // setMode('idle');
  }
};
