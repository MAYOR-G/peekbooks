import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact PeekBooks Editors",
  description: "Contact PeekBooks Editors for editing, proofreading, pricing, submission, turnaround, confidentiality, and document support questions.",
  canonicalPath: "/contact",
  keywords: ["contact PeekBooks Editors", "editing support", "proofreading enquiry", "manuscript editing contact"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
