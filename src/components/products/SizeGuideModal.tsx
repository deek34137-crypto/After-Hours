"use client";

import React, { useState } from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, category = "tees" }) => {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  if (!isOpen) return null;

  const teeSizes = [
    { size: "S", chest: unit === "in" ? "42" : "106", length: unit === "in" ? "28.5" : "72", shoulder: unit === "in" ? "21" : "53" },
    { size: "M", chest: unit === "in" ? "44" : "112", length: unit === "in" ? "29.5" : "75", shoulder: unit === "in" ? "22" : "56" },
    { size: "L", chest: unit === "in" ? "46" : "117", length: unit === "in" ? "30.5" : "77", shoulder: unit === "in" ? "23" : "58" },
    { size: "XL", chest: unit === "in" ? "48" : "122", length: unit === "in" ? "31.5" : "80", shoulder: unit === "in" ? "24" : "61" },
    { size: "XXL", chest: unit === "in" ? "50" : "127", length: unit === "in" ? "32.5" : "83", shoulder: unit === "in" ? "25" : "63.5" },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-[#0e0e11] border border-white/15 p-6 sm:p-8 text-white shadow-2xl z-50">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Ruler className="w-5 h-5 text-zinc-400" />
              <h3 className="font-sans font-bold text-lg uppercase tracking-tight">
                SIZE GUIDE & FIT SPECS
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle & Description */}
          <div className="py-4 flex items-center justify-between">
            <span className="font-sans text-xs text-zinc-400">
              Cut: <strong className="text-zinc-200">Signature Boxy Drop-Shoulder</strong>
            </span>
            <div className="flex border border-white/20 font-mono text-xs">
              <button
                onClick={() => setUnit("in")}
                className={`px-3 py-1 transition-colors ${
                  unit === "in" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                INCHES
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 transition-colors ${
                  unit === "cm" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                CM
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto py-2">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-zinc-400">
                  <th className="py-2.5 px-3">SIZE</th>
                  <th className="py-2.5 px-3">CHEST ({unit.toUpperCase()})</th>
                  <th className="py-2.5 px-3">LENGTH ({unit.toUpperCase()})</th>
                  <th className="py-2.5 px-3">SHOULDER ({unit.toUpperCase()})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {teeSizes.map((row) => (
                  <tr key={row.size} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{row.size}</td>
                    <td className="py-3 px-3 text-zinc-300">{row.chest}"</td>
                    <td className="py-3 px-3 text-zinc-300">{row.length}"</td>
                    <td className="py-3 px-3 text-zinc-300">{row.shoulder}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sizing Recommendations */}
          <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-xs font-sans text-zinc-400">
            <p>
              • <strong className="text-zinc-300">True to size:</strong> Delivers an intentionally relaxed, boxy drape.
            </p>
            <p>
              • <strong className="text-zinc-300">Size down:</strong> For a more fitted / standard appearance.
            </p>
            <p>
              • <strong className="text-zinc-300">Model:</strong> 6'1" (185 cm) wearing size Large.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
