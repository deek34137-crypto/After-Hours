import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { COLLECTIONS } from "@/data/collections";
import { PRODUCTS } from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BrandClock } from "@/components/brand/BrandClock";

interface Props {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export default function CollectionDetailPage({ params }: Props) {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);

  if (!collection) {
    notFound();
  }

  const products = PRODUCTS.filter((p) => p.collection === collection.slug);

  return (
    <div className="w-full flex flex-col">
      {/* Collection Hero Banner */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-end pb-12 px-4 sm:px-8 lg:px-12 bg-black overflow-hidden select-none border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src={collection.heroImage}
            alt={collection.title}
            fill
            priority
            className="object-cover object-center brightness-50 contrast-125"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest px-2 py-0.5 bg-black/60 border border-white/20">
              {collection.subtitle}
            </span>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              DROP: {collection.dropDate}
            </span>
          </div>

          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-white leading-none">
            {collection.title}
          </h1>

          <p className="text-zinc-300 font-sans text-sm sm:text-base max-w-2xl leading-relaxed pt-1">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Collection Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10 font-mono text-xs text-zinc-400">
          <span>PIECES IN THIS DROP ({products.length})</span>
          <BrandClock showStatus={false} />
        </div>

        <ProductGrid products={products} columns={4} />
      </section>
    </div>
  );
}
