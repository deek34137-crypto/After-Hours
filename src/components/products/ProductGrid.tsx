"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 4;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

export const ProductGrid: React.FC<ProductGridProps> = ({ products, columns = 4 }) => {
  return (
    <motion.div
      className={`grid gap-4 sm:gap-6 ${
        columns === 2
          ? "grid-cols-2"
          : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      }`}
      variants={container}
      initial="hidden"
      animate="show"
      key={products.map((p) => p.id).join("-")}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} index={i} />
      ))}
    </motion.div>
  );
};
