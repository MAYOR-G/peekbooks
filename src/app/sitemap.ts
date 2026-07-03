import { MetadataRoute } from "next";
import { PRODUCTION_SITE_URL } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/blog";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/services", "/pricing", "/editors", "/contact", "/submit", "/blog", "/privacy", "/terms"].map((route) => ({
    url: `${PRODUCTION_SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const serviceSlugs = [
    "editing",
    "additional"
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${PRODUCTION_SITE_URL}/services/${slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const posts = await getAllBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${PRODUCTION_SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated).toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const seoLandingRoutes = SEO_LANDING_PAGES.map((page) => ({
    url: `${PRODUCTION_SITE_URL}/${page.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  return [...routes, ...serviceRoutes, ...seoLandingRoutes, ...blogRoutes];
}
