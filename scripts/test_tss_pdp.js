const https = require("https");

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", () => resolve(""));
  });
}

async function run() {
  const html = await get("https://www.thesouledstore.com/product/solids-black-tshirt");
  // Check for JSON-LD schema
  const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi) || [];
  console.log("JSON-LD scripts found:", jsonLd.length);
  jsonLd.forEach((j, i) => console.log(`LD ${i}:`, j.slice(0, 300)));

  // Check for og tags
  const ogTitle = html.match(/<meta property="og:title" content="([^"]*)"/i)?.[1];
  const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/i)?.[1];
  const ogDesc = html.match(/<meta property="og:description" content="([^"]*)"/i)?.[1];
  console.log({ ogTitle, ogImage, ogDesc });
}

run();
