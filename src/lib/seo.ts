import { Metadata } from "next";
import { BRAND_NAME, PRODUCTION_SITE_URL, SITE_CONTACT } from "./site";

interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath?: string | null;
  keywords?: string[];
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
      url: `${PRODUCTION_SITE_URL}/service-image.png`,
      width: 1200,
      height: 800,
      alt: `${BRAND_NAME} - Professional Editing and Proofreading`,
    },
  ];

  return {
    title: {
      default: title,
      template: `%s | ${BRAND_NAME}`,
    },
    description,
    alternates: canonicalPath === null ? undefined : { canonical: url },
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
    "@id": `${PRODUCTION_SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: PRODUCTION_SITE_URL,
    logo: `${PRODUCTION_SITE_URL}/icon.svg`,
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
    "@id": `${PRODUCTION_SITE_URL}/#website`,
    name: BRAND_NAME,
    url: PRODUCTION_SITE_URL,
    publisher: {
      "@id": `${PRODUCTION_SITE_URL}/#organization`,
    },
  };
}

export function generateProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${PRODUCTION_SITE_URL}/#professional-service`,
    name: BRAND_NAME,
    url: PRODUCTION_SITE_URL,
    image: `${PRODUCTION_SITE_URL}/service-image.png`,
    telephone: SITE_CONTACT.phone,
    email: SITE_CONTACT.publicEmail,
    priceRange: "$$",
    areaServed: ["GB", "US", "Worldwide"],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "2/2 19 Dunphail Drive",
        addressLocality: "Glasgow",
        postalCode: "G34 0DB",
        addressCountry: "GB",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "1270 Hardin City Rd",
        addressLocality: "East Lansing",
        addressRegion: "MI",
        addressCountry: "US",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Mary Jane" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "I am very pleased providing my thesis to PeekBooks Editors. They fixed all the awkward phrasing and made my research shine.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Prof. Patel" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "The language review made our submission clearer and easier to follow. The editor’s comments were specific, practical, and respectful of the research.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Dr. L. Smith" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "The team at PeekBooks Editors is exceptional. Their two-editor quality check discovered nuances I missed in my own data.",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Editing and proofreading services",
      itemListElement: [
        "Dissertation proofreading",
        "Thesis proofreading",
        "Academic editing",
        "Manuscript editing",
        "Journal paper editing",
        "CV editing",
        "Business document editing",
      ].map((name) => ({
        "@type": "Offer",
        priceCurrency: "USD",
        price: "45.00",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${PRODUCTION_SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateServiceSchema({
  name,
  description,
  path,
  areaServed = ["GB", "US", "Worldwide"],
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${PRODUCTION_SITE_URL}${path}#service`,
    name,
    description,
    provider: {
      "@id": `${PRODUCTION_SITE_URL}/#organization`,
    },
    areaServed,
    serviceType: name,
    url: `${PRODUCTION_SITE_URL}${path}`,
  };
}
