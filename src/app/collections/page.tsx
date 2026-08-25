"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/data/collections";
import { PRODUCTS } from "@/data/products";
import { BrandClock } from "@/components/brand/BrandClock";

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header */}
      <div className="border-b border-white/10 pb-8 space-y-3">
        <div className="flex items-center gap-2">
          <BrandClock />
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          DROPS & ARCHIVES
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm max-w-xl">
          Curated seasonal capsules and permanent silhouettes engineered for late-night urban existence.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {COLLECTIONS.map((col) => {
          const colProducts = PRODUCTS.filter((p) => p.collection === col.slug);
          return (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative aspect-[4/5] sm:aspect-[16/11] bg-zinc-900 overflow-hidden border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between p-6 sm:p-8 select-none"
            >
              {/* Background Image */}
              <Image
                src={col.heroImage}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-60 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between font-mono text-[10px] sm:text-xs text-zinc-300 uppercase tracking-widest">
                <span className="px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/20">
                  {col.subtitle}
                </span>
                <span>{col.dropDate}</span>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-zinc-200">
                    {col.title}
                  </h2>
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="font-sans text-xs text-zinc-300 line-clamp-2">
                  {col.description}
                </p>
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest pt-1">
                  <span>{colProducts.length} PIECES IN DROP</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
