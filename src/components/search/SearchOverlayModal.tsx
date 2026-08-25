"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const TRENDING_SEARCHES = [
  "Core Tee",
  "Midnight Hoodie",
  "Tactical Cargo",
  "Heavyweight 420 GSM",
  "Drop 03",
  "Oversized",
];

export const SearchOverlayModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useSearch();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
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

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Container */}
      <div className="relative min-h-screen flex flex-col items-center justify-start pt-16 sm:pt-24 px-4 sm:px-6 z-50">
        <div className="w-full max-w-3xl bg-[#0c0c0e] border border-white/15 p-6 sm:p-8 shadow-2xl">
          {/* Header & Input */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH TEES, HOODIES, CARGOES, 420 GSM..."
                className="w-full bg-transparent text-white font-sans text-sm sm:text-base tracking-wider placeholder:text-zinc-600 focus:outline-none uppercase"
              />
            </div>
            <button
              onClick={closeSearch}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Trending Searches */}
          {!query && (
            <div className="py-8 space-y-4">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                TRENDING SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {TRENDING_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                  >
                    <span>{term}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {query && (
            <div className="py-6">
              <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/5 font-mono text-xs text-zinc-400">
                <span>RESULTS FOR "{query.toUpperCase()}"</span>
                <span>{results.length} PIECES FOUND</span>
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="font-sans font-bold text-base text-zinc-300 uppercase">
                    NO MATCHING PIECES
                  </p>
                  <p className="font-sans text-xs text-zinc-500">
                    Try searching for general keywords like "tee", "hoodie", or "oversized".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                  {results.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={closeSearch}
                      className="group flex gap-4 p-3 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="relative w-16 h-20 bg-zinc-900 flex-shrink-0 overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h4 className="font-sans font-bold text-xs uppercase tracking-tight text-white group-hover:text-zinc-200 line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="font-mono text-[10px] text-zinc-500 uppercase block mt-0.5">
                            {product.category} • {product.gsm || "HEAVY COTTON"}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-zinc-300">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
