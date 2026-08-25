"use client";

import React from "react";
import { BrandClock } from "@/components/brand/BrandClock";
import { CurrencySelector } from "@/components/navigation/CurrencySelector";
import { useCurrency } from "@/context/CurrencyContext";

export const AnnouncementBar: React.FC = () => {
  const { currencyDetails } = useCurrency();

  return (
    <div className="w-full bg-[#0d0d0f] border-b border-white/10 text-white px-4 sm:px-6 py-1.5 flex items-center justify-between text-xs z-50 select-none">
      <div className="hidden md:flex items-center gap-3">
        <BrandClock />
      </div>

      <div className="flex-1 text-center font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-zinc-300 px-2 line-clamp-1">
        <span>{currencyDetails.shippingLabel}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
          <span>GLOBAL COURIER // DHL & BLUE DART</span>
        </div>
        <CurrencySelector variant="pill" />
      </div>
    </div>
  );
};
