const https = require("https");

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        resolve({ status: res.statusCode, length: data.length, snippet: data.slice(0, 300) });
      });
    }).on("error", (e) => resolve({ error: e.message }));
  });
}

async function run() {
  const endpoints = [
    "https://www.thesouledstore.com/api/v2/products/men/t-shirts",
    "https://api.thesouledstore.com/api/v2/products",
    "https://prod-api.thesouledstore.com/api/v2/products",
    "https://www.thesouledstore.com/api/v1/products?category=t-shirts",
    "https://www.thesouledstore.com/api/v2/category/men/t-shirts",
    "https://www.thesouledstore.com/api/v2/category/products?category=t-shirts&gender=men",
    "https://www.thesouledstore.com/sitemap.xml",
    "https://www.thesouledstore.com/robots.txt"
  ];

  for (const ep of endpoints) {
    const res = await testUrl(ep);
    console.log(ep, res.status, res.length, res.snippet?.slice(0, 100));
  }
}

run();
