"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Ruler,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { SizeGuideModal } from "@/components/products/SizeGuideModal";
import { ProductCard } from "@/components/products/ProductCard";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0] || 'L');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const isSaved = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor);
    showToast(`Added ${product.name} (${selectedSize}) to bag`, "bag");
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    showToast(
      isSaved ? `Removed from wishlist` : `Saved to wishlist`,
      "wishlist"
    );
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wider mb-8">
        <Link href="/" className="hover:text-white transition-colors">
          HOME
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          ARCHIVE
        </Link>
        <span>/</span>
        <span className="text-zinc-300 line-clamp-1">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Gallery (Thumbnails + Main Stage) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible sm:w-20 flex-shrink-0 no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-16 sm:w-20 aspect-[3/4] bg-zinc-900 overflow-hidden border transition-all flex-shrink-0 ${
                  selectedImage === idx ? "border-white" : "border-white/15 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Main Visual Display */}
          <div className="relative flex-1 aspect-[3/4] bg-zinc-900 border border-white/10 overflow-hidden group">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            {product.dropNumber && (
              <div className="absolute top-4 left-4 font-mono text-[10px] bg-black/80 backdrop-blur-md px-2 py-0.5 border border-white/20 uppercase tracking-widest text-zinc-300">
                {product.dropNumber}
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          {/* Title & Subtitle */}
          <div className="space-y-1 pb-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                {product.category} • {product.gsm || "HEAVYWEIGHT"}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>IN STOCK</span>
              </div>
            </div>

            <h1 className="font-sans font-black text-2xl sm:text-4xl uppercase tracking-tight text-white pt-1">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="font-mono text-xs text-zinc-400">{product.subtitle}</p>
            )}

            {/* Price block */}
            <div className="flex items-center gap-3 pt-3">
              <span className="font-mono font-bold text-xl sm:text-2xl text-white">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="font-mono text-sm text-zinc-500 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="font-mono text-[10px] bg-white text-black px-1.5 py-0.5 font-bold uppercase tracking-wider">
                    SAVE {discount}%
                  </span>
                </>
              )}
            </div>
            <p className="font-mono text-[10px] text-zinc-500 pt-1">
              Inclusive of all taxes. Free shipping on orders over ₹1,999.
            </p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400 uppercase">COLORWAY:</span>
                <span className="text-white font-bold uppercase">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 font-mono text-xs uppercase border transition-colors ${
                      selectedColor === c
                        ? "bg-white text-black border-white font-bold"
                        : "bg-white/5 text-zinc-400 border-white/15 hover:border-white/40"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-400 uppercase">SELECT SIZE:</span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-zinc-400 hover:text-white underline flex items-center gap-1 transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>SIZE GUIDE</span>
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 font-mono text-xs uppercase font-bold text-center border transition-all ${
                    selectedSize === s
                      ? "bg-white text-black border-white shadow-lg"
                      : "bg-white/5 text-zinc-300 border-white/15 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <span className="font-mono text-[10px] text-zinc-500 block">
              Fit: {product.fit || "Signature Boxy Streetwear Cut (True to size)"}
            </span>
          </div>

          {/* Add to Bag & Wishlist Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToBag}
              className="flex-1 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-2xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG • {formatPrice(product.price)}</span>
            </button>

            <button
              onClick={handleWishlistToggle}
              aria-label={isSaved ? "Saved" : "Save to wishlist"}
              className={`p-4 border transition-colors flex items-center justify-center ${
                isSaved
                  ? "bg-red-500/10 border-red-500 text-red-500"
                  : "bg-white/5 border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-red-500" : ""}`} />
            </button>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 font-mono text-[10px] text-zinc-400 text-center">
            <div className="space-y-1">
              <Truck className="w-4 h-4 mx-auto text-zinc-300" />
              <span>2-4 DAYS PAN-INDIA</span>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-4 h-4 mx-auto text-zinc-300" />
              <span>7-DAY EASY EXCHANGE</span>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-zinc-300" />
              <span>100% COMBED COTTON</span>
            </div>
          </div>

          {/* Collapsible Accordions */}
          <div className="divide-y divide-white/10 font-sans text-xs">
            {/* 1. Description & Story */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion("details")}
                className="w-full flex items-center justify-between font-mono text-xs uppercase tracking-wider text-white hover:text-zinc-300 transition-colors"
              >
                <span>PRODUCT DETAILS & STORY</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === "details" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "details" && (
                <div className="pt-3 space-y-3 text-zinc-400 leading-relaxed">
                  <p>{product.description}</p>
                  {product.story && <p className="italic text-zinc-300">"{product.story}"</p>}
                  <ul className="list-disc list-inside space-y-1 pt-1 font-mono text-[11px] text-zinc-400">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Composition & Care */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion("composition")}
                className="w-full flex items-center justify-between font-mono text-xs uppercase tracking-wider text-white hover:text-zinc-300 transition-colors"
              >
                <span>FABRIC & CARE INSTRUCTIONS</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === "composition" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "composition" && (
                <div className="pt-3 space-y-2 text-zinc-400 font-mono text-[11px] leading-relaxed">
                  <p>• <strong>Composition:</strong> {product.composition || "100% Combed Cotton"}</p>
                  <p>• <strong>Fabric Weight:</strong> {product.gsm || "260 GSM Heavyweight"}</p>
                  <p>• Machine wash cold inside out with like colors.</p>
                  <p>• Do not iron directly over high-density screenprints.</p>
                  <p>• Flat dry in shade to preserve boxy silhouette.</p>
                </div>
              )}
            </div>

            {/* 3. Shipping & Pan-India Dispatch */}
            <div className="py-3.5">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex items-center justify-between font-mono text-xs uppercase tracking-wider text-white hover:text-zinc-300 transition-colors"
              >
                <span>SHIPPING & RETURNS</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "shipping" && (
                <div className="pt-3 space-y-2 text-zinc-400 font-mono text-[11px] leading-relaxed">
                  <p>• <strong>Dispatch:</strong> Dispatched within 24 hours from our Mumbai hub.</p>
                  <p>• <strong>Delivery:</strong> Delhi NCR & Mumbai: 1-2 business days. Other Metros: 2-4 business days.</p>
                  <p>• <strong>Returns:</strong> Complimentary 7-day doorstep size exchange available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                COMPLETE THE LOOK
              </span>
              <h2 className="font-sans font-black text-2xl uppercase tracking-tight text-white">
                WEAR IT WITH
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white flex items-center gap-1.5"
            >
              <span>EXPLORE ALL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
