"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    cartCount,
  } = useCart();
  const { formatPrice, currencyDetails, freeShippingThreshold } = useCurrency();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const shippingRemaining = Math.max(0, 1999 - subtotal);
  const isFreeShipping = subtotal >= 1999;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === "AFTER10" || promoCode.toUpperCase() === "MIDNIGHT") {
      setPromoApplied(true);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6 select-none">
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-zinc-400 font-sans text-sm max-w-sm mx-auto">
          You haven&apos;t added any pieces to your bag yet. Browse our latest drops and heavyweight essentials.
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 select-none">
      <div className="border-b border-white/10 pb-6 mb-8 flex items-baseline justify-between">
        <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
          SHOPPING BAG
        </h1>
        <span className="font-mono text-xs text-zinc-400">
          {cartCount} {cartCount === 1 ? "PIECE" : "PIECES"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 bg-[#0e0e12] border border-white/10 items-start sm:items-center justify-between"
            >
              {/* Product Thumbnail */}
              <div className="flex gap-4 items-center">
                <div className="relative w-20 sm:w-24 aspect-[3/4] bg-zinc-900 overflow-hidden flex-shrink-0 border border-white/10">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                    {item.product.category} • {item.product.gsm || "HEAVYWEIGHT"}
                  </span>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="font-sans font-bold text-sm sm:text-base uppercase hover:text-zinc-300 transition-colors block"
                  >
                    {item.product.name}
                  </Link>
                  <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 pt-1">
                    <span>SIZE: <strong className="text-white">{item.size}</strong></span>
                    <span>•</span>
                    <span>COLOR: <strong className="text-white">{item.color}</strong></span>
                  </div>
                </div>
              </div>

              {/* Price & Quantity Controls */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <span className="font-mono font-bold text-base text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-white/20 bg-black">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 text-zinc-400 hover:text-white"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs px-3 py-1 font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 text-zinc-400 hover:text-white"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-500 hover:text-red-400 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">REMOVE</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 space-y-6 sticky top-24">
            <h2 className="font-sans font-bold text-lg uppercase tracking-tight border-b border-white/10 pb-4">
              ORDER SUMMARY
            </h2>

            {/* Shipping Progress */}
            <div className="bg-white/5 p-3 font-mono text-xs text-zinc-300 flex items-center gap-2">
              <Truck className="w-4 h-4 text-zinc-400" />
              {isFreeShipping ? (
                <span className="text-emerald-400 font-bold uppercase">COMPLIMENTARY SHIPPING UNLOCKED</span>
              ) : (
                <span>Add {formatPrice(shippingRemaining)} for Free Shipping</span>
              )}
            </div>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE (e.g. AFTER10)"
                className="flex-1 px-3 py-2 bg-black border border-white/15 text-white font-mono text-xs uppercase focus:outline-none focus:border-white"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black border border-white/20 font-mono text-xs uppercase font-bold transition-colors"
              >
                APPLY
              </button>
            </form>
            {promoApplied && (
              <span className="font-mono text-xs text-emerald-400 block">
                ✓ 10% Nocturnal Discount Applied
              </span>
            )}

            {/* Price Calculations */}
            <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>DISCOUNT (10%)</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>PAN-INDIA SHIPPING</span>
                <span>{isFreeShipping ? "FREE" : formatPrice(100)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white border-t border-white/10 pt-3">
                <span>TOTAL</span>
                <span>{formatPrice(finalTotal + (isFreeShipping ? 0 : 100))}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="w-full py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center font-mono text-[10px] text-zinc-500 space-y-1">
              <p>PAYU 256-BIT SECURE ENCRYPTION</p>
              <p>UPI • GOOGLE PAY • PHONEPE • CARDS • COD</p>
            </div>
          </div>
        </div>
      </div>

      {/* PayU Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </div>
  );
}
