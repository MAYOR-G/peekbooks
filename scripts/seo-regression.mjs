#!/usr/bin/env node

const baseUrl = new URL(process.argv[2] || "http://127.0.0.1:3000");
const productionOrigin = "https://www.peekbookeditors.com";

const privateRoutes = ["/admin", "/login", "/submit/complete"];
const apiRoutes = [
  "/api/admin/login",
  "/api/admin/messages/example/attachments/example",
  "/api/admin/messages/example/reply",
  "/api/admin/submissions/example/download",
  "/api/admin/submissions/example/status",
  "/api/contact",
  "/api/manuscripts/analyze",
  "/api/paystack/webhook",
  "/api/submissions",
  "/api/submissions/verify",
];

function decodeHtml(value = "") {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(value = "") {
  return decodeHtml(value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"));
  return match ? decodeHtml(match[1]) : "";
}

function getMeta(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) =>
    [getAttribute(candidate, "name"), getAttribute(candidate, "property")]
      .map((value) => value.toLowerCase())
      .includes(name.toLowerCase()),
  );
  return tag ? getAttribute(tag, "content") : "";
}

function getLink(html, rel) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) =>
    getAttribute(candidate, "rel").toLowerCase().split(/\s+/).includes(rel),
  );
  return tag ? getAttribute(tag, "href") : "";
}

function parseSchemas(html) {
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const types = [];
  const errors = [];
  for (const [, source] of scripts) {
    try {
      const value = JSON.parse(decodeHtml(source));
      const nodes = Array.isArray(value) ? value : [value];
      for (const node of nodes) {
        if (node && node["@type"]) types.push(String(node["@type"]));
      }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }
  return { types, errors };
}

function parsePage(pathname, status, html, sitemapIncluded) {
  const title = stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => stripTags(match[1]));
  const anchors = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)]
    .map((match) => decodeHtml(match[1]))
    .filter((href) => href.startsWith("/") && !href.startsWith("//"));
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const missingAlt = images.filter((tag) => !/\balt=["'][^"']*["']/i.test(tag)).length;
  const schemas = parseSchemas(html);
  const robots = getMeta(html, "robots");
  const canonical = getLink(html, "canonical");
  const expectedCanonical = `${productionOrigin}${pathname === "/" ? "" : pathname}`;

  return {
    pathname,
    status,
    sitemapIncluded,
    title,
    description: getMeta(html, "description"),
    canonical,
    expectedCanonical,
    robots,
    h1s,
    internalLinks: new Set(anchors).size,
    anchors,
    schemaTypes: schemas.types,
    schemaErrors: schemas.errors,
    missingAlt,
    initialTextLength: stripTags(html.replace(/<script\b[\s\S]*?<\/script>/gi, "")).length,
  };
}

async function fetchText(pathname, options) {
  const url = new URL(pathname, baseUrl);
  const response = await fetch(url, { redirect: "manual", ...options });
  return { response, text: await response.text() };
}

async function main() {
  const sitemapResponse = await fetchText("/sitemap.xml");
  if (sitemapResponse.response.status !== 200) {
    throw new Error(`sitemap.xml returned ${sitemapResponse.response.status}`);
  }

  const sitemapPaths = [...sitemapResponse.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    return url.pathname || "/";
  });
  const duplicateSitemapPaths = sitemapPaths.filter((path, index) => sitemapPaths.indexOf(path) !== index);
  const pages = [];

  for (const pathname of sitemapPaths) {
    const { response, text } = await fetchText(pathname);
    pages.push(parsePage(pathname, response.status, text, true));
  }

  for (const pathname of privateRoutes) {
    if (sitemapPaths.includes(pathname)) continue;
    const { response, text } = await fetchText(pathname);
    pages.push(parsePage(pathname, response.status, text, false));
  }

  const allPublicPaths = new Set(sitemapPaths);
  const linkedPaths = new Set(
    pages
      .filter((page) => page.sitemapIncluded)
      .flatMap((page) => page.anchors)
      .map((href) => new URL(href, baseUrl).pathname)
      .filter((pathname) => !pathname.startsWith("/api/")),
  );
  const brokenLinks = [];
  for (const pathname of linkedPaths) {
    if (allPublicPaths.has(pathname) || privateRoutes.includes(pathname)) continue;
    const { response } = await fetchText(pathname);
    if (response.status >= 400) brokenLinks.push({ pathname, status: response.status });
  }

  const apiResults = [];
  for (const pathname of apiRoutes) {
    const { response } = await fetchText(pathname);
    apiResults.push({
      pathname,
      status: response.status,
      cacheControl: response.headers.get("cache-control") || "",
      xRobotsTag: response.headers.get("x-robots-tag") || "",
    });
  }

  const errors = [];
  for (const page of pages) {
    const isPrivate = privateRoutes.includes(page.pathname);
    if (page.status !== 200) errors.push(`${page.pathname}: expected 200, got ${page.status}`);
    if (!page.title) errors.push(`${page.pathname}: missing title`);
    if (!page.description) errors.push(`${page.pathname}: missing description`);
    if (page.h1s.length !== 1) errors.push(`${page.pathname}: expected one H1, got ${page.h1s.length}`);
    if (page.schemaErrors.length) errors.push(`${page.pathname}: invalid JSON-LD`);
    if (page.missingAlt) errors.push(`${page.pathname}: ${page.missingAlt} image(s) missing alt`);
    if (isPrivate) {
      if (!/noindex/i.test(page.robots)) errors.push(`${page.pathname}: private route is not noindex`);
      if (page.sitemapIncluded) errors.push(`${page.pathname}: private/noindex route is in sitemap`);
    } else {
      if (page.canonical !== page.expectedCanonical) {
        errors.push(`${page.pathname}: canonical ${page.canonical || "missing"} != ${page.expectedCanonical}`);
      }
      if (/noindex/i.test(page.robots)) errors.push(`${page.pathname}: public route is noindex`);
      if (page.initialTextLength < 250) errors.push(`${page.pathname}: thin initial HTML (${page.initialTextLength} chars)`);
    }
  }

  if (duplicateSitemapPaths.length) errors.push(`duplicate sitemap paths: ${duplicateSitemapPaths.join(", ")}`);
  for (const link of brokenLinks) errors.push(`broken internal link: ${link.pathname} (${link.status})`);
  for (const route of apiResults) {
    if (/public/i.test(route.cacheControl)) errors.push(`${route.pathname}: API cache policy is public`);
    if (!/noindex/i.test(route.xRobotsTag)) errors.push(`${route.pathname}: API missing X-Robots-Tag noindex`);
  }

  console.log(JSON.stringify({
    baseUrl: baseUrl.href,
    sitemapStatus: sitemapResponse.response.status,
    sitemapUrlCount: sitemapPaths.length,
    duplicateSitemapPaths,
    pages,
    brokenLinks,
    apiResults,
    errors,
  }, null, 2));

  if (errors.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
