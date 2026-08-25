"use client";

import React from "react";
import { FullScreenHero } from "@/components/hero/FullScreenHero";
import { MarqueeTicker } from "@/components/brand/MarqueeTicker";
import { FeaturedDrop } from "@/components/editorial/FeaturedDrop";
import { LookbookStory } from "@/components/editorial/LookbookStory";
import { CategoryNavigation } from "@/components/editorial/CategoryNavigation";
import { BrandStatement } from "@/components/editorial/BrandStatement";
import { CommunityGrid } from "@/components/editorial/CommunityGrid";
import { NewsletterSection } from "@/components/newsletter/NewsletterSection";
import { PRODUCTS } from "@/data/products";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Full-Screen Nocturnal Hero */}
      <FullScreenHero />

      {/* 2. Marquee Slogan Ticker */}
      <MarqueeTicker />

      {/* 3. Featured Drop Section */}
      <FeaturedDrop products={PRODUCTS} />

      {/* 4. Editorial Story Capsule */}
      <LookbookStory />

      {/* 5. Silhouette / Category Exploration */}
      <CategoryNavigation />

      {/* 6. High-Contrast Brand Statement */}
      <BrandStatement />

      {/* 7. Community Flash Photography Grid */}
      <CommunityGrid />

      {/* 8. VIP Drop Access Newsletter */}
      <NewsletterSection />
    </div>
  );
}
