import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandClock } from "@/components/brand/BrandClock";
import { ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col">
      {/* Editorial Header */}
      <section className="relative w-full h-[65vh] sm:h-[75vh] flex items-end pb-12 px-4 sm:px-8 lg:px-12 bg-black overflow-hidden border-b border-white/10 select-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=85&w=2000&auto=format&fit=crop"
            alt="AFTER HOURS Genesis"
            fill
            priority
            className="object-cover object-center brightness-40 contrast-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <BrandClock />
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              EST. 2026 // INDIA
            </span>
          </div>

          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none">
            FOR THE HOURS <br />
            THAT MATTER.
          </h1>

          <p className="text-zinc-300 font-sans text-sm sm:text-base max-w-2xl leading-relaxed pt-1">
            AFTER HOURS is an independent contemporary fashion label built around the psychology of late-night urban existence.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 space-y-20">
        {/* Paragraph 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">
            01 // THE CONCEPT
          </div>
          <div className="md:col-span-8 space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
            <p>
              The name represents the time when normal rules disappear. The city after midnight. The people still awake. The conversations nobody hears. The clothes worn when the day is over and the real night begins.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              We operate between the convergence of streetwear, nightlife, contemporary fashion, and youth culture — not as party merchandise, but as an authentic psychological state of mind.
            </p>
          </div>
        </div>

        {/* Visual Break */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop"
              alt="Nocturnal Transit"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
              STUDIO 01 // TEXTILE LAB
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop"
              alt="Midnight Urban"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
              DELHI NCR // 03:00 AM
            </div>
          </div>
        </div>

        {/* Paragraph 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 font-mono text-xs text-zinc-500 uppercase tracking-widest">
            02 // THE CRAFT
          </div>
          <div className="md:col-span-8 space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
            <p>
              We reject fast fashion disposable quality. Every tee is knitted from 240–280 GSM super combed cotton with reinforced collars that resist baconing. Our hoodies use 420 GSM double-faced loopback fleece engineered for structure, warmth, and lifelong drape.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              Every drop is independently developed and produced in limited runs to ensure complete artistic control and construction integrity.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-white/10 font-mono text-xs">
          <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2">
            <span className="text-zinc-500">01</span>
            <h3 className="font-bold text-white uppercase text-sm">CONFIDENT</h3>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Never desperate for attention. Let silhouette and heavy weight speak for themselves.
            </p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2">
            <span className="text-zinc-500">02</span>
            <h3 className="font-bold text-white uppercase text-sm">MYSTERIOUS</h3>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Reveal less rather than more. High-density micro-prints and concealed utility pockets.
            </p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2">
            <span className="text-zinc-500">03</span>
            <h3 className="font-bold text-white uppercase text-sm">REBELLIOUS</h3>
            <p className="text-zinc-400 text-[11px] leading-relaxed">
              Never childish. Thoughtful tailoring inspired by skate culture and nocturnal workwear.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-2xl"
          >
            <span>EXPLORE THE CURRENT DROPS</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
