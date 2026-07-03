import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About PeekBooks Editors",
  description: "Learn how PeekBooks Editors supports academic, business, author, and professional documents with confidential human editing and quality assurance.",
  canonicalPath: "/about",
  keywords: ["about PeekBooks Editors", "human editing team", "professional proofreaders", "editorial quality assurance"],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
