import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Us",
  description: "Get in touch with Peekbooks for any questions regarding our editing and proofreading services. Our support team is ready to assist you.",
  canonicalPath: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Peekbooks Editing and Proofreading",
    "image": "https://www.peekbookeditors.com/icon.svg",
    "@id": "https://www.peekbookeditors.com",
    "url": "https://www.peekbookeditors.com",
    "telephone": "+44 7305 605459",
    "email": "support@send.peekbookeditors.com",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "2/2 19 Dunphail Drive",
        "addressLocality": "Glasgow",
        "postalCode": "G34 0DB",
        "addressCountry": "UK"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "1270 Hardin City Rd",
        "addressLocality": "East Lansing",
        "addressRegion": "Michigan",
        "addressCountry": "US"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  );
}
