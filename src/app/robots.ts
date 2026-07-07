import { MetadataRoute } from "next";
import { PRODUCTION_SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/login/", "/api/"],
      },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "ChatGPT-User"],
        allow: "/",
      },
      {
        userAgent: ["CCBot", "Bytespider"],
        disallow: "/",
      }
    ],
    sitemap: `${PRODUCTION_SITE_URL}/sitemap.xml`,
  };
}
