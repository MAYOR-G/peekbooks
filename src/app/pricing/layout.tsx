import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Editing and Proofreading Pricing",
  description: "Estimate editing, proofreading, formatting, translation, CV, academic, and business document pricing by service, word count, and turnaround.",
  canonicalPath: "/pricing",
  keywords: ["editing pricing", "proofreading cost", "academic proofreading cost", "manuscript editing quote"],
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is the estimate calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The estimate uses your selected service, confirmed word count, and turnaround window. The final quote is confirmed during submission after the manuscript details are reviewed."
        }
      },
      {
        "@type": "Question",
        "name": "Why do large documents require custom review?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Documents above 50,000 words can vary widely in scope, structure, and timeline. Peekbooks reviews those projects manually so the quote and schedule are realistic."
        }
      },
      {
        "@type": "Question",
        "name": "When and how do I pay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Payment is completed after you submit your manuscript and confirm your quote. Work begins after payment is confirmed."
        }
      },
      {
        "@type": "Question",
        "name": "Can I choose more than one service?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The submit manuscript flow allows combined services such as editing with formatting or translation with proofreading."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
