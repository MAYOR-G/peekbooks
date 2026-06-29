import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Editing & Proofreading Services",
  description: "Professional editing and proofreading services for academic papers, business documents, and authors. Ensure your manuscript is polished and publication-ready.",
  canonicalPath: "/services/editing",
});

export default function EditingServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
