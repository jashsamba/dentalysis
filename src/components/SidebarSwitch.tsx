"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSidebarStore } from "@/lib/store/useSidebar";
import { fadeSlide } from "@/lib/animations";

// Import the sidebar components
import IdleHint from "./sidebar/IdleHint";
import PatientCard from "./sidebar/PatientCard";
import KpiDeck from "./sidebar/KpiDeck";
import UploadZone from "./sidebar/UploadZone";
import ImageViewer from "./sidebar/ImageViewer";

export default function SidebarSwitch() {
  const { mode, payload } = useSidebarStore();

  const renderContent = () => {
    switch (mode) {
      case "patient":
        return <PatientCard key="patient" {...payload} />;
      case "finance":
        return <KpiDeck key="finance" {...payload} />;
      case "uploader":
        return <UploadZone key="uploader" />;
      case "image":
        return <ImageViewer key="image" {...payload} />;
      case "idle":
      default:
        return <IdleHint key="idle" />;
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {" "}
      {/* initial=false prevents initial animation on load */}
      <motion.div
        key={mode} // Change key based on mode to trigger animation
        variants={fadeSlide}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full w-full overflow-hidden" // Needed for clipPath animations
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}
