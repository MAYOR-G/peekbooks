import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Editing, Proofreading, and Document Services",
  description: "Explore academic editing, manuscript proofreading, business editing, formatting, translation, CV editing, and additional document services.",
  canonicalPath: "/services",
  keywords: ["editing services", "proofreading services", "document editing", "manuscript proofreading"],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
