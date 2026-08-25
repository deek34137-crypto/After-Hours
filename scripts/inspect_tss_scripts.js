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
  const html = await get("https://www.thesouledstore.com/");
  const scriptTags = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]);
  console.log("Homepage script tags:", scriptTags);

  // Look for inline JS containing api config
  const inlineScripts = [...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  console.log("Inline scripts count:", inlineScripts.length);
  for (const js of inlineScripts) {
    if (js.includes("http") || js.includes("api") || js.includes("config") || js.includes("window.")) {
      console.log("Interesting inline JS snippet:", js.slice(0, 300));
    }
  }
}

run();
