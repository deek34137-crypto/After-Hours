import React from "react";
import { BrandClock } from "@/components/brand/BrandClock";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-[#0d0d0f] border-b border-white/10 text-white px-4 py-1.5 flex items-center justify-between text-xs z-50">
      <div className="hidden md:flex items-center gap-3">
        <BrandClock />
      </div>

      <div className="flex-1 text-center font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-zinc-300">
        <span>COMPLIMENTARY SHIPPING ACROSS INDIA ON ORDERS OVER ₹1,999</span>
      </div>

      <div className="hidden md:flex items-center gap-4 font-mono text-[10px] tracking-widest text-zinc-400">
        <span>CURATED FOR 00:00–06:00</span>
      </div>
    </div>
  );
};
