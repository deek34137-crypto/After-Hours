const fs = require("fs");
const path = require("path");

const productsPath = path.join(__dirname, "../src/data/products.ts");
const content = fs.readFileSync(productsPath, "utf8");

// Extract the products array JSON
const jsonMatch = content.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*\]);\s*$/);
if (!jsonMatch) {
  console.error("Could not find products array in file!");
  process.exit(1);
}

let products = JSON.parse(jsonMatch[1]);

function cleanText(str) {
  if (!str) return str;
  return str
    .replace(/TSS Originals:\s*/gi, "")
    .replace(/TSS\s+/gi, "AH ")
    .replace(/The Souled Store/gi, "AFTER HOURS")
    .replace(/thesouledstore\.com/gi, "afterhours.com")
    .replace(/thesouledstore/gi, "afterhours")
    .replace(/Guilty Party:\s*guilty of[^\.\n]*/gi, "AFTER HOURS: For the hours that matter.")
    .replace(/Guilty Party/gi, "AFTER HOURS")
    .replace(/GUILTY PARTY/gi, "AFTER HOURS")
    .replace(/guilty party/gi, "AFTER HOURS")
    .replace(/गिल्टी पार्टी/gi, "आफ्टर आवर्स")
    .replace(/guilty of losing the plot/gi, "built for after dark")
    .replace(/guilty of thinking beyond imagination/gi, "designed for nocturnal creators")
    .replace(/guilty of getting too attached/gi, "crafted for the late night")
    .replace(/guilty of turning darkness into devotion/gi, "engineered for the night shift")
    .replace(/guilty of making brains the main character/gi, "for the ones awake at 02:00 AM")
    .replace(/guilty of blooming from the damage/gi, "flourishing after midnight")
    .replace(/guilty of being on DND/gi, "living in silent mode after hours")
    .replace(/guilty of[^\.\n]*/gi, "made for the hours that matter")
    .trim();
}

let countModified = 0;

products = products.map((p) => {
  const original = JSON.stringify(p);

  p.name = cleanText(p.name);
  p.subtitle = cleanText(p.subtitle);
  p.description = cleanText(p.description);
  p.story = cleanText(p.story);
  
  if (Array.isArray(p.details)) {
    p.details = p.details.map(d => cleanText(d));
  }

  if (Array.isArray(p.tags)) {
    p.tags = p.tags
      .map(t => t.replace(/guilty-party/gi, "after-hours").replace(/the-souled-store/gi, "after-hours"))
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  if (JSON.stringify(p) !== original) {
    countModified++;
  }

  return p;
});

const updatedContent = `import { Product } from "@/lib/types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(productsPath, updatedContent, "utf8");

console.log(`Sanitized ${countModified} products. Total products in catalog: ${products.length}`);
