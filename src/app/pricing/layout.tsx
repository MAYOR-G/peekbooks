import { buildPageMetadata, generateFAQSchema } from "@/lib/seo";

const pricingFaqs = [
  {
    question: "How is the estimate calculated?",
    answer: "The estimate uses your selected service, confirmed word count, and turnaround window. The final quote is confirmed during submission after the manuscript details are reviewed.",
  },
  {
    question: "Why do large documents require custom review?",
    answer: "Documents above 50,000 words can vary widely in scope, structure, and timeline. PeekBooks Editors reviews those projects manually so the quote and schedule are realistic.",
  },
  {
    question: "When and how do I pay?",
    answer: "Payment is completed after you submit your manuscript and confirm your quote. Work begins after payment is confirmed.",
  },
  {
    question: "Can I choose more than one service?",
    answer: "Yes. The submit manuscript flow allows combined services such as editing with formatting or translation with proofreading.",
  },
];

export const metadata = buildPageMetadata({
  title: "Editing and Proofreading Pricing",
  description: "Estimate editing, proofreading, formatting, translation, CV, academic, and business document pricing by service, word count, and turnaround.",
  canonicalPath: "/pricing",
  keywords: ["editing pricing", "proofreading cost", "academic proofreading cost", "manuscript editing quote"],
});

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(pricingFaqs);

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
