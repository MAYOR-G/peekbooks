import { MetadataRoute } from "next";
import { PRODUCTION_SITE_URL } from "@/lib/site";
import { getAllBlogPosts } from "@/lib/blog";
import { SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/about", "/services", "/pricing", "/editors", "/contact", "/submit", "/blog", "/privacy", "/terms"].map((route) => ({
    url: `${PRODUCTION_SITE_URL}${route}`,
  }));

  const serviceSlugs = [
    "editing",
    "additional"
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${PRODUCTION_SITE_URL}/services/${slug}`,
  }));

  const posts = await getAllBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${PRODUCTION_SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated).toISOString().split("T")[0],
  }));

  const seoLandingRoutes = SEO_LANDING_PAGES.map((page) => ({
    url: `${PRODUCTION_SITE_URL}/${page.slug}`,
  }));

  return [...routes, ...serviceRoutes, ...seoLandingRoutes, ...blogRoutes];
}
