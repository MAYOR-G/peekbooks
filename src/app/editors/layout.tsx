import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Meet Our Editors",
  description: "Our professional editors hold advanced degrees and have years of publishing experience across multiple academic and professional disciplines.",
  canonicalPath: "/editors",
});

export default function EditorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
