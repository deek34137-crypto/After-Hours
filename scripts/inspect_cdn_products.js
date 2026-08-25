const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../src/data/products.ts");
const content = fs.readFileSync(productsPath, "utf8");
const jsonMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
const products = JSON.parse(jsonMatch[1]);

console.log(`Total products: ${products.length}`);
const cdnProducts = products.filter(p => p.images[0] && p.images[0].includes("cdn.shopify.com"));
console.log(`Products with real photoshoot CDN images: ${cdnProducts.length}`);

// Print the first 12 products
cdnProducts.slice(0, 12).forEach((p, i) => {
  console.log(`${i + 1}. [${p.id}] ${p.name} -> ${p.images[0]}`);
});
