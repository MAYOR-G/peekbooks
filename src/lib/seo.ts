import { Metadata } from "next";
import { BRAND_NAME, PRODUCTION_SITE_URL } from "./site";

interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  openGraph?: {
    images?: Array<{ url: string; width: number; height: number; alt: string }>;
    type?: "website" | "article";
    publishedTime?: string;
    authors?: string[];
  };
  noindex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  canonicalPath,
  openGraph,
  noindex = false,
}: PageSEOProps): Metadata {
  const url = canonicalPath
    ? `${PRODUCTION_SITE_URL}${canonicalPath === "/" ? "" : canonicalPath}`
    : PRODUCTION_SITE_URL;

  const defaultOgImages = [
    {
      url: `${PRODUCTION_SITE_URL}/og-image.jpg`, // Default OG Image placeholder
      width: 1200,
      height: 630,
      alt: `${BRAND_NAME} - Professional Editing and Proofreading`,
    },
  ];

  return {
    title: {
      default: title,
      template: `%s | ${BRAND_NAME}`,
    },
    description,
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: title.includes(BRAND_NAME) ? title : `${title} | ${BRAND_NAME}`,
      description,
      url,
      siteName: BRAND_NAME,
      images: openGraph?.images || defaultOgImages,
      type: openGraph?.type || "website",
      locale: "en_US",
      publishedTime: openGraph?.publishedTime,
      authors: openGraph?.authors,
    },
    twitter: {
      card: "summary_large_image",
      title: title.includes(BRAND_NAME) ? title : `${title} | ${BRAND_NAME}`,
      description,
      images: openGraph?.images || defaultOgImages,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/peekbooks-favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon.svg",
      apple: "/peekbooks-favicon.svg",
    },
    metadataBase: new URL(PRODUCTION_SITE_URL),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: PRODUCTION_SITE_URL,
    logo: `${PRODUCTION_SITE_URL}/icon.svg`,
    sameAs: [
      // Add social links here if available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44 7305 605459",
      contactType: "customer support",
      email: "support@send.peekbookeditors.com",
      areaServed: ["GB", "US"],
      availableLanguage: "English",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: PRODUCTION_SITE_URL,
  };
}
