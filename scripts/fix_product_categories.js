const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../src/data/products.ts");
const content = fs.readFileSync(productsPath, "utf8");
const jsonMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
let products = JSON.parse(jsonMatch[1]);

products = products.map((p) => {
  const name = p.name.toLowerCase();
  const desc = p.description.toLowerCase();

  if (name.includes("jogger") || name.includes("pant") || name.includes("cargo") || name.includes("bottom")) {
    p.category = "bottoms";
  } else if (name.includes("hoodie") || name.includes("sweatshirt") || name.includes("pullover")) {
    p.category = "hoodies";
  } else if (name.includes("shirt") || name.includes("waffle") || name.includes("henley") || name.includes("raglan") || name.includes("jacket") || name.includes("sleeve")) {
    p.category = "outerwear";
  } else if (name.includes("tee") || name.includes("t-shirt") || name.includes("oversized")) {
    p.category = "tees";
  }

  return p;
});

const updatedContent = `import { Product } from "@/lib/types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(productsPath, updatedContent, "utf8");

console.log("Successfully updated product categories!");
const catCounts = {};
products.forEach(p => catCounts[p.category] = (catCounts[p.category] || 0) + 1);
console.log("Category counts:", catCounts);
