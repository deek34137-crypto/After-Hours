import React from "react";
import { RotateCcw, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
          CUSTOMER SATISFACTION
        </span>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          RETURNS & EXCHANGES
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm">
          Simple 7-day doorstep size exchanges and easy return process.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
        <div className="p-6 bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
            <CheckCircle className="w-4 h-4" />
            <span>ELIGIBLE FOR RETURN / EXCHANGE</span>
          </div>
          <ul className="space-y-1.5 text-zinc-400 text-[11px]">
            <li>• Unworn, unwashed items in brand new condition</li>
            <li>• Original tags and zip-pouch packaging intact</li>
            <li>• Raised within 7 days of package delivery</li>
            <li>• Size exchange for identical piece is 100% complimentary</li>
          </ul>
        </div>

        <div className="p-6 bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase">
            <AlertCircle className="w-4 h-4" />
            <span>NON-RETURNABLE ITEMS</span>
          </div>
          <ul className="space-y-1.5 text-zinc-400 text-[11px]">
            <li>• Intimate accessories (beanies, caps, socks)</li>
            <li>• Items marked as Final Vault Archive Sale</li>
            <li>• Pieces damaged by improper washing or post-delivery wear</li>
          </ul>
        </div>
      </div>

      <div className="space-y-8 font-sans text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            HOW TO INITIATE AN EXCHANGE
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-zinc-400 text-xs sm:text-sm">
            <li>Visit our <Link href="/contact" className="text-white underline">Concierge Page</Link> or send a WhatsApp message to our team.</li>
            <li>Provide your Order ID (e.g. #AH-1024) and the replacement size needed.</li>
            <li>Our courier partner will arrange a doorstep pickup within 48 hours.</li>
            <li>Once inspected at our hub, the replacement size or store credit is dispatched immediately.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
