"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [addingSize, setAddingSize] = useState<string | null>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const isSaved = isInWishlist(product.id);
  const primaryImg = product.images[0] || "/placeholder.jpg";
  const hoverImg = product.images[1] || primaryImg;
  const hasHoverImg = hoverImg !== primaryImg;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isSaved ? `Removed from wishlist` : `Saved to wishlist`,
      "wishlist"
    );
  };

  const handleQuickAdd = async (e: React.MouseEvent, size: 'S' | 'M' | 'L' | 'XL' | 'XXL') => {
    e.preventDefault();
    e.stopPropagation();
    setAddingSize(size);
    await new Promise((r) => setTimeout(r, 500));
    addToCart(product, size);
    setAddingSize(null);
    setShowQuickSizes(false);
    showToast(`${product.name} (${size}) added to bag`, "bag");
  };

  return (
    <motion.div
      className="group relative flex flex-col justify-between select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Image Frame */}
      <div className="relative aspect-[3/4] w-full bg-[#0e0e10] overflow-hidden border border-white/10 group-hover:border-white/25 transition-colors duration-300">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary image */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered && hasHoverImg ? 1 : 1 }}
          >
            <Image
              src={primaryImg}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-top transition-all duration-700 ease-out ${
                isHovered && hasHoverImg ? "opacity-0 scale-[1.04]" : "opacity-100 scale-100"
              }`}
            />
          </motion.div>

          {/* Hover Image with zoom */}
          {hasHoverImg && (
            <Image
              src={hoverImg}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-top transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? "opacity-100 scale-[1.04]" : "opacity-0 scale-100"
              }`}
            />
          )}

          {/* Hover gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <div className="flex flex-col gap-1">
            {product.newArrival && (
              <motion.span
                className="font-mono text-[9px] bg-white text-black px-1.5 py-0.5 tracking-widest uppercase font-bold"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.06 + 0.2, type: "spring", stiffness: 500 }}
              >
                NEW
              </motion.span>
            )}
            {product.dropNumber && (
              <span className="font-mono text-[9px] bg-black/80 backdrop-blur-sm text-zinc-300 border border-white/15 px-1.5 py-0.5 tracking-wider uppercase">
                {product.dropNumber}
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            onClick={handleWishlist}
            aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
            className="p-2 bg-black/60 backdrop-blur-sm border border-white/10 text-white hover:bg-white hover:text-black transition-colors pointer-events-auto"
            whileTap={{ scale: 0.85 }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform ${
                isSaved ? "fill-red-500 text-red-500 scale-110" : "text-white"
              }`}
            />
          </motion.button>
        </div>

        {/* Quick Add */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 z-20 hidden md:block"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <AnimatePresence mode="wait">
                {showQuickSizes ? (
                  <motion.div
                    key="sizes"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="bg-black/95 backdrop-blur-md p-3 border-t border-white/20"
                  >
                    <div className="flex items-center justify-between pb-2 font-mono text-[10px] text-zinc-400 uppercase">
                      <span>SELECT SIZE</span>
                      <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickSizes(false); }}
                        className="hover:text-white transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {product.sizes.map((s) => (
                        <motion.button
                          key={s}
                          onClick={(e) => handleQuickAdd(e, s)}
                          className="py-1.5 bg-white/10 hover:bg-white hover:text-black border border-white/15 text-xs font-mono font-bold transition-colors text-center uppercase relative overflow-hidden"
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                        >
                          {addingSize === s ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="block"
                            >
                              ✓
                            </motion.span>
                          ) : s}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="quick-add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowQuickSizes(true); }}
                    className="w-full py-2.5 bg-white text-black font-mono text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 group/btn"
                    whileHover={{ backgroundColor: "#f0f0f0" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>QUICK ADD</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
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
          <motion.span
            className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-white whitespace-nowrap"
            animate={{ color: isHovered ? "#ffffff" : "#d4d4d4" }}
            transition={{ duration: 0.2 }}
          >
            {formatPrice(product.price)}
          </motion.span>
        </div>
        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase">
          <span>{product.colors.join(" / ")}</span>
          {product.gsm && <span>{product.gsm.replace(" Heavyweight", "")}</span>}
        </div>
      </div>
    </motion.div>
  );
};
