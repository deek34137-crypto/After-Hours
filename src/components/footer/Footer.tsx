"use client";

import React from "react";
import Link from "next/link";
import { FOOTER_LINKS } from "@/data/navigation";
import { Logo } from "@/components/brand/Logo";
import { BrandClock } from "@/components/brand/BrandClock";
import { CurrencySelector } from "@/components/navigation/CurrencySelector";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050507] border-t border-white/10 text-white pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top brand banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-6">
            <Logo className="text-3xl sm:text-4xl" />
            <p className="text-zinc-400 text-sm max-w-sm font-sans leading-relaxed">
              For the hours that matter. Independent contemporary streetwear engineered in India for late-night wanderers, thinkers, and rule-benders.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <BrandClock />
              <span className="text-zinc-600">•</span>
              <CurrencySelector variant="footer" />
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Shop Column */}
            <div>
              <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4">
                THE ARCHIVE
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-zinc-400">
                {FOOTER_LINKS.shop.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Drops Column */}
            <div>
              <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4">
                DROPS & VAULT
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-zinc-400">
                {FOOTER_LINKS.collections.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information Column */}
            <div>
              <h4 className="font-mono text-xs text-white uppercase tracking-widest mb-4">
                INFORMATION
              </h4>
              <ul className="space-y-2.5 font-sans text-xs text-zinc-400">
                {FOOTER_LINKS.brand.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright & international shipping */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 font-mono text-[11px] tracking-wider">
          <div className="flex items-center gap-6">
            <span>© 2026 AFTER HOURS APPAREL PVT. LTD.</span>
            <span className="hidden sm:inline">ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-zinc-300 transition-colors">
              TERMS
            </Link>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">WORLDWIDE EXPRESS SHIPPING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
