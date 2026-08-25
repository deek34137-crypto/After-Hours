"use client";

import React from "react";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveAllToBag = () => {
    wishlist.forEach((product) => {
      addToCart(product, product.sizes[0] || "L");
    });
    showToast(`Added ${wishlist.length} saved pieces to bag`, "bag");
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mx-auto text-zinc-600">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          NOTHING SAVED YET
        </h1>
        <p className="text-zinc-400 font-sans text-sm max-w-sm mx-auto">
          Save your favorite midnight pieces, hoodies, and cargoes by clicking the heart icon on any product.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
        >
          EXPLORE THE ARCHIVE
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
            SAVED PIECES
          </h1>
          <span className="font-mono text-xs text-zinc-400 mt-1 block">
            {wishlistCount} {wishlistCount === 1 ? "PIECE" : "PIECES"} IN YOUR VAULT
          </span>
        </div>

        <button
          onClick={handleMoveAllToBag}
          className="px-6 py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 self-start"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>MOVE ALL TO BAG</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
