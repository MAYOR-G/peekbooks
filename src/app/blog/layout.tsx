import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Blog",
  description: "Insights, guides, and tips on academic writing, proofreading, and publishing from the expert editors at Peekbooks.",
  canonicalPath: "/blog",
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
