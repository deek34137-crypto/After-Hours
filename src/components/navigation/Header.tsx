"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import { NAV_LINKS } from "@/data/navigation";
import { MobileMenuDrawer } from "@/components/navigation/MobileMenuDrawer";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { openCart, cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300 w-full",
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
            : "bg-black/60 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger + Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="lg:hidden p-1.5 text-white hover:opacity-75 transition-opacity"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "text-xs font-mono tracking-widest transition-colors py-1 relative uppercase",
                      isActive ? "text-white font-semibold" : "text-zinc-400 hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center text-center">
            <Logo />
          </div>

          {/* Right: Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              aria-label="Search Catalog"
              className="group flex items-center gap-2 p-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <Search className="w-4 h-4 sm:w-4 sm:h-4" />
              <span className="hidden xl:inline-block font-mono text-[10px] text-zinc-500 tracking-wider group-hover:text-zinc-300">
                [ ⌘K ]
              </span>
            </button>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              aria-label="Saved Wishlist"
              className="relative p-1.5 text-zinc-300 hover:text-white transition-colors"
            >
              <Heart className="w-4 h-4 sm:w-4 sm:h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart / Bag Drawer Trigger */}
            <button
              onClick={openCart}
              aria-label="Open Shopping Bag"
              className="relative flex items-center gap-2 px-2.5 py-1.5 text-white hover:opacity-90 transition-opacity bg-white/10 hover:bg-white/15 border border-white/15"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-mono text-[10px] tracking-widest uppercase hidden xs:inline-block">BAG</span>
              {cartCount > 0 && (
                <span className="font-mono text-[10px] font-bold bg-white text-black px-1.5 py-0.2 rounded-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};
