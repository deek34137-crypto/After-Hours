import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "compact" | "badge";
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, variant = "full", light = false }) => {
  if (variant === "compact") {
    return (
      <Link
        href="/"
        className={cn(
          "font-black tracking-tighter text-xl transition-opacity hover:opacity-80 inline-block font-sans select-none",
          light ? "text-black" : "text-white",
          className
        )}
      >
        <span>AH</span>
      </Link>
    );
  }

  if (variant === "badge") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest border border-white/20 select-none",
          light ? "bg-black/5 text-black border-black/20" : "bg-white/5 text-white/90 border-white/20",
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>AFTER HOURS</span>
      </div>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "font-black uppercase tracking-[-0.04em] text-lg sm:text-xl md:text-2xl transition-opacity hover:opacity-80 inline-block font-sans select-none",
        light ? "text-black" : "text-white",
        className
      )}
    >
      AFTER HOURS
    </Link>
  );
};
