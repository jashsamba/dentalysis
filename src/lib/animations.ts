import { Variants } from "framer-motion";

// Basic slide and fade animation
export const fadeSlide: Variants = {
  initial: { opacity: 0, y: 20, clipPath: "inset(0 0 100% 0)" },
  animate: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    clipPath: "inset(100% 0 0 0)",
    transition: { duration: 0.3, ease: "easeInOut" },
  }, // Adjusted exit clipPath
};

// Placeholder for a springy pop animation
export const popSpring: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

// Placeholder for a subtle color pulse animation (e.g., on attention needed)
export const pulseColor: Variants = {
  animate: {
    backgroundColor: ["#ffffff", "#ffebee", "#ffffff"], // Example: White -> Light Pink -> White
    transition: { duration: 1.5, repeat: Infinity, repeatType: "loop" },
  },
};

// Placeholder for a tilt effect on hover
export const tiltHover = {
  scale: 1.03,
  rotateX: 5,
  rotateY: -5,
  transition: { type: "spring", stiffness: 400, damping: 15 },
};

// Placeholder for curtain reveal
export const curtainReveal: Variants = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  animate: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    clipPath: "inset(0 0 0 100%)",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// Placeholder for blur in
export const blurIn: Variants = {
  initial: { filter: "blur(10px)", opacity: 0 },
  animate: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.5 } },
  exit: { filter: "blur(10px)", opacity: 0, transition: { duration: 0.3 } },
};
