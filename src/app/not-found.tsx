import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Page Not Found",
  description: "The requested PeekBooks Editors page could not be found.",
  canonicalPath: null,
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center py-32">
        <Container className="max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">404</p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-foreground">Page not found</h1>
          <p className="mt-4 text-muted-foreground">
            The page may have moved, or the address may be incorrect. You can return home, review services, or submit a document for editing.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild><Link href="/">Home</Link></Button>
            <Button variant="outline" asChild><Link href="/services/editing">Editing services</Link></Button>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
