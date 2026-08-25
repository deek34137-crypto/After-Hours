import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "GRAPHIC & OVERSIZED TEES",
    count: "24 PIECES",
    href: "/shop?category=tees,oversized",
    image: "https://cdn.shopify.com/s/files/1/0812/2948/0182/files/losingmymind_back.webp?v=1787567556",
    desc: "240 GSM Heavyweight French Terry",
  },
  {
    name: "DENIM WASH & BOXY TEES",
    count: "16 PIECES",
    href: "/shop?category=tees",
    image: "https://cdn.shopify.com/s/files/1/0812/2948/0182/files/beyond_back.webp?v=1787513818",
    desc: "Mineral Washed Boxy Streetwear",
  },
  {
    name: "WAFFLE KNITS & HENLEYS",
    count: "09 PIECES",
    href: "/shop?category=outerwear",
    image: "https://cdn.shopify.com/s/files/1/0812/2948/0182/files/rottonbloom_back1.webp?v=1787410945",
    desc: "Textured Heavyweight Full-Sleeves",
  },
  {
    name: "OXFORD SHIRTS & RAGLANS",
    count: "08 PIECES",
    href: "/shop?category=outerwear",
    image: "https://cdn.shopify.com/s/files/1/0812/2948/0182/files/red_front_2b15138e-e75c-4f33-99ae-a692fb9c8572.webp?v=1787399052",
    desc: "Boxy Oxford & Contrast Raglans",
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
