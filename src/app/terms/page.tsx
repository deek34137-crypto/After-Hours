import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
          LEGAL TERMS
        </span>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          TERMS OF SERVICE
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm">
          Effective date: August 2026. Governing transactions on AFTER HOURS.
        </p>
      </div>

      <div className="space-y-6 font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            1. ORDERS & PRICING
          </h2>
          <p>
            All prices listed on `afterhours.com` are in Indian Rupees (INR) and are inclusive of Goods and Services Tax (GST). We reserve the right to limit quantities per customer for limited-edition drop items.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            2. INTELLECTUAL PROPERTY
          </h2>
          <p>
            All typographic marks, graphics, editorial photography, garment designs, and website UX concepts are the exclusive property of AFTER HOURS APPAREL PVT. LTD. Unauthorized reproduction is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            3. GOVERNING LAW
          </h2>
          <p>
            Any disputes arising out of your purchase or interaction with the website shall be governed by the laws of India and subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
          </p>
        </section>
      </div>
    </div>
  );
}
