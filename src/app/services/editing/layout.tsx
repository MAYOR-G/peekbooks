import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Editing and Proofreading Services",
  description: "Professional human editing and proofreading for academic papers, dissertations, theses, manuscripts, business documents, CVs, and authors.",
  canonicalPath: "/services/editing",
  keywords: ["editing services", "proofreading services", "academic editing", "business document editing", "manuscript editing"],
});

export default function EditingServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
