"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const xDot = useSpring(cursorX, { damping: 40, stiffness: 600, mass: 0.2 });
  const yDot = useSpring(cursorY, { damping: 40, stiffness: 600, mass: 0.2 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [data-cursor-hover]");
      setHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [visible]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border border-white/60 mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.75 : 1,
          borderColor: hovering ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.2s ease, scale 0.15s ease",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-white mix-blend-difference"
        style={{
          x: xDot,
          y: yDot,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 6 : 4,
          height: hovering ? 6 : 4,
          opacity: visible ? 1 : 0,
          transition: "width 0.25s ease, height 0.25s ease",
        }}
      />
    </>
  );
};
