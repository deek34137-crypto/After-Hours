"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductGrid } from "@/components/products/ProductGrid";

interface FeaturedDropProps {
  products: Product[];
}

export const FeaturedDrop: React.FC<FeaturedDropProps> = ({ products }) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 mb-8 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            <span>CURRENT ROTATION</span>
          </div>
          <h2 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            SIGNATURE PIECES
          </h2>
        </div>

        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
        >
          <span>VIEW ALL ({products.length})</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid */}
      <ProductGrid products={featuredProducts} columns={4} />
    </section>
  );
};
