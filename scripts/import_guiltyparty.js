const fs = require("fs");
const https = require("https");
const path = require("path");

const url = "https://guiltyparty.in/products.json?limit=250";

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function cleanHtml(html) {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function determineCategory(title, body) {
  const t = (title + " " + body).toLowerCase();
  if (t.includes("hoodie") || t.includes("pullover") || t.includes("fleece") || t.includes("sweatshirt")) return "hoodies";
  if (t.includes("waffle") || t.includes("henley") || t.includes("knit") || t.includes("jacket") || t.includes("outerwear") || t.includes("sleeve")) return "outerwear";
  if (t.includes("pant") || t.includes("cargo") || t.includes("bottom") || t.includes("short") || t.includes("trousers")) return "bottoms";
  if (t.includes("oversized")) return "oversized";
  if (t.includes("tee") || t.includes("t-shirt")) return "tees";
  return "tees";
}

function determineCollection(idx) {
  const collections = ["new-after-dark", "night-shift", "after-hours-essentials", "midnight-archive"];
  return collections[idx % collections.length];
}

async function run() {
  console.log("Fetching products from guiltyparty.in...");
  const data = await fetchJson(url);
  const rawProducts = data.products || [];
  console.log(`Found ${rawProducts.length} products on guiltyparty.in`);

  const products = rawProducts.map((p, idx) => {
    const rawDesc = cleanHtml(p.body_html || "");
    const lines = rawDesc.split("\n").map(l => l.trim()).filter(Boolean);
    const details = lines.filter(l => l.length < 80 && !l.toLowerCase().includes("guilty party:") && !l.toLowerCase().includes("description:") && !l.toLowerCase().includes("details:"));
    
    // Extract GSM if mentioned
    let gsm = "240 GSM";
    const gsmMatch = (p.title + " " + rawDesc).match(/(\d{3})\s*GSM/i);
    if (gsmMatch) {
      gsm = `${gsmMatch[1]} GSM Heavyweight`;
    }

    // Extract sizes from variants
    const sizeSet = new Set();
    p.variants.forEach(v => {
      if (v.title && ["S", "M", "L", "XL", "XXL", "2XL"].includes(v.title.toUpperCase())) {
        sizeSet.add(v.title.toUpperCase() === "2XL" ? "XXL" : v.title.toUpperCase());
      }
    });
    const sizes = sizeSet.size > 0 ? Array.from(sizeSet) : ["S", "M", "L", "XL"];

    // Price from first variant
    const firstVariant = p.variants[0] || {};
    const price = Math.round(parseFloat(firstVariant.price || "1299"));
    const compareAtPrice = firstVariant.compare_at_price ? Math.round(parseFloat(firstVariant.compare_at_price)) : Math.round(price * 1.35);

    // Images
    const images = (p.images || []).map(img => img.src).filter(Boolean);
    if (images.length === 0) {
      images.push("https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop");
    }

    // Category
    const category = determineCategory(p.title, rawDesc);
    const collection = determineCollection(idx);

    // Extract colors
    const colors = [];
    const lowerTitle = p.title.toLowerCase();
    if (lowerTitle.includes("bottle green")) colors.push("Bottle Green");
    else if (lowerTitle.includes("denim wash")) colors.push("Denim Wash");
    else if (lowerTitle.includes("red")) colors.push("Crimson Red");
    else if (lowerTitle.includes("white and black")) colors.push("White / Black");
    else if (lowerTitle.includes("black")) colors.push("Washed Black");
    else if (lowerTitle.includes("off-white") || lowerTitle.includes("white")) colors.push("Off-White");
    else colors.push("Original Monochrome");

    return {
      id: `gp-${p.id}`,
      slug: p.handle,
      name: p.title,
      subtitle: `${gsm} Streetwear Cut`,
      description: rawDesc || `Signature ${p.title} crafted with ${gsm} cotton for a structured streetwear fall.`,
      story: `Part of our contemporary streetwear series. Built for the ones who live after midnight.`,
      details: details.length > 0 ? details.slice(0, 6) : [
        gsm,
        "100% French Terry / Combed Cotton",
        "Boxy Streetwear Silhouette",
        "High-density Graphic Screenprint",
        "Reinforced neckline binding"
      ],
      composition: "100% French Terry / Bio-Washed Cotton",
      gsm: gsm,
      fit: "Relaxed Boxy Fit (True to size for oversized look)",
      price: price,
      compareAtPrice: compareAtPrice,
      category: category,
      collection: collection,
      images: images,
      sizes: sizes,
      colors: colors,
      tags: ["guilty-party", category, collection, "drop-03"],
      featured: idx < 8,
      newArrival: idx < 6,
      inStock: true,
      dropNumber: `DROP 0${(idx % 4) + 1}`
    };
  });

  const fileContent = `import { Product } from "@/lib/types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;

  const targetPath = path.join(__dirname, "../src/data/products.ts");
  fs.writeFileSync(targetPath, fileContent, "utf8");
  console.log(`Successfully generated ${products.length} products in ${targetPath}`);
}

run().catch(console.error);
