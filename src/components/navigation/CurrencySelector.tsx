"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useCurrency, CURRENCIES, CurrencyCode } from "@/context/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

interface CurrencySelectorProps {
  variant?: "minimal" | "pill" | "footer";
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ variant = "minimal" }) => {
  const { currency, setCurrency, currencyDetails } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currenciesList = Object.values(CURRENCIES);

  if (variant === "pill") {
    return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none text-zinc-300 font-mono text-[10px] tracking-wider uppercase transition-colors"
          aria-label="Select Currency"
        >
          <span>{currencyDetails.flag}</span>
          <span className="font-bold text-white">{currencyDetails.code}</span>
          <span className="text-zinc-500">({currencyDetails.symbol})</span>
          <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-1 w-44 bg-[#111115] border border-white/15 shadow-2xl z-50 py-1"
            >
              <div className="px-3 py-1.5 font-mono text-[9px] text-zinc-500 uppercase tracking-widest border-b border-white/10">
                SELECT CURRENCY
              </div>
              {currenciesList.map((c) => {
                const isSelected = c.code === currency;
                return (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs hover:bg-white/10 transition-colors ${
                      isSelected ? "text-white font-bold bg-white/5" : "text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.code}</span>
                      <span className="text-zinc-500 text-[10px]">({c.symbol})</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default Minimal & Footer
  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors py-1"
        aria-label="Select Currency and Country"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{currencyDetails.flag}</span>
        <span className="font-semibold text-white">{currencyDetails.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mb-2 sm:mb-0 sm:mt-2 w-48 bg-[#111115] border border-white/15 shadow-2xl z-50 py-1.5"
          >
            <div className="px-3 py-1 font-mono text-[9px] text-zinc-500 uppercase tracking-widest border-b border-white/10 mb-1">
              DESTINATION CURRENCY
            </div>
            {currenciesList.map((c) => {
              const isSelected = c.code === currency;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left font-mono text-xs hover:bg-white/10 transition-colors ${
                    isSelected ? "text-white font-bold bg-white/5" : "text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{c.flag}</span>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-white">{c.code}</span>
                        <span className="text-zinc-500 text-[10px]">({c.symbol})</span>
                      </div>
                      <div className="text-[9px] text-zinc-500 font-sans">{c.name}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
