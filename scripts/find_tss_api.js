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
  const html = await get("https://www.thesouledstore.com/men/t-shirts");
  const scripts = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  console.log("Found scripts:", scripts);

  for (const s of scripts.slice(0, 5)) {
    const scriptUrl = s.startsWith("http") ? s : "https://www.thesouledstore.com" + s;
    const js = await get(scriptUrl);
    const apiMatches = js.match(/https?:\/\/[a-zA-Z0-9.-]+\/api\/[^\s"']+/g) || [];
    const endpoints = js.match(/["'](\/api\/[^"']+)["']/g) || [];
    console.log(scriptUrl, "API Matches:", apiMatches.slice(0, 5), "Endpoints:", endpoints.slice(0, 5));
  }
}

run();
