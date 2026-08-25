"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { Product } from "@/lib/types";
import { calculateDiscount } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { SizeGuideModal } from "@/components/products/SizeGuideModal";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>(product.sizes[0] || 'L');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { formatPrice, currencyDetails } = useCurrency();

  const isSaved = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.compareAtPrice);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
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
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Main Stage Image */}
          <div className="relative aspect-[3/4] flex-1 bg-[#0e0e10] overflow-hidden border border-white/10 group">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
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
              Inclusive of all duties & taxes. {currencyDetails.shippingLabel}.
            </p>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-400 uppercase">COLOR:</span>
                <span className="text-white font-bold uppercase">{selectedColor}</span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 border font-mono text-xs uppercase tracking-wider transition-colors ${
                      selectedColor === c
                        ? "border-white bg-white text-black font-bold"
                        : "border-white/20 text-zinc-400 hover:border-white/50"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector + Size Guide Link */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-400 uppercase">SIZE:</span>
                <span className="text-white font-bold">{selectedSize}</span>
              </div>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="flex items-center gap-1 text-zinc-400 hover:text-white underline underline-offset-4 text-[11px] transition-colors"
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
                  className={`py-3 border font-mono text-xs font-bold uppercase transition-all ${
                    selectedSize === s
                      ? "border-white bg-white text-black shadow-lg"
                      : "border-white/20 text-zinc-300 hover:border-white/60 bg-white/[0.02]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons (Add to Bag + Wishlist) */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToBag}
              className="flex-1 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-2xl"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO BAG</span>
            </button>

            <button
              onClick={handleWishlistToggle}
              aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
              className="p-4 border border-white/20 text-white hover:bg-white/10 hover:border-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? "fill-red-500 text-red-500" : "text-white"
                }`}
              />
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/10 font-mono text-[10px] text-zinc-400 text-center">
            <div className="flex flex-col items-center gap-1 p-2">
              <Truck className="w-4 h-4 text-zinc-300" />
              <span>EXPRESS DISPATCH</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 border-x border-white/10">
              <RotateCcw className="w-4 h-4 text-zinc-300" />
              <span>7-DAY RETURNS</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2">
              <ShieldCheck className="w-4 h-4 text-zinc-300" />
              <span>HEAVYWEIGHT HEIRLOOM</span>
            </div>
          </div>

          {/* Accordion Sections (Details, Material & Care, Shipping) */}
          <div className="border-b border-white/10 divide-y divide-white/10 font-mono text-xs">
            {/* Details */}
            <div>
              <button
                onClick={() => toggleAccordion("details")}
                className="w-full py-3.5 flex items-center justify-between text-left text-white uppercase tracking-wider"
              >
                <span>PRODUCT DETAILS & FIT</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    openAccordion === "details" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "details" && (
                <div className="pb-4 font-sans text-xs sm:text-sm text-zinc-400 space-y-2 leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="list-disc list-inside space-y-1 font-mono text-xs pt-1 text-zinc-300">
                    <li>Boxy, drop-shoulder silhouette</li>
                    <li>Reinforced 1x1 ribbed neckline that holds shape</li>
                    <li>High-density cracked plastisol / tonal discharge print</li>
                    <li>Pre-shrunk fabric to prevent post-wash deformation</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Material & Care */}
            <div>
              <button
                onClick={() => toggleAccordion("material")}
                className="w-full py-3.5 flex items-center justify-between text-left text-white uppercase tracking-wider"
              >
                <span>MATERIAL & CARE SPECIFICATIONS</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    openAccordion === "material" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "material" && (
                <div className="pb-4 font-mono text-xs text-zinc-400 space-y-1.5 leading-relaxed">
                  <p>• {product.gsm || "240 GSM"} 100% Super Combed Organic Cotton</p>
                  <p>• Machine wash cold inside out with similar colors</p>
                  <p>• Do not iron directly on graphics</p>
                  <p>• Dry flat in shade; do not tumble dry</p>
                </div>
              )}
            </div>

            {/* Shipping & Delivery */}
            <div>
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full py-3.5 flex items-center justify-between text-left text-white uppercase tracking-wider"
              >
                <span>GLOBAL SHIPPING & DISPATCH</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                    openAccordion === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "shipping" && (
                <div className="pb-4 font-mono text-xs text-zinc-400 space-y-1.5 leading-relaxed">
                  <p>• India: Dispatched in 24 hours. Delivered in 2–4 business days via Blue Dart / Delhivery.</p>
                  <p>• International: Dispatched via DHL Express (3–7 business days worldwide).</p>
                  <p>• Hassle-free 7-day doorstep size exchange.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 sm:mt-28 pt-12 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                CURATED COMPANIONS
              </span>
              <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                COMPLETE THE LOOK
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-1 font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
            >
              <span>VIEW ALL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </div>
  );
};
