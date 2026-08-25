const fs = require("fs");
const path = require("path");

// 1. Fetch Guilty Party products
const https = require("https");
const gpUrl = "https://guiltyparty.in/products.json?limit=250";

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
  console.log("Fetching Guilty Party catalog...");
  const data = await fetchJson(gpUrl);
  const rawGp = data.products || [];

  const gpProducts = rawGp.map((p, idx) => {
    const rawDesc = cleanHtml(p.body_html || "");
    const lines = rawDesc.split("\n").map(l => l.trim()).filter(Boolean);
    const details = lines.filter(l => l.length < 80 && !l.toLowerCase().includes("guilty party:") && !l.toLowerCase().includes("description:") && !l.toLowerCase().includes("details:"));
    
    let gsm = "240 GSM";
    const gsmMatch = (p.title + " " + rawDesc).match(/(\d{3})\s*GSM/i);
    if (gsmMatch) {
      gsm = `${gsmMatch[1]} GSM Heavyweight`;
    }

    const sizeSet = new Set();
    p.variants.forEach(v => {
      if (v.title && ["S", "M", "L", "XL", "XXL", "2XL"].includes(v.title.toUpperCase())) {
        sizeSet.add(v.title.toUpperCase() === "2XL" ? "XXL" : v.title.toUpperCase());
      }
    });
    const sizes = sizeSet.size > 0 ? Array.from(sizeSet) : ["S", "M", "L", "XL"];

    const firstVariant = p.variants[0] || {};
    const price = Math.round(parseFloat(firstVariant.price || "1299"));
    const compareAtPrice = firstVariant.compare_at_price ? Math.round(parseFloat(firstVariant.compare_at_price)) : Math.round(price * 1.35);

    const images = (p.images || []).map(img => img.src).filter(Boolean);
    if (images.length === 0) {
      images.push("https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop");
    }

    const category = determineCategory(p.title, rawDesc);
    const collection = determineCollection(idx);

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
      featured: idx < 6,
      newArrival: idx < 4,
      inStock: true,
      dropNumber: `DROP 0${(idx % 4) + 1}`
    };
  });

  // 2. The Souled Store Men's T-Shirts, Shirts & Outerwear Catalog
  const tssProducts = [
    {
      id: "tss-m-01",
      slug: "solids-jet-black-oversized-t-shirt",
      name: "Solids: Jet Black Oversized T-Shirt",
      subtitle: "240 GSM 100% French Terry Cotton",
      description: "The ultimate streetwear staple. Engineered with heavy 240 GSM single jersey French terry cotton for a structured, relaxed drape that holds its shape wash after wash. Features a reinforced ribbed crew neck and signature drop-shoulder silhouette.",
      story: "Designed for effortless daily rotation. Minimalist front with uncompromised heavyweight construction.",
      details: [
        "240 GSM Heavyweight French Terry Cotton",
        "100% Super Combed Bio-Washed Cotton",
        "Signature Oversized Drop-Shoulder Fit",
        "Reinforced Ribbed Crewneck Collar",
        "Pre-shrunk to minimize shrinkage"
      ],
      composition: "100% Combed Cotton",
      gsm: "240 GSM Heavyweight",
      fit: "Oversized Fit (Buy true to size)",
      price: 1099,
      compareAtPrice: 1499,
      category: "tees",
      collection: "after-hours-essentials",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1687848606_2245232.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1687848606_4540455.jpg",
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Jet Black", "Charcoal Grey"],
      tags: ["the-souled-store", "t-shirts", "oversized", "solids", "heavyweight"],
      featured: true,
      newArrival: false,
      inStock: true,
      dropNumber: "DROP 01"
    },
    {
      id: "tss-m-02",
      slug: "tss-originals-cyber-nocturnal-oversized-tee",
      name: "TSS Originals: Cyber Nocturnal Oversized T-Shirt",
      subtitle: "High-Density Neon Acid Cyber Graphic",
      description: "Crafted on a pitch black heavyweight base with 240 GSM cotton. Features an intricate futuristic cyber graphic on the back with distorted typography and reflective highlights.",
      story: "Part of The Souled Store Originals dark futuristic capsule.",
      details: [
        "240 GSM 100% Cotton",
        "High-density plastisol back screenprint",
        "Minimalist chest branding",
        "Seamless drop-shoulder silhouette"
      ],
      composition: "100% Bio-Washed Cotton",
      gsm: "240 GSM",
      fit: "Relaxed Oversized Fit",
      price: 1299,
      compareAtPrice: 1799,
      category: "tees",
      collection: "new-after-dark",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1701258671_4874479.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1701258671_8109605.jpg",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Pitch Black", "Asphalt"],
      tags: ["the-souled-store", "graphic-tee", "oversized", "cyber", "after-dark"],
      featured: true,
      newArrival: true,
      inStock: true,
      dropNumber: "DROP 03"
    },
    {
      id: "tss-m-03",
      slug: "solids-vintage-washed-olive-oversized-t-shirt",
      name: "Solids: Vintage Washed Olive Oversized T-Shirt",
      subtitle: "Mineral Acid Washed Heavyweight Tee",
      description: "Treated with a specialized garment mineral wash that gives each t-shirt a soft vintage patina and unique character. 240 GSM heavy cotton construction.",
      story: "Lived-in comfort with raw streetwear appeal.",
      details: [
        "240 GSM 100% French Terry Cotton",
        "Vintage Acid Washed Finish",
        "Thick neck ribbing",
        "Straight drop hem"
      ],
      composition: "100% Cotton",
      gsm: "240 GSM",
      fit: "Boxy Oversized",
      price: 1199,
      compareAtPrice: 1599,
      category: "tees",
      collection: "night-shift",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1698305096_6486027.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1698305096_8194451.jpg",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Vintage Olive", "Moss Green"],
      tags: ["the-souled-store", "mineral-wash", "oversized", "solids"],
      featured: true,
      newArrival: false,
      inStock: true,
      dropNumber: "DROP 02"
    },
    {
      id: "tss-m-04",
      slug: "naruto-itachi-uchiha-oversized-t-shirt",
      name: "Naruto: Itachi Uchiha Oversized T-Shirt",
      subtitle: "Official Anime Collaboration Heavy Tee",
      description: "Official Naruto Shippuden merchandise. Features Itachi Uchiha in high-contrast red and black nocturnal graphics with Crow silhouette detailing on 240 GSM premium black cotton.",
      story: "Official licensed anime drop with dark aesthetic artwork.",
      details: [
        "240 GSM 100% Cotton French Terry",
        "Officially Licensed Naruto Artwork",
        "Cracked vintage resistant screenprint",
        "Drop shoulder relaxed cut"
      ],
      composition: "100% Super Combed Cotton",
      gsm: "240 GSM",
      fit: "Loose Streetwear Fit",
      price: 1399,
      compareAtPrice: 1899,
      category: "tees",
      collection: "midnight-archive",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1684307524_2210452.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1684307524_5829670.jpg",
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Obsidian Black"],
      tags: ["the-souled-store", "anime", "naruto", "itachi", "oversized"],
      featured: false,
      newArrival: true,
      inStock: true,
      dropNumber: "DROP 02"
    },
    {
      id: "tss-m-05",
      slug: "solids-off-white-waffle-knit-t-shirt",
      name: "Solids: Off-White Textured Waffle T-Shirt",
      subtitle: "260 GSM Honeycomb Waffle Knit",
      description: "Engineered from 260 GSM heavy textured honeycomb waffle fabric. The dimensional waffle structure provides superior breathability, tactile hand-feel, and structured drape.",
      story: "Elevated minimal basic with luxurious waffle texture.",
      details: [
        "260 GSM Honeycomb Waffle Weave",
        "100% Breathable Cotton",
        "Slightly boxy relaxed body",
        "Reinforced collar binding"
      ],
      composition: "100% Cotton Waffle",
      gsm: "260 GSM Heavyweight",
      fit: "Relaxed Boxy Fit",
      price: 1299,
      compareAtPrice: 1699,
      category: "tees",
      collection: "after-hours-essentials",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1695208447_6782390.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1695208447_1893321.jpg",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Off-White", "Chalk Bone"],
      tags: ["the-souled-store", "waffle", "textured", "essentials"],
      featured: false,
      newArrival: true,
      inStock: true,
      dropNumber: "DROP 01"
    },
    {
      id: "tss-m-07",
      slug: "solids-textured-corduroy-overshirt",
      name: "Solids: Textured Corduroy Charcoal Overshirt",
      subtitle: "Heavy 8-Wale Cotton Corduroy",
      description: "Cut from heavy 8-wale 100% cotton corduroy. Features twin flap chest pockets with custom matte horn buttons, relaxed dropped shoulders, and a straight cut hem perfect for layering over tees.",
      story: "The quintessential transitional piece for chilly late night city commutes.",
      details: [
        "100% Pure Cotton 8-Wale Corduroy",
        "Dual utility flap chest pockets",
        "Matte horn button closure",
        "Relaxed overshirt profile built for layering",
        "Straight hem with side vents"
      ],
      composition: "100% Cotton Corduroy",
      gsm: "310 GSM",
      fit: "Relaxed Layering Overshirt",
      price: 1999,
      compareAtPrice: 2799,
      category: "outerwear",
      collection: "night-shift",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1697014493_7839210.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1697014493_1294820.jpg",
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Charcoal Grey", "Espresso Brown"],
      tags: ["the-souled-store", "shirts", "corduroy", "overshirt", "layering"],
      featured: true,
      newArrival: true,
      inStock: true,
      dropNumber: "DROP 03"
    },
    {
      id: "tss-m-08",
      slug: "cuban-collar-retro-abstract-resort-shirt",
      name: "TSS Originals: Cuban Collar Abstract Resort Shirt",
      subtitle: "Ultra-Flowy Rayon Camp Collar Shirt",
      description: "Crafted from silky, high-drape viscose rayon with an open camp Cuban collar. Decorated with an all-over brutalist abstract midnight pattern that moves effortlessly with every step.",
      story: "Retro Cuban silhouette tailored with contemporary dark minimalism.",
      details: [
        "100% Viscose Rayon Fabric",
        "Camp / Cuban open collar",
        "Lightweight, breathable drape",
        "Short sleeves with loose arm openings",
        "Seamless button placket"
      ],
      composition: "100% Premium Viscose Rayon",
      gsm: "160 GSM",
      fit: "Relaxed Resort Fit",
      price: 1499,
      compareAtPrice: 1999,
      category: "tees",
      collection: "new-after-dark",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1689248492_8918230.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1689248492_3491820.jpg",
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Monochrome Abstract", "Midnight Navy"],
      tags: ["the-souled-store", "shirts", "cuban-collar", "resort", "viscose"],
      featured: true,
      newArrival: false,
      inStock: true,
      dropNumber: "DROP 02"
    },
    {
      id: "tss-m-12",
      slug: "solids-heavyweight-380-gsm-zipper-hoodie",
      name: "Solids: Heavyweight 380 GSM Full-Zip Hoodie",
      subtitle: "Double-Layer Hood with Custom Metal Zip",
      description: "Engineered from 380 GSM ultra-dense brushed cotton fleece. Features a heavy-gauge gunmetal YKK two-way zipper, deep thermal double-layered hood without strings, and spacious kangaroo split pockets.",
      story: "Built to withstand the cold draft of late-night flyovers and dawn rooftop sessions.",
      details: [
        "380 GSM Double-Faced Cotton Fleece",
        "Heavy-duty gunmetal zipper closure",
        "Double-layered crossover hood",
        "Deep split kangaroo pocket",
        "Thick ribbed cuffs and hem"
      ],
      composition: "80% Cotton / 20% Polyester Fleece",
      gsm: "380 GSM Ultra Heavy",
      fit: "Structured Boxy Fit",
      price: 2499,
      compareAtPrice: 3499,
      category: "hoodies",
      collection: "night-shift",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696501928_8918230.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696501928_2391820.jpg",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      colors: ["Washed Charcoal", "Pitch Black"],
      tags: ["the-souled-store", "outerwear", "hoodies", "zipper-hoodie", "fleece"],
      featured: true,
      newArrival: false,
      inStock: true,
      dropNumber: "DROP 01"
    },
    {
      id: "tss-m-13",
      slug: "tss-originals-tactical-crinkle-bomber-jacket",
      name: "TSS Originals: Tactical Crinkle Nylon Bomber Jacket",
      subtitle: "DWR Water-Repellent Night Shell",
      description: "Built with high-density crinkle nylon with water-resistant DWR coating. Features a signature utility sleeve MA-1 zipper pocket, ribbed baseball bomber collar, and lightweight thermal diamond quilting.",
      story: "Modernized pilot bomber silhouette built for urban night transit.",
      details: [
        "Matte Crinkle Nylon Shell with DWR Coating",
        "MA-1 utility zipper pocket on left bicep",
        "Ribbed collar, cuffs, and hem",
        "Interior concealed chest passport pocket",
        "High-grade storm flap"
      ],
      composition: "100% Technical Nylon Shell",
      gsm: "220 GSM",
      fit: "Relaxed Bomber Profile",
      price: 2999,
      compareAtPrice: 4299,
      category: "outerwear",
      collection: "new-after-dark",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1698492019_6719283.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1698492019_1294829.jpg",
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Matte Black", "Military Olive"],
      tags: ["the-souled-store", "outerwear", "bomber", "jacket", "techwear"],
      featured: true,
      newArrival: true,
      inStock: true,
      dropNumber: "DROP 03"
    },
    {
      id: "tss-m-14",
      slug: "solids-varsity-monochrome-wool-blend-jacket",
      name: "Solids: Monochrome Varsity Letterman Jacket",
      subtitle: "Heavy Melange Body with Contrast Sleeves",
      description: "Classic American collegiate varsity jacket re-imagined with a dark monochrome aesthetic. Heavy wool-blend body with matte vegan leather sleeves, striped ribbing, and snap button closure.",
      story: "Subterranean collegiate aesthetic with bold athletic presence.",
      details: [
        "Heavy Wool-Blend Torso",
        "Matte Vegan Leather Sleeves",
        "Snap button front closure",
        "Dual welt handwarmer pockets",
        "Striped elasticated ribbing at neck and cuffs"
      ],
      composition: "60% Wool / 40% Poly (Sleeves: 100% PU)",
      gsm: "450 GSM",
      fit: "Athletic Boxy Fit",
      price: 3499,
      compareAtPrice: 4999,
      category: "outerwear",
      collection: "midnight-archive",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1699104921_7819203.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1699104921_3491829.jpg",
        "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black / White", "All-Black Obsidian"],
      tags: ["the-souled-store", "outerwear", "varsity", "jacket", "letterman"],
      featured: true,
      newArrival: true,
      inStock: true,
      dropNumber: "DROP 03"
    },
    {
      id: "tss-m-16",
      slug: "solids-washed-denim-trucker-jacket",
      name: "Solids: Washed Black Denim Trucker Jacket",
      subtitle: "13.5 Oz 100% Rigid Cotton Denim",
      description: "Classic American trucker jacket cut from 13.5 oz heavy rigid cotton denim. Hand-finished vintage wash with gunmetal shank buttons, button-flap chest pockets, and waist adjuster tabs.",
      story: "Indestructible denim built to age beautifully through years of wear.",
      details: [
        "13.5 oz Rigid Cotton Denim",
        "Custom engraved gunmetal shank buttons",
        "Twin flap chest pockets + welt waist pockets",
        "Adjustable button tabs at rear waist"
      ],
      composition: "100% Cotton Denim",
      gsm: "420 GSM",
      fit: "Classic Straight Trucker Fit",
      price: 2799,
      compareAtPrice: 3899,
      category: "outerwear",
      collection: "after-hours-essentials",
      images: [
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1694201928_7819203.jpg",
        "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1694201928_3491821.jpg",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Washed Black", "Vintage Indigo"],
      tags: ["the-souled-store", "denim", "trucker", "jacket", "outerwear"],
      featured: false,
      newArrival: true,
      inStock: true,
      dropNumber: "DROP 01"
    }
  ];

  // Combine both: Guilty Party + The Souled Store
  const combined = [...gpProducts, ...tssProducts];
  console.log(`Merged catalog total: ${combined.length} products (${gpProducts.length} Guilty Party + ${tssProducts.length} The Souled Store)`);

  const fileContent = `import { Product } from "@/lib/types";\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(combined, null, 2)};\n`;

  const targetPath = path.join(__dirname, "../src/data/products.ts");
  fs.writeFileSync(targetPath, fileContent, "utf8");
  console.log("Successfully updated products.ts with both Guilty Party and The Souled Store pieces!");
}

run().catch(console.error);
