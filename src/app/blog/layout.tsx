import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Editing and Proofreading Blog",
  description: "Read 2026 guides on dissertation proofreading, thesis editing, academic proofreading cost, journal manuscripts, grammar, and readability.",
  canonicalPath: "/blog",
  keywords: ["editing blog", "proofreading blog", "academic writing guides", "dissertation proofreading checklist"],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
