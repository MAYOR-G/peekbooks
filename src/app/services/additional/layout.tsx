import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Additional Services",
  description: "Explore our additional services including formatting, transcription, translation, and copywriting to support your publication and business needs.",
  canonicalPath: "/services/additional",
});

export default function AdditionalServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
