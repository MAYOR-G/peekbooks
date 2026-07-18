const siteOrigin = "https://www.peekbookeditors.com";
const key = "1fe4032eec84a6277c8816ba4ce2fcd8";
const rawTargets = process.argv.slice(2);

if (rawTargets.length === 0) {
  console.error("Pass one or more newly published or materially changed paths/URLs.");
  console.error("Example: npm run indexnow -- /thesis-editing /blog/how-long-does-thesis-proofreading-take");
  process.exit(1);
}

if (rawTargets.length > 10_000) {
  throw new Error("IndexNow accepts at most 10,000 URLs in one request.");
}

const urlList = [...new Set(rawTargets.map((target) => {
  const url = new URL(target, siteOrigin);
  if (url.origin !== siteOrigin) {
    throw new Error(`Refusing a URL outside ${siteOrigin}: ${target}`);
  }
  url.hash = "";
  return url.toString();
}))];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "www.peekbookeditors.com",
    key,
    keyLocation: `${siteOrigin}/${key}.txt`,
    urlList,
  }),
  signal: AbortSignal.timeout(15_000),
});

if (!response.ok) {
  const detail = await response.text();
  throw new Error(`IndexNow returned ${response.status}: ${detail || response.statusText}`);
}

console.log(`IndexNow accepted ${urlList.length} URL${urlList.length === 1 ? "" : "s"} (${response.status}).`);
