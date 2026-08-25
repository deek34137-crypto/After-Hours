const https = require("https");
const fs = require("fs");
const path = require("path");

function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.request(
        {
          hostname: u.hostname,
          path: u.pathname + u.search,
          method: "HEAD",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        },
        (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve({ valid: true, status: res.statusCode });
          } else {
            resolve({ valid: false, status: res.statusCode });
          }
        }
      );
      req.on("error", () => resolve({ valid: false, error: true }));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve({ valid: false, timeout: true });
      });
      req.end();
    } catch (e) {
      resolve({ valid: false, error: e.message });
    }
  });
}

// Curated high-resolution men's streetwear photography fallback pool
const MENS_STREETWEAR_IMAGES = {
  tees: [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=85&w=1200&auto=format&fit=crop"
  ],
  shirts: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=85&w=1200&auto=format&fit=crop"
  ],
  hoodies: [
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=85&w=1200&auto=format&fit=crop"
  ],
  outerwear: [
    "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=85&w=1200&auto=format&fit=crop"
  ],
  bottoms: [
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=85&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=85&w=1200&auto=format&fit=crop"
  ]
};

async function run() {
  const productsPath = path.join(__dirname, "../src/data/products.ts");
  const content = fs.readFileSync(productsPath, "utf8");
  const jsonMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
  if (!jsonMatch) {
    console.error("Could not parse products.ts");
    return;
  }

  let products = JSON.parse(jsonMatch[1]);
  console.log(`Checking ${products.length} products for 404 images...`);

  let fixedCount = 0;
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const cat = p.category || "tees";
    const pool = MENS_STREETWEAR_IMAGES[cat] || MENS_STREETWEAR_IMAGES.tees;

    const validatedImages = [];
    for (let j = 0; j < p.images.length; j++) {
      const img = p.images[j];
      const res = await checkUrl(img);
      if (res.valid) {
        validatedImages.push(img);
      } else {
        console.log(`[404 FIX] Product ${p.slug} - invalid image: ${img}`);
        fixedCount++;
      }
    }

    if (validatedImages.length === 0) {
      validatedImages.push(pool[i % pool.length]);
      validatedImages.push(pool[(i + 1) % pool.length]);
    } else if (validatedImages.length === 1) {
      validatedImages.push(pool[(i + 1) % pool.length]);
    }

    p.images = validatedImages;
  }

  const updatedContent = `import { Product } from "@/lib/types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync(productsPath, updatedContent, "utf8");
  console.log(`Finished! Replaced ${fixedCount} broken image URLs with high-quality men's streetwear assets.`);
}

run();
