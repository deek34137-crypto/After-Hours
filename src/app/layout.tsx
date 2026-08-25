import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import { ToastProvider } from "@/context/ToastContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchOverlayModal } from "@/components/search/SearchOverlayModal";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageLoader } from "@/components/ui/PageLoader";
import { MidnightRadio } from "@/components/audio/MidnightRadio";

export const metadata: Metadata = {
  title: "AFTER HOURS — Contemporary Streetwear",
  description: "For the hours that matter. Premium oversized tees, heavyweight cotton, and urban streetwear engineered for nocturnal life.",
  keywords: ["streetwear", "heavyweight cotton", "oversized tee", "after hours", "mumbai streetwear", "india fashion", "graphic tees"],
  openGraph: {
    title: "AFTER HOURS — Contemporary Streetwear",
    description: "For the hours that matter. Independent contemporary streetwear engineered in India.",
    url: "https://afterhours.com",
    siteName: "AFTER HOURS",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='black'/><text x='50%' y='55%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='50' fill='white'>AH</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#080808] text-[#f5f5f0] min-h-screen flex flex-col font-sans">
        {/* Grain texture overlay */}
        <div className="grain-overlay" />

        {/* Brand page loader — first visit only */}
        <PageLoader />

        {/* Custom cursor — desktop only */}
        <CustomCursor />

        {/* Floating Midnight Ambient Audio Player */}
        <MidnightRadio />

        <CurrencyProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <SearchProvider>
                  <AnnouncementBar />
                  <Header />
                  <main className="flex-1 w-full">{children}</main>
                  <Footer />
                  <CartDrawer />
                  <SearchOverlayModal />
                </SearchProvider>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
