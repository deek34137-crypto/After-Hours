import React from "react";
import { BrandClock } from "@/components/brand/BrandClock";

export const BrandStatement: React.FC = () => {
  return (
    <section className="w-full py-24 sm:py-32 bg-[#080808] border-t border-white/10 px-4 sm:px-6 lg:px-8 text-center select-none">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-center">
          <BrandClock />
        </div>

        <p className="font-mono text-xs sm:text-sm text-zinc-500 uppercase tracking-[0.3em]">
          MANIFESTO // NO DRESS CODE
        </p>

        <h2 className="font-sans font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-[-0.03em] text-white leading-tight">
          "THE CLOTHES WORN WHEN THE DAY IS OVER AND THE REAL NIGHT BEGINS."
        </h2>

        <p className="text-zinc-400 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          AFTER HOURS is not a party merchandise brand. It is a psychological sanctuary for independent minds, night wanderers, and creators who thrive when standard rules disappear.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-8 font-mono text-xs text-zinc-500 uppercase tracking-widest">
          <span>• 100% COMBED COTTON</span>
          <span>• PRE-SHRUNK CUTS</span>
          <span>• INDEPENDENTLY PRODUCED</span>
          <span>• PAN-INDIA DISPATCH</span>
        </div>
      </div>
    </section>
  );
};
