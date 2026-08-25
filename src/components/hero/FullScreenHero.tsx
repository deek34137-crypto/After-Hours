"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { BrandClock } from "@/components/brand/BrandClock";

export const FullScreenHero: React.FC = () => {
  return (
    <section className="relative w-full h-[88vh] sm:h-[92vh] lg:h-[96vh] flex items-end pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 bg-black overflow-hidden select-none">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://cdn.shopify.com/s/files/1/0812/2948/0182/files/thorn_back_00cd96c8-24f7-41ae-895d-42eb018f4c4c.webp?v=1787495872"
          alt="AFTER HOURS Red Studio Nocturnal Campaign"
          fill
          priority
          className="object-cover object-top brightness-[0.7] contrast-[1.1] scale-100"
          sizes="100vw"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </div>

      {/* Top Floating Badge */}
      <div className="absolute top-6 left-4 sm:left-8 lg:left-12 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>DROP 03 // NOCTURNAL EXPEDITION</span>
        </div>
      </div>

      {/* Content Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        {/* Main Headline */}
        <div className="space-y-4 max-w-3xl">
          <p className="font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.25em] uppercase">
            MUMBAI • 02:17 AM • THE NIGHT IS YOURS
          </p>
          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-[-0.04em] text-white leading-[0.95]">
            FOR THE HOURS <br />
            <span className="text-zinc-400">THAT MATTER.</span>
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base font-sans max-w-lg leading-relaxed pt-1">
            Raw silhouettes, 420 GSM fleece, and modular utility built for the hours when routine dissolves.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs uppercase tracking-widest">
          <Link
            href="/shop"
            className="px-8 py-4 bg-white text-black font-bold hover:bg-zinc-200 transition-colors text-center flex items-center justify-center gap-2 shadow-2xl"
          >
            <span>SHOP DROP 03</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/collections/new-after-dark"
            className="px-6 py-4 bg-black/60 backdrop-blur-md border border-white/25 text-white hover:bg-white/10 transition-colors text-center"
          >
            VIEW LOOKBOOK
          </Link>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="absolute bottom-4 right-8 hidden lg:flex items-center gap-2 text-zinc-500 font-mono text-[10px] tracking-widest uppercase">
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </div>
    </section>
  );
};
