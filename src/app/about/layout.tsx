import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Us",
  description: "Learn about Peekbooks Editing and Proofreading. Our expert team combines years of publishing experience to make every document publication-worthy.",
  canonicalPath: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
