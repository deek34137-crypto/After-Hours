export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description: string;
  story?: string;
  details: string[];
  composition?: string;
  gsm?: string;
  fit?: string;
  price: number;
  compareAtPrice?: number;
  category: 'tees' | 'oversized' | 'hoodies' | 'bottoms' | 'outerwear' | 'accessories';
  collection: 'new-after-dark' | 'night-shift' | 'after-hours-essentials' | 'midnight-archive';
  images: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL')[];
  colors: string[];
  tags: string[];
  featured?: boolean;
  newArrival?: boolean;
  soldOut?: boolean;
  inStock?: boolean;
  dropNumber?: string;
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  dropDate: string;
  itemCount: number;
  tagline: string;
};

export type CartItem = {
  id: string;
  productId: string;
  product: Product;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  quantity: number;
  price: number;
};

export type FilterState = {
  category: string[];
  collection: string[];
  size: string[];
  color: string[];
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
};
