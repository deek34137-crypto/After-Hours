"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";

export default function NewArrivalsPage() {
  const newProducts = PRODUCTS.filter((p) => p.newArrival);
  const restProducts = PRODUCTS.filter((p) => !p.newArrival);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">
      {/* Header */}
      <div className="border-b border-white/10 pb-8 space-y-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" /> BACK TO ARCHIVE
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-xs text-red-400 uppercase tracking-widest">JUST DROPPED</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          NEW ARRIVALS
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm max-w-xl">
          The latest pieces from the red studio sessions. Freshly added to the archive. Limited quantities.
        </p>
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          {newProducts.length} NEW PIECES
        </div>
      </div>

      {/* New Arrivals Grid */}
      {newProducts.length > 0 ? (
        <section className="space-y-6">
          <ProductGrid products={newProducts} columns={4} />
        </section>
      ) : (
        <div className="text-center py-16 space-y-2">
          <Zap className="w-6 h-6 text-zinc-600 mx-auto" />
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
            NEXT DROP INCOMING — SIGN UP FOR EARLY ACCESS
          </p>
          <Link href="/shop" className="font-mono text-xs text-white underline underline-offset-4">
            BROWSE FULL ARCHIVE
          </Link>
        </div>
      )}

      {/* Divider to archive */}
      {restProducts.length > 0 && newProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">ARCHIVE</span>
            <div className="flex-1 h-[1px] bg-white/10" />
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              {restProducts.length} MORE PIECES
            </span>
          </div>
          <ProductGrid products={restProducts.slice(0, 8)} columns={4} />
          <div className="text-center pt-4">
            <Link
              href="/shop"
              className="font-mono text-xs text-zinc-400 uppercase tracking-widest underline underline-offset-4 hover:text-white transition-colors"
            >
              VIEW FULL ARCHIVE ({PRODUCTS.length} PIECES)
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
