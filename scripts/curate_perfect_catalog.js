const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../src/data/products.ts");
const content = fs.readFileSync(productsPath, "utf8");
const jsonMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
let products = JSON.parse(jsonMatch[1]);

// Keep all 57 real photoshoot products
products = products.filter(p => p.images[0] && p.images[0].includes("cdn.shopify.com"));

// Set the top 8 products as featured so the homepage grid is 100% cohesive
products.forEach((p, idx) => {
  p.featured = idx < 8;
  p.newArrival = idx < 6;
});

const updatedContent = `import { Product } from "@/lib/types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(productsPath, updatedContent, "utf8");

console.log(`Successfully curated catalog with ${products.length} matching streetwear photoshoot products!`);
console.log("Top 8 Featured pieces on Homepage:");
products.slice(0, 8).forEach((p, i) => {
  console.log(`${i + 1}. ${p.name} (${p.colors.join(", ")})`);
});
