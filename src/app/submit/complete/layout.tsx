import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Submission Complete",
  description: "Confirmation page for completed manuscript submissions.",
  canonicalPath: "/submit/complete",
  noindex: true,
});

export default function SubmitCompleteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
