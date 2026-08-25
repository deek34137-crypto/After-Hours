import React from "react";
import Link from "next/link";
import { BrandClock } from "@/components/brand/BrandClock";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 space-y-6">
      <BrandClock />

      <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
        ERROR // 404
      </span>

      <h1 className="font-sans font-black text-5xl sm:text-7xl uppercase tracking-tight text-white">
        LOST IN THE DARK
      </h1>

      <p className="text-zinc-400 font-sans text-sm max-w-md mx-auto">
        The coordinates you entered do not exist in the archive. Return to the main avenue or explore current drops.
      </p>

      <div className="pt-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO ARCHIVE</span>
        </Link>
      </div>
    </div>
  );
}
