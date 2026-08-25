"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const isSaved = isInWishlist(product.id);
  const primaryImg = product.images[0] || "/placeholder.jpg";
  const hoverImg = product.images[1] || primaryImg;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isSaved ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
      "wishlist"
    );
  };

  const handleQuickAdd = (e: React.MouseEvent, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
    setShowQuickSizes(false);
    showToast(`Added ${product.name} (${size}) to bag`, "bag");
  };

  return (
    <div
      className="group relative flex flex-col justify-between select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Image Frame */}
      <div className="relative aspect-[3/4] w-full bg-[#121215] overflow-hidden border border-white/10 group-hover:border-white/25 transition-colors">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary image */}
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              isHovered && hoverImg !== primaryImg ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
          />

          {/* Hover Image */}
          {hoverImg !== primaryImg && (
            <Image
              src={hoverImg}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1">
            {product.newArrival && (
              <span className="font-mono text-[9px] bg-white text-black px-1.5 py-0.5 tracking-widest uppercase font-bold">
                NEW
              </span>
            )}
            {product.dropNumber && (
              <span className="font-mono text-[9px] bg-black/80 backdrop-blur-sm text-zinc-300 border border-white/15 px-1.5 py-0.5 tracking-wider uppercase">
                {product.dropNumber}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2 bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-white hover:text-black transition-colors pointer-events-auto"
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                isSaved ? "fill-red-500 text-red-500" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Quick Add Overlay / Drawer on Bottom of Card */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          {showQuickSizes ? (
            <div className="bg-black/95 backdrop-blur-md p-3 border-t border-white/20 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between pb-2 font-mono text-[10px] text-zinc-400 uppercase">
                <span>SELECT SIZE</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowQuickSizes(false);
                  }}
                  className="hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={(e) => handleQuickAdd(e, s)}
                    className="py-1.5 bg-white/10 hover:bg-white hover:text-black border border-white/15 text-xs font-mono font-bold transition-colors text-center uppercase"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`hidden md:block transition-all duration-300 p-2.5 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickSizes(true);
                }}
                className="w-full py-2 bg-white/90 hover:bg-white text-black font-mono text-[10px] uppercase font-bold tracking-widest backdrop-blur-md shadow-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-3 pb-1 flex flex-col space-y-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="font-sans font-bold text-xs sm:text-sm tracking-tight uppercase hover:text-zinc-300 transition-colors line-clamp-1"
          >
            {product.name}
          </Link>
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-white whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase">
          <span>{product.colors.join(" / ")}</span>
          {product.gsm && <span>{product.gsm.replace(" Heavyweight", "")}</span>}
        </div>
      </div>
    </div>
  );
};
