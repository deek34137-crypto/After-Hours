"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Product } from "@/lib/types";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS);
      return;
    }

    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.gsm && p.gsm.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Search Input Section */}
      <div className="border-b border-white/10 pb-8 mb-8 space-y-6">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
          CATALOG SEARCH
        </span>
        <div className="relative max-w-2xl">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH GRAPHICS, HOODIES, HEAVYWEIGHT COTTON..."
            className="w-full bg-white/5 border border-white/15 pl-12 pr-4 py-4 text-white font-sans text-sm sm:text-base uppercase tracking-wider focus:outline-none focus:border-white"
          />
        </div>
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
          <span>SHOWING {results.length} RESULTS {query ? `FOR "${query.toUpperCase()}"` : ""}</span>
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-zinc-500 hover:text-white underline"
            >
              CLEAR
            </button>
          )}
        </div>
      </div>

      <ProductGrid products={results} columns={4} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center font-mono text-xs">LOADING SEARCH...</div>}>
      <SearchContent />
    </Suspense>
  );
}
