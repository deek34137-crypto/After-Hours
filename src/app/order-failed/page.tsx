"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertCircle, RotateCcw, ShoppingBag, ArrowLeft } from "lucide-react";

function OrderFailedContent() {
  const searchParams = useSearchParams();
  const txnid = searchParams.get("txnid") || "";
  const reason = searchParams.get("reason") || "Payment was declined by your bank or cancelled.";

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center text-white space-y-6 select-none">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="font-mono text-xs text-red-400 uppercase tracking-widest">
          PAYMENT INCOMPLETE
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
          TRANSACTION FAILED
        </h1>
        <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
          {reason}
        </p>
      </div>

      {txnid && (
        <div className="p-3 bg-white/5 border border-white/10 font-mono text-xs text-zinc-400 inline-block">
          TXN REF: <span className="text-zinc-200">{txnid}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 font-mono text-xs uppercase tracking-widest">
        <Link
          href="/cart"
          className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RETRY CHECKOUT</span>
        </Link>
        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-4 border border-white/20 text-white hover:bg-white/10 transition-colors"
        >
          BACK TO ARCHIVE
        </Link>
      </div>
    </div>
  );
}

export default function OrderFailedPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-zinc-400">
          LOADING STATUS...
        </div>
      }
    >
      <OrderFailedContent />
    </Suspense>
  );
}
