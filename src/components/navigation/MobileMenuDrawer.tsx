"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Instagram } from "lucide-react";
import { MOBILE_MENU_CATEGORIES } from "@/data/navigation";
import { BrandClock } from "@/components/brand/BrandClock";
import { Logo } from "@/components/brand/Logo";

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#0a0a0c] border-r border-white/10 p-6 flex flex-col justify-between overflow-y-auto z-50">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Logo variant="compact" />
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Time & Location */}
          <div className="py-4 border-b border-white/10">
            <BrandClock />
          </div>

          {/* Navigation Links */}
          <nav className="py-6 flex flex-col gap-4">
            {MOBILE_MENU_CATEGORIES.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between text-base font-sans font-bold tracking-tight text-zinc-200 hover:text-white uppercase transition-colors"
              >
                <span>{item.label}</span>
                {item.badge ? (
                  <span className="font-mono text-[9px] bg-white text-black px-1.5 py-0.5 tracking-widest">
                    {item.badge}
                  </span>
                ) : (
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-white/10 space-y-4 font-mono text-xs text-zinc-400">
          <div className="flex justify-between items-center">
            <Link href="/about" onClick={onClose} className="hover:text-white">
              ABOUT
            </Link>
            <Link href="/contact" onClick={onClose} className="hover:text-white">
              CONTACT
            </Link>
            <Link href="/shipping" onClick={onClose} className="hover:text-white">
              SHIPPING
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500">
            <span>AFTER HOURS © 2026</span>
            <span>MUMBAI // DELHI</span>
          </div>
        </div>
      </div>
    </div>
  );
};
