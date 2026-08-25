const https = require("https");

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", () => resolve(""));
  });
}

async function run() {
  const xml = await get("https://www.thesouledstore.com/sitemap.xml");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log("Total sitemap URLs:", locs.length);
  const sampleProducts = locs.filter(l => l.includes("/product/"));
  console.log("Sample product URLs:", sampleProducts.slice(0, 10));

  // Also check if any sitemap points to category feeds
  const sitemaps = locs.filter(l => l.includes(".xml"));
  console.log("Sub-sitemaps:", sitemaps);
}

run();
