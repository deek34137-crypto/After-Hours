"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ShopTheLookHotspot } from "@/components/editorial/ShopTheLookHotspot";

export const LookbookStory: React.FC = () => {
  const featuredPiece = PRODUCTS.find((p) => p.slug.includes("cerebral-sin") || p.id === "gp-9503963709686") || PRODUCTS[4] || PRODUCTS[0];
  const secondaryPiece = PRODUCTS.find((p) => p.slug.includes("damn-blackout") || p.category === "bottoms") || PRODUCTS[1];

  return (
    <section className="w-full py-16 sm:py-24 bg-[#0a0a0d] border-y border-white/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Visual with Interactive Hotspots */}
          <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/10 group">
            <Image
              src="https://cdn.shopify.com/s/files/1/0812/2948/0182/files/cerebal_sin_front.webp?v=1787442570"
              alt="AFTER HOURS Red Studio Nocturnal Story"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Hotspot 1: Upper Torso / Tee */}
            {featuredPiece && (
              <ShopTheLookHotspot
                product={featuredPiece}
                top="40%"
                left="50%"
                label="LOOK PIECE 01 // OVERSIZED TEE"
                align="center"
              />
            )}

            {/* Hotspot 2: Lower Torso / Bottoms */}
            {secondaryPiece && (
              <ShopTheLookHotspot
                product={secondaryPiece}
                top="78%"
                left="52%"
                label="LOOK PIECE 02 // BOTTOMS"
                align="center"
              />
            )}

            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white font-mono text-[11px] tracking-widest uppercase pointer-events-none">
              <span>LOCATION // STUDIO NOCTURNAL</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                TAP PINS TO SHOP THE FIT
              </span>
            </div>
          </div>

          {/* Right Editorial Text */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                EDITORIAL CAPSULE // 03
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-none">
                AFTER MIDNIGHT
              </h2>
              <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed pt-2">
                &ldquo;The city after midnight is not empty — it simply belongs to different people. The ones who create without deadlines. The ones who walk empty avenues. The clothes worn when the day is done and the real night begins.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10 font-mono text-xs">
              <div>
                <span className="text-zinc-500 block mb-1">PROPORTIONS</span>
                <span className="text-white font-bold">BOXY & OVERSIZED</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">CONSTRUCTION</span>
                <span className="text-white font-bold">260–420 GSM</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">ORIGIN</span>
                <span className="text-white font-bold">MUMBAI / NCR</span>
              </div>
              <div>
                <span className="text-zinc-500 block mb-1">HARDWARE</span>
                <span className="text-white font-bold">MATTE GUNMETAL</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl"
              >
                <span>EXPLORE EDITORIAL PIECES</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
