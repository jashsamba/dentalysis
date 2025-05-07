"use client";

import { useEffect, useState } from "react";

export function CurrentDateDisplay() {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    // Set the date string only after the component has mounted on the client
    setDateString(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  // Render placeholder or null initially to avoid mismatch
  if (!dateString) {
    return null; // Or a placeholder like <span className="text-sm text-muted-foreground">&nbsp;</span>
  }

  return <div className="text-sm text-muted-foreground">{dateString}</div>;
}
