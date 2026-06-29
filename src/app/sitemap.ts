import { MetadataRoute } from "next";
import { PRODUCTION_SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/pricing", "/editors", "/contact", "/blog"].map((route) => ({
    url: `${PRODUCTION_SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add individual services to sitemap
  // The slugs are derived from the services available in the site
  const serviceSlugs = [
    "proofreading",
    "editing",
    "academic-editing",
    "business-editing",
    "formatting",
    "translation",
    "transcribing",
    "writing-support",
    "cv-resume",
    "copywriting"
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${PRODUCTION_SITE_URL}/services/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
