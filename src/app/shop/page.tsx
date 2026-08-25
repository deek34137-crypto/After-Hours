"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw, X } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Product } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "ALL PIECES" },
  { id: "tees", label: "T-SHIRTS & OVERSIZED" },
  { id: "outerwear", label: "SHIRTS & JACKETS" },
  { id: "hoodies", label: "HOODIES & FLEECE" },
  { id: "bottoms", label: "BOTTOMS" },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSort = searchParams.get("sort") || "featured";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [columns, setColumns] = useState<2 | 4>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      const cats = selectedCategory.split(",");
      list = list.filter((p) => cats.includes(p.category));
    }

    // Size filter
    if (selectedSize) {
      list = list.filter((p) => p.sizes.includes(selectedSize as any));
    }

    // Sort
    if (selectedSort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "newest") {
      list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    }

    return list;
  }, [selectedCategory, selectedSize, selectedSort]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSize("");
    setSelectedSort("featured");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedSize !== "" || selectedSort !== "featured";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-8 mb-8 space-y-3">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 uppercase tracking-widest">
          <span>CATALOG</span>
          <span>•</span>
          <span>{filteredProducts.length} PIECES AVAILABLE</span>
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          THE ARCHIVE
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm max-w-xl">
          Engineered for nocturnal hours. Every garment is constructed with heavyweight fabrics, reinforced seams, and boxy streetwear proportions.
        </p>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/5">
        {/* Category Pills (Desktop) */}
        <div className="hidden md:flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border ${
                selectedCategory === cat.id
                  ? "bg-white text-black border-white font-bold"
                  : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="md:hidden flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/15 text-xs font-mono tracking-widest text-zinc-300"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>FILTER & SORT</span>
          {hasActiveFilters && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
        </button>

        {/* Right Controls: Sort & Grid View Toggle */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Size Filter Dropdown */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-500">SIZE:</span>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="bg-black border border-white/15 text-white px-2 py-1 focus:outline-none uppercase"
            >
              <option value="">ALL SIZES</option>
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-zinc-500 hidden sm:inline">SORT:</span>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-black border border-white/15 text-white px-2.5 py-1.5 focus:outline-none uppercase text-xs"
            >
              <option value="featured">FEATURED</option>
              <option value="newest">NEWEST DROPS</option>
              <option value="price-low">PRICE: LOW → HIGH</option>
              <option value="price-high">PRICE: HIGH → LOW</option>
            </select>
          </div>

          {/* Grid Toggle (Desktop) */}
          <div className="hidden lg:flex items-center border border-white/15">
            <button
              onClick={() => setColumns(2)}
              aria-label="2 Columns View"
              className={`p-1.5 ${columns === 2 ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setColumns(4)}
              aria-label="4 Columns View"
              className={`p-1.5 ${columns === 4 ? "bg-white text-black" : "text-zinc-500 hover:text-white"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mb-6 flex-wrap font-mono text-[11px]">
          <span className="text-zinc-500 uppercase">ACTIVE FILTERS:</span>
          {selectedCategory !== "all" && (
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-2.5 py-1 text-white uppercase">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSize && (
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-2.5 py-1 text-white uppercase">
              SIZE {selectedSize}
              <button onClick={() => setSelectedSize("")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-zinc-400 hover:text-white underline ml-2 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET ALL</span>
          </button>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} columns={columns} />

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0c0c0e] border-l border-white/15 p-6 flex flex-col justify-between z-50">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-sans font-black text-base uppercase tracking-tight">
                  FILTER PIECES
                </h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                  CATEGORY
                </span>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 font-mono text-xs uppercase border ${
                        selectedCategory === cat.id
                          ? "bg-white text-black border-white font-bold"
                          : "bg-white/5 text-zinc-400 border-white/10"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                  SIZE
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(selectedSize === s ? "" : s)}
                      className={`py-2 font-mono text-xs uppercase text-center border ${
                        selectedSize === s
                          ? "bg-white text-black border-white font-bold"
                          : "bg-white/5 text-zinc-400 border-white/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest"
              >
                APPLY FILTERS ({filteredProducts.length})
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2.5 border border-white/20 text-zinc-400 font-mono text-xs uppercase tracking-widest"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center font-mono text-xs">LOADING ARCHIVE...</div>}>
      <ShopContent />
    </Suspense>
  );
}
