import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "MEN'S T-SHIRTS & OVERSIZED",
    count: "06 PIECES",
    href: "/shop?category=tees",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=85&w=1000&auto=format&fit=crop",
    desc: "240 GSM Heavyweight French Terry",
  },
  {
    name: "MEN'S RESORT & CORDUROY SHIRTS",
    count: "05 PIECES",
    href: "/shop?category=outerwear",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1000&auto=format&fit=crop",
    desc: "Viscose Rayon, Corduroy & Waffle",
  },
  {
    name: "MEN'S HEAVY HOODIES",
    count: "03 PIECES",
    href: "/shop?category=hoodies",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=85&w=1000&auto=format&fit=crop",
    desc: "380 GSM Brushed Cotton Fleece",
  },
  {
    name: "MEN'S JACKETS & OUTERWEAR",
    count: "04 PIECES",
    href: "/shop?category=outerwear",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=85&w=1000&auto=format&fit=crop",
    desc: "Bombers, Varsity & Denim Truckers",
  },
];

export const CategoryNavigation: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-white/10">
        <div>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
            CATEGORIES
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            EXPLORE BY SILHOUETTE
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.name}
            href={cat.href}
            className="group relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/30 transition-all flex flex-col justify-end p-6 select-none"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-[0.7] group-hover:brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="relative z-10 space-y-1">
              <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                <span>{cat.count}</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
              <h3 className="font-sans font-black text-lg sm:text-xl uppercase text-white tracking-tight leading-snug">
                {cat.name}
              </h3>
              <p className="font-mono text-[11px] text-zinc-400">
                {cat.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
