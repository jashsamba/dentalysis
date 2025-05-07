"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface InsightToastProps {
  message: string | null; // Message to display, or null to hide
  onDismiss: () => void; // Callback when toast should be logically dismissed
  thresholdMet: boolean; // Controls whether the toast should be shown
}

export const InsightToast: React.FC<InsightToastProps> = ({
  message,
  onDismiss,
  thresholdMet,
}) => {
  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (thresholdMet && message) {
      // Use sonner to display the toast
      // We wrap it in our motion component visually if needed, but sonner handles showing/hiding
      toast.custom(
        (t) => (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 p-4 rounded-lg shadow-lg bg-pink text-white max-w-sm"
          >
            <AlertTriangle className="h-6 w-6 flex-shrink-0" />
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={() => {
                toast.dismiss(t);
                onDismiss();
              }}
              className="ml-auto text-white/80 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        ),
        {
          id: "insight-toast", // Ensure only one instance
          duration: 5000, // Auto-dismiss after 5 seconds
          position: "bottom-left",
          onDismiss: onDismiss, // Call our dismiss logic when sonner dismisses
          onAutoClose: onDismiss, // Call our dismiss logic on auto-close
        },
      );

      // Although sonner handles dismiss, we might want internal logic tied to 5s
      timerId = setTimeout(() => {
        onDismiss(); // Ensure state is updated even if user doesn't interact
      }, 5000);
    } else {
      // If threshold is no longer met, dismiss the specific toast if it exists
      toast.dismiss("insight-toast");
    }

    return () => {
      if (timerId) clearTimeout(timerId);
      // Optional: dismiss on unmount? Depends on desired behavior
      // toast.dismiss('insight-toast');
    };
  }, [message, thresholdMet, onDismiss]);

  // This component doesn't render anything itself
  // It uses the sonner library to imperatively show toasts
  return null;
};
