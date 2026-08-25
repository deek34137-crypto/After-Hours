import React from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4 }) => {
  const gridClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-white/15 my-8 space-y-3">
        <h3 className="font-sans font-bold text-base uppercase text-zinc-400">
          NO PIECES MATCH YOUR FILTER
        </h3>
        <p className="font-sans text-xs text-zinc-600 max-w-sm mx-auto">
          Adjust or clear your filters to explore available drops from our archive.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClasses[columns]} gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-12`}>
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 4} />
      ))}
    </div>
  );
};
