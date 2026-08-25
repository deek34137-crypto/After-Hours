"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    cartCount,
    freeShippingThreshold,
    shippingRemaining,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsCheckingOut(false);
      setCheckoutSuccess(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMockCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
    }, 1500);
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d10] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-sans font-black tracking-tight text-lg uppercase">
                YOUR BAG
              </h2>
              <span className="font-mono text-xs text-zinc-400">
                ({cartCount} {cartCount === 1 ? "ITEM" : "ITEMS"})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#141418] px-6 py-3 border-b border-white/5">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Truck className="w-3.5 h-3.5" />
                {shippingRemaining === 0 ? (
                  <span className="text-emerald-400 font-semibold">FREE PAN-INDIA SHIPPING UNLOCKED</span>
                ) : (
                  <span>ADD {formatPrice(shippingRemaining)} FOR FREE SHIPPING</span>
                )}
              </span>
              <span className="text-zinc-500">{progressPercent}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-zinc-600">
                  <X className="w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-lg uppercase tracking-wide">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-zinc-400 text-xs max-w-xs font-sans">
                  The night is young. Discover our latest heavy drops and signature streetwear pieces.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-4 px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors inline-block"
                >
                  EXPLORE THE COLLECTION
                </Link>
              </div>
            ) : checkoutSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-sans font-bold text-lg uppercase tracking-wide text-white">
                  ORDER INITIATED
                </h3>
                <p className="text-zinc-400 text-xs max-w-xs font-sans">
                  Demo order registered! In production, this redirects directly to Razorpay / Cashfree / UPI Gateway.
                </p>
                <button
                  onClick={() => setCheckoutSuccess(false)}
                  className="px-6 py-2.5 border border-white/20 text-xs font-mono uppercase tracking-widest hover:bg-white/10"
                >
                  RETURN TO BAG
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-white/10 last:border-0"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 bg-zinc-900 flex-shrink-0 overflow-hidden border border-white/10">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-sans font-bold text-sm tracking-tight hover:underline line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mt-1 font-mono text-[11px] text-zinc-400">
                        <span>SIZE: {item.size}</span>
                        <span>•</span>
                        <span>{item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-white/20">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 px-2 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono text-xs px-2 py-0.5 min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 px-2 text-zinc-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-mono font-bold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && !checkoutSuccess && (
            <div className="p-6 border-t border-white/10 bg-[#0a0a0c] space-y-4">
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold text-sm">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400 text-[11px]">
                  <span>ESTIMATED PAN-INDIA SHIPPING</span>
                  <span>{shippingRemaining === 0 ? "FREE" : "₹100 (FREE ABOVE ₹1,999)"}</span>
                </div>
                <div className="text-[10px] text-zinc-500 pt-1">
                  Tax included. Duties & local taxes calculated at checkout.
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                  onClick={handleMockCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">CONNECTING TO GATEWAY...</span>
                  ) : (
                    <>
                      <span>CHECKOUT • {formatPrice(subtotal)}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-2.5 border border-white/20 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-300 hover:text-white hover:border-white transition-colors"
                >
                  VIEW FULL BAG
                </Link>
              </div>

              <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-zinc-500 pt-1">
                <span>UPI</span>
                <span>•</span>
                <span>CARDS</span>
                <span>•</span>
                <span>NETBANKING</span>
                <span>•</span>
                <span>COD AVAILABLE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
