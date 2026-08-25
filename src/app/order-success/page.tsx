"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight, ShieldCheck, MessageSquare } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get("txnid") || `AH_${Date.now()}`;
  const amount = searchParams.get("amount") || "1999";
  const mode = searchParams.get("mode") || "PayU Online";
  const paymentId = searchParams.get("payment_id") || "";

  const { clearCart } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    // Clear cart once order is confirmed
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-white space-y-8 select-none">
      {/* Header Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-2xl animate-in zoom-in-50 duration-300">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
          PAYMENT CONFIRMED // DISPATCH IMMINENT
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          ORDER PLACED
        </h1>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Your order has been recorded in the nocturnal archive. You will receive real-time courier tracking on your registered WhatsApp / Mobile.
        </p>
      </div>

      {/* Invoice Details Card */}
      <div className="bg-[#0e0e12] border border-white/15 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
          <span className="text-zinc-400 uppercase">ORDER ID:</span>
          <span className="text-white font-bold">{txnid}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">STATUS</span>
            <span className="text-emerald-400 font-bold uppercase">PAID & VERIFIED</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">PAYMENT MODE</span>
            <span className="text-white font-bold uppercase">{mode}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">TOTAL AMOUNT</span>
            <span className="text-white font-bold">{formatPrice(Number(amount))}</span>
          </div>
          <div>
            <span className="text-zinc-500 block text-[10px] uppercase">DISPATCH</span>
            <span className="text-white font-bold">24-48 HOURS</span>
          </div>
        </div>

        {paymentId && (
          <div className="font-mono text-[11px] text-zinc-400 border-t border-white/10 pt-3">
            GATEWAY REF: <span className="text-zinc-200">{paymentId}</span>
          </div>
        )}
      </div>

      {/* Assurance Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 bg-white/5 border border-white/10 flex items-center gap-3 text-zinc-300">
          <Package className="w-5 h-5 text-zinc-400 flex-shrink-0" />
          <span>Tracked delivery via Blue Dart / Delhivery Surface Air Express</span>
        </div>
        <div className="p-4 bg-white/5 border border-white/10 flex items-center gap-3 text-zinc-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>7-Day Doorstep Size Exchange Guarantee</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono text-xs uppercase tracking-widest">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
        >
          <span>CONTINUE EXPLORING ARCHIVE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-zinc-400">
          LOADING ORDER STATUS...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
