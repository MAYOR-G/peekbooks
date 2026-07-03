import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Meet the Editors",
  description: "Meet the human editors supporting academic manuscripts, business documents, CVs, theses, dissertations, and professional writing.",
  canonicalPath: "/editors",
  keywords: ["professional editors", "academic editors", "human proofreaders", "manuscript editors"],
});

export default function EditorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
