import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Our Services",
  description: "Comprehensive editing, proofreading, formatting, and transcription services to make your manuscript, business document, or CV publication-ready.",
  canonicalPath: "/services",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
