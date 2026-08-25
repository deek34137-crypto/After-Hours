"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Flame, Compass, Cpu, Layers, Disc3 } from "lucide-react";
import { BrandClock } from "@/components/brand/BrandClock";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/ScrollReveal";

const SPECS = [
  {
    label: "FABRIC WEIGHT",
    value: "240 – 420 GSM",
    desc: "Heavyweight French Terry & Brushed Cotton Loopback",
    icon: Layers,
  },
  {
    label: "CONSTRUCTION",
    value: "DOUBLE-STITCHED",
    desc: "Reinforced 1x1 rib neckline that resists baconing & stretching",
    icon: ShieldCheck,
  },
  {
    label: "TREATMENT",
    value: "MINERAL & SUNFADE",
    desc: "Custom acid washes with silicone softening for vintage hand-feel",
    icon: Flame,
  },
  {
    label: "PRODUCTION",
    value: "LIMITED CAPSULES",
    desc: "Zero mass-overproduction. Serialized numbered drop releases",
    icon: Disc3,
  },
];

const PILLARS = [
  {
    num: "01",
    title: "NOCTURNAL COGNITION",
    tagline: "The rule of the unobserved hours.",
    text: "The name represents the time when normal rules disappear. The city after midnight is not empty — it simply belongs to different people. The ones who create without deadlines. The ones who walk empty avenues. The clothes worn when the day is done and the real night begins.",
  },
  {
    num: "02",
    title: "MATERIAL SUPREMACY",
    tagline: "Heavyweight tactile armor.",
    text: "We reject the disposable nature of fast fashion. Every tee is knitted from 240–280 GSM super combed cotton with structural drape. Our full-sleeves and waffle knits use custom textured yarns engineered to hold their silhouette through years of nocturnal wear.",
  },
  {
    num: "03",
    title: "ANARCHIC MINIMALISM",
    tagline: "Raw silhouette. Zero gimmicks.",
    text: "Never desperate for attention. We let drop-shoulder geometry, boxy cuts, and high-density cracked plastisol prints carry the statement. Confident, underground, and unapologetically bold.",
  },
  {
    num: "04",
    title: "SUBCULTURAL CONTINUUM",
    tagline: "Bridging the underground across India.",
    text: "From Mumbai overpasses at 02:40 AM to Hauz Khas alleyways and Bengaluru basement studios — AFTER HOURS is the uniform of late-night creators, music heads, and nocturnal wanderers across the subcontinent.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col selection:bg-white selection:text-black">
      {/* 1. Hero Manifesto Banner */}
      <section className="relative w-full min-h-[80vh] flex items-end pb-16 px-4 sm:px-8 lg:px-12 bg-black overflow-hidden border-b border-white/10 select-none">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.shopify.com/s/files/1/0812/2948/0182/files/thorn_back_00cd96c8-24f7-41ae-895d-42eb018f4c4c.webp?v=1787495872"
            alt="AFTER HOURS Nocturnal Manifesto"
            fill
            priority
            className="object-cover object-top brightness-[0.45] contrast-[1.2]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <BrandClock />
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              •
            </span>
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              MANIFESTO // EST. 2026 // INDIA
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-sans font-black text-4xl sm:text-7xl md:text-8xl uppercase tracking-[-0.03em] text-white leading-[0.95]">
              THE ARCHIVE <br />
              <span className="text-zinc-500">OF 02:00 AM.</span>
            </h1>
          </div>

          <p className="text-zinc-300 font-sans text-sm sm:text-lg max-w-2xl leading-relaxed pt-2">
            AFTER HOURS is an independent contemporary streetwear label engineered around the psychology of late-night urban existence. We make clothes for the hours that matter.
          </p>
        </div>
      </section>

      {/* 2. Visual Split Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-24">
        {/* Story Spread 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/10 group">
            <Image
              src="https://cdn.shopify.com/s/files/1/0812/2948/0182/files/losingmymind_back.webp?v=1787567556"
              alt="AFTER HOURS Streetwear Construction"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-zinc-300 uppercase tracking-widest">
              <span>FIG 01. GRAPHIC DENSITY</span>
              <span>240 GSM FRENCH TERRY</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="font-mono text-xs text-red-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              01 // THE PSYCHOLOGY
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              WHEN NORMAL RULES <br />
              CEASE TO EXIST.
            </h2>
            <div className="space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                Daytime fashion is governed by utility, offices, and social expectations. Nighttime fashion is governed by emotion, freedom, and self-expression.
              </p>
              <p className="text-zinc-400">
                AFTER HOURS was born in late-night studio sessions when the phones stop ringing and the real work begins. We craft pieces that transition effortlessly from subterranean basements to midnight street corners.
              </p>
            </div>
            <div className="pt-2">
              <div className="font-mono text-xs text-zinc-500 border-l border-white/20 pl-4 italic">
                &ldquo;The clothes you wear when you don&apos;t have to answer to anyone.&rdquo;
              </div>
            </div>
          </div>
        </div>

        {/* Story Spread 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              02 // THE CRAFT & ANATOMY
            </div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white leading-tight">
              PROPORTIONS <br />
              BUILT LIKE ARMOR.
            </h2>
            <div className="space-y-4 text-zinc-300 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                A great streetwear piece begins with the weight of the fabric. Every t-shirt in our archive is knitted from 240–280 GSM combed cotton that creates a structured, boxy drape that hangs off the shoulders without clinging.
              </p>
              <p className="text-zinc-400">
                Our collars feature high-density ribbed binding with reinforced double-needle topstitching to permanently eliminate neckline sag.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div>
                <span className="text-zinc-500 block text-[10px]">SILHOUETTE</span>
                <span className="text-white font-bold">BOXY & DROP SHOULDER</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">HAND-FEEL</span>
                <span className="text-white font-bold">SILICONE SOFTENED</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/10 group">
            <Image
              src="https://cdn.shopify.com/s/files/1/0812/2948/0182/files/beyond_back.webp?v=1787513818"
              alt="AFTER HOURS Denim Wash Boxy Fit"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-zinc-300 uppercase tracking-widest">
              <span>FIG 02. MINERAL WASH</span>
              <span>BOX-CUT GEOMETRY</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Technical Specifications Grid */}
      <section className="w-full bg-[#0d0d0f] py-20 sm:py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                DISCIPLINE
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
                TECHNICAL BENCHMARKS
              </h2>
            </div>
            <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
              ENGINEERED FOR PAN-INDIA NOCTURNAL WEAR
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECS.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="p-6 bg-black/60 border border-white/10 hover:border-white/30 transition-all space-y-4 select-none"
                >
                  <div className="w-10 h-10 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                      {spec.label}
                    </span>
                    <h3 className="font-sans font-black text-lg sm:text-xl uppercase text-white tracking-tight">
                      {spec.value}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Brand Tenets / Manifesto Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            THE PHILOSOPHY
          </span>
          <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            FOUR CORE TENETS
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400">
            The foundation of every silhouette, drop, and graphic developed by AFTER HOURS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="p-8 bg-zinc-950/60 border border-white/10 hover:border-white/25 transition-all space-y-4 select-none"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-500 tracking-widest">{pillar.num} // ARCHIVE</span>
                <span className="text-zinc-400 uppercase">{pillar.tagline}</span>
              </div>
              <h3 className="font-sans font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                {pillar.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Big Quote Manifesto Bar */}
      <section className="w-full bg-black py-20 px-4 border-t border-white/10 select-none">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-[0.3em]">
            MANIFESTO 02:17 AM
          </div>
          <blockquote className="font-sans font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight">
            &ldquo;THE CITY AFTER MIDNIGHT DOES NOT BELONG TO ROUTINE. IT BELONGS TO THE ONES WHO CREATE WITHOUT DEADLINES.&rdquo;
          </blockquote>
          <div className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
            — AFTER HOURS DESIGN STUDIO
          </div>
        </div>
      </section>

      {/* 6. Action CTA Section */}
      <section className="w-full py-16 px-4 bg-zinc-950 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
            EXPLORE THE COMPLETE ARCHIVE
          </h2>
          <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
            Discover all 57 signature pieces from the red studio sessions, crafted with heavyweight cotton and boxy streetwear proportions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono text-xs uppercase tracking-widest">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>BROWSE ALL PIECES</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/collections"
              className="w-full sm:w-auto px-8 py-4 bg-black/60 border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>VIEW DROPS & ARCHIVES</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
