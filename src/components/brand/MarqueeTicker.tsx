import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeTickerProps {
  items?: string[];
  speed?: "normal" | "fast" | "slow";
  className?: string;
  reverse?: boolean;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({
  items = [
    "NEW DROP: DROP 03 NOW LIVE",
    "FREE PAN-INDIA SHIPPING ON ORDERS ABOVE ₹1,999",
    "DESIGNED FOR THE HOURS THAT MATTER",
    "NO DRESS CODE",
    "260 GSM HEAVYWEIGHT ESSENTIALS",
    "MIDNIGHT ARCHIVE CAPSULE",
    "AFTER HOURS — MUMBAI / DELHI",
  ],
  speed = "normal",
  className,
  reverse = false,
}) => {
  return (
    <div className={cn("w-full overflow-hidden bg-black border-y border-white/10 py-2.5 select-none", className)}>
      <div
        className={cn(
          "flex whitespace-nowrap animate-marquee",
          reverse && "animation-reverse",
          speed === "fast" && "animate-marquee-fast"
        )}
      >
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-4">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-zinc-300">
              {text}
            </span>
            <span className="text-zinc-600 text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
