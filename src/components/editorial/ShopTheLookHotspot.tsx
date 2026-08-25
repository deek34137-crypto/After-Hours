"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingBag, ArrowUpRight, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface ShopTheLookHotspotProps {
  product: Product;
  top: string; // e.g. "45%"
  left: string; // e.g. "50%"
  label?: string;
  align?: "left" | "right" | "center";
}

export const ShopTheLookHotspot: React.FC<ShopTheLookHotspotProps> = ({
  product,
  top,
  left,
  label,
  align = "center",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0] || 'L');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors[0]);
    setIsAdded(true);
    showToast(`Added ${product.name} (${selectedSize}) to bag`, "bag");
    setTimeout(() => {
      setIsAdded(false);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className="absolute z-20"
      style={{ top, left, transform: "translate(-50%, -50%)" }}
    >
      {/* Pulsing Hotspot Trigger Dot */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group/pin p-2 focus:outline-none"
        aria-label={`Shop ${product.name}`}
      >
        {/* Outer expanding pulse ring */}
        <span className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-white/30 animate-ping" />
        {/* Core white dot */}
        <span className="relative flex items-center justify-center w-5 h-5 rounded-full bg-white text-black border border-black shadow-2xl transition-transform group-hover/pin:scale-125">
          <Plus className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
        </span>
      </button>

      {/* Popover Mini Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute bottom-full mb-3 w-64 bg-[#0e0e12]/95 backdrop-blur-md border border-white/20 p-3.5 shadow-2xl z-30 ${
              align === "left"
                ? "left-0"
                : align === "right"
                ? "right-0"
                : "left-1/2 -translate-x-1/2"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                {label || "SHOP THIS PIECE"}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Product Snapshot */}
            <div className="flex gap-3 py-3">
              <div className="relative w-14 aspect-[3/4] bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/10">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase text-white line-clamp-1">
                    {product.name}
                  </h4>
                  <span className="font-mono text-[10px] text-zinc-400">
                    {product.gsm || "240 GSM"}
                  </span>
                </div>
                <div className="font-mono font-bold text-xs text-white">
                  {formatPrice(product.price)}
                </div>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5 pb-3 border-b border-white/10">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider block">
                SELECT SIZE
              </span>
              <div className="grid grid-cols-5 gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1 text-[10px] font-mono font-bold uppercase border transition-colors ${
                      selectedSize === s
                        ? "bg-white text-black border-white"
                        : "bg-white/5 text-zinc-400 border-white/10 hover:border-white/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex gap-2">
              <button
                onClick={handleAdd}
                className={`flex-1 py-2 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                  isAdded
                    ? "bg-emerald-500 text-black"
                    : "bg-white text-black hover:bg-zinc-200"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3 h-3" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              <Link
                href={`/product/${product.slug}`}
                className="p-2 border border-white/20 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                aria-label="View product page"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
