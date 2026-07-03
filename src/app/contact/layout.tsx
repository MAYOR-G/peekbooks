import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact PeekBooks Editors",
  description: "Contact PeekBooks Editors for editing, proofreading, pricing, submission, turnaround, confidentiality, and document support questions.",
  canonicalPath: "/contact",
  keywords: ["contact PeekBooks Editors", "editing support", "proofreading enquiry", "manuscript editing contact"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "PeekBooks Editors",
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
