"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react"; // Import from lucide-react
import { IconButton, Icon, useColorMode, Tooltip } from "@chakra-ui/react";

interface ThemeToggleProps {
  className?: string; // Keep className prop if used elsewhere, though Chakra prefers style props
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  // Determine the icon and label based on Chakra's colorMode state
  const SwitchIcon = colorMode === "light" ? Moon : Sun;
  const toggleLabel = colorMode === "light" ? "Switch to dark mode" : "Switch to light mode";

  return (
    <Tooltip label={toggleLabel} placement="bottom">
      <IconButton
        aria-label={toggleLabel}
        variant="ghost"
        size="md" // Adjust size as needed
        className={className} // Pass className if provided
        onClick={toggleColorMode} // Call Chakra's toggle function
        icon={<Icon as={SwitchIcon} boxSize={5} />} // Use determined icon
      />
    </Tooltip>
  );
}
