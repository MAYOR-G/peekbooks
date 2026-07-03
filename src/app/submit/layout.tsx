import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Submit Manuscript for Editing or Proofreading",
  description: "Securely submit your manuscript, thesis, dissertation, business document, CV, or journal paper for professional human editing and proofreading.",
  canonicalPath: "/submit",
  keywords: ["submit manuscript", "editing submission", "proofreading quote", "secure manuscript upload"],
});

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
