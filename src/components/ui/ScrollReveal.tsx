"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 28,
  duration = 0.65,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  if (direction === "up") initial.y = distance;
  if (direction === "down") initial.y = -distance;
  if (direction === "left") initial.x = distance;
  if (direction === "right") initial.x = -distance;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for multiple children
interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const StaggerReveal: React.FC<StaggerProps> = ({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay } },
      }}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "none";
}> = ({ children, className, direction = "up" }) => (
  <motion.div
    className={className}
    variants={{
      hidden: {
        opacity: 0,
        y: direction === "up" ? 24 : 0,
        x: direction === "left" ? 24 : 0,
      },
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    }}
  >
    {children}
  </motion.div>
);
