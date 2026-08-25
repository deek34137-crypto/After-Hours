import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";

interface Props {
  params: {
    slug: string;
  };
}

// 1. Static Site Generation for all 57 product detail pages
export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

// 2. Dynamic SEO and OpenGraph Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.slug);
  const product = PRODUCTS.find((p) => p.slug === decodedSlug);

  if (!product) {
    return {
      title: "Piece Not Found — AFTER HOURS",
      description: "The requested archive piece could not be located.",
    };
  }

  const ogImage = product.images[0] || "/placeholder.jpg";

  return {
    title: `${product.name} — AFTER HOURS`,
    description: product.description || "Heavyweight contemporary streetwear engineered for nocturnal life in India.",
    openGraph: {
      title: `${product.name} — AFTER HOURS`,
      description: `${product.name} • ${product.gsm || "240 GSM"} • ₹${product.price}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 1600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — AFTER HOURS`,
      description: product.description,
      images: [ogImage],
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug);
  const product = PRODUCTS.find((p) => p.slug === decodedSlug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
