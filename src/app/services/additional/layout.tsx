import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Additional Editing Support Services",
  description: "Explore express editing, manuscript formatting, academic translation, transcription, and writing support for publication and professional documents.",
  canonicalPath: "/services/additional",
  keywords: ["manuscript formatting", "express proofreading", "academic translation", "additional editing services"],
});

export default function AdditionalServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
