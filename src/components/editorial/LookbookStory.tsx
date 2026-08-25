import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const LookbookStory: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#0a0a0d] border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Visual */}
          <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] bg-zinc-900 overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=85&w=1600&auto=format&fit=crop"
              alt="AFTER HOURS Men's Nocturnal Streetwear Story"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white font-mono text-[11px] tracking-widest uppercase">
              <span>LOCATION // CONCRETE UNDERPASS</span>
              <span>TIME // 02:45 AM</span>
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
                "The city after midnight is not empty — it simply belongs to different people. The ones who create without deadlines. The ones who walk empty avenues. The clothes worn when the day is done and the real night begins."
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

            <div className="pt-2">
              <Link
                href="/collections/night-shift"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-black font-mono text-xs uppercase font-bold tracking-widest hover:bg-zinc-200 transition-colors"
              >
                <span>EXPLORE THE STORY</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
