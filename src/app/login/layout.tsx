import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Login",
  description: "Private login area.",
  canonicalPath: "/login",
  noindex: true,
});

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
