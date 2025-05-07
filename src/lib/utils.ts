import { clsx, type ClassValue } from "clsx";

// Removed twMerge and cn function as tailwind-merge is no longer used.
// Components should use clsx directly or Chakra UI style props.

export { clsx }; // Re-export clsx if needed elsewhere
export type { ClassValue }; // Re-export ClassValue type if needed
