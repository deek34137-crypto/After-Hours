const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../src/data/products.ts");
const content = fs.readFileSync(productsPath, "utf8");
const jsonMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
const products = JSON.parse(jsonMatch[1]);

console.log(`=== SIGNATURE RED STUDIO PHOTOSHOOT PIECES (${products.length} Total in Catalog) ===\n`);

products.forEach((p, i) => {
  console.log(`${i + 1}. ${p.name}`);
  console.log(`   Price: ₹${p.price} | Category: ${p.category} | Drop: ${p.dropNumber}`);
  console.log(`   Image: ${p.images[0]}`);
  console.log(`   Description: ${p.description.slice(0, 90)}...`);
  console.log("--------------------------------------------------");
});
