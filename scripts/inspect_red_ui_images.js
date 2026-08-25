const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../src/data/products.ts");
const content = fs.readFileSync(productsPath, "utf8");
const jsonMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
const products = JSON.parse(jsonMatch[1]);

console.log(`Current products count: ${products.length}`);
const sampleImages = products.slice(0, 15).map(p => ({
  name: p.name,
  category: p.category,
  img: p.images[0],
  alt: p.images[1] || p.images[0]
}));

console.log(JSON.stringify(sampleImages, null, 2));
