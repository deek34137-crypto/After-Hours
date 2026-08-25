"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BrandClockProps {
  className?: string;
  showStatus?: boolean;
}

export const BrandClock: React.FC<BrandClockProps> = ({ className, showStatus = true }) => {
  const [time, setTime] = useState<string>("");
  const [isNight, setIsNight] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Indian Standard Time
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-IN", options).format(now);
      setTime(formatted);

      // Check if night hours (8 PM - 5 AM)
      const hours = parseInt(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          hour12: false,
        }).format(now),
        10
      );
      setIsNight(hours >= 20 || hours < 6);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return <span className="font-mono text-[11px] opacity-40">--:--:-- IST</span>;
  }

  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-[11px] tracking-wider select-none", className)}>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
      <span className="text-zinc-300 font-medium">{time} IST</span>
      {showStatus && (
        <span className="hidden sm:inline-block text-zinc-500 text-[10px] uppercase border-l border-zinc-700 pl-2">
          {isNight ? "MIDNIGHT STATE" : "DAY SHIFT"}
        </span>
      )}
    </div>
  );
};
