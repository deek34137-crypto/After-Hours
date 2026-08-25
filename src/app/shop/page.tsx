"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, Grid3X3, Grid2X2, RotateCcw, X } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Product } from "@/lib/types";

const CATEGORIES = [
  { id: "all", label: "ALL PIECES" },
  { id: "tees", label: "T-SHIRTS & OVERSIZED" },
  { id: "outerwear", label: "SHIRTS & FULL SLEEVES" },
  { id: "bottoms", label: "BOTTOMS & JOGGERS" },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

const SORTS = [
  { id: "featured", label: "FEATURED" },
  { id: "newest", label: "NEWEST FIRST" },
  { id: "price-low", label: "PRICE: LOW → HIGH" },
  { id: "price-high", label: "PRICE: HIGH → LOW" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>(
    searchParams.get("sort") || "featured"
  );
  const [columns, setColumns] = useState<2 | 4>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL params on mount and when params change
  useEffect(() => {
    const cat = searchParams.get("category") || "all";
    const sort = searchParams.get("sort") || "featured";
    setSelectedCategory(cat);
    setSelectedSort(sort);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory && selectedCategory !== "all") {
      const cats = selectedCategory.split(",");
      list = list.filter((p) => cats.includes(p.category));
    }

    if (selectedSize) {
      list = list.filter((p) => p.sizes.includes(selectedSize as any));
    }

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
    router.push("/shop");
  };

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    if (id === "all") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${id}`);
    }
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

      {/* Filters Row */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 font-mono text-[10px] sm:text-xs tracking-widest uppercase border transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-400 border-white/20 hover:border-white/50 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bottom Row: Size + Sort + Grid toggle */}
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            {/* Size Filter */}
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">SIZE:</span>
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(selectedSize === s ? "" : s)}
                className={`w-8 h-8 font-mono text-[10px] border transition-all ${
                  selectedSize === s
                    ? "bg-white text-black border-white"
                    : "text-zinc-400 border-white/20 hover:border-white/50 hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent border border-white/20 text-zinc-400 font-mono text-[10px] uppercase tracking-widest px-3 py-2 focus:outline-none focus:border-white/50 hover:border-white/50 transition-colors cursor-pointer"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-black text-white">
                  {s.label}
                </option>
              ))}
            </select>

            {/* Grid Toggle */}
            <div className="hidden sm:flex items-center gap-1 border border-white/20 p-1">
              <button
                onClick={() => setColumns(2)}
                className={`p-1.5 transition-colors ${columns === 2 ? "text-white" : "text-zinc-500 hover:text-white"}`}
              >
                <Grid2X2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1.5 transition-colors ${columns === 4 ? "text-white" : "text-zinc-500 hover:text-white"}`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">ACTIVE FILTERS:</span>
          {selectedCategory !== "all" && (
            <button
              onClick={() => handleCategoryChange("all")}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 font-mono text-[10px] text-white uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              {CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory}
              <X className="w-3 h-3" />
            </button>
          )}
          {selectedSize && (
            <button
              onClick={() => setSelectedSize("")}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 font-mono text-[10px] text-white uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              SIZE {selectedSize}
              <X className="w-3 h-3" />
            </button>
          )}
          {selectedSort !== "featured" && (
            <button
              onClick={() => setSelectedSort("featured")}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 font-mono text-[10px] text-white uppercase tracking-widest hover:bg-white/20 transition-colors"
            >
              {SORTS.find((s) => s.id === selectedSort)?.label}
              <X className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 font-mono text-[10px] text-zinc-400 uppercase tracking-widest hover:text-white transition-colors ml-1"
          >
            <RotateCcw className="w-3 h-3" />
            RESET ALL
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} columns={columns} />
      ) : (
        <div className="text-center py-24 space-y-3">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">NO PIECES FOUND</p>
          <button onClick={resetFilters} className="font-mono text-xs text-white underline underline-offset-4">
            CLEAR FILTERS
          </button>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest animate-pulse">LOADING ARCHIVE...</div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
