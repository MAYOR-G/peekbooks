import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from "lucide-react";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Container } from "@/components/layouts/container";
import { Button } from "@/components/ui/button";
import { buildPageMetadata, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/lib/seo";
import { getSeoLandingPage, SEO_LANDING_PAGES } from "@/lib/seo-landing-pages";

interface Props {
  params: Promise<{ seoSlug: string }>;
}

export function generateStaticParams() {
  return SEO_LANDING_PAGES.map((page) => ({ seoSlug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params;
  const page = getSeoLandingPage(seoSlug);

  if (!page) {
    return buildPageMetadata({
      title: "Page Not Found",
      description: "This page could not be found.",
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    canonicalPath: `/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function SeoLandingPage({ params }: Props) {
  const { seoSlug } = await params;
  const page = getSeoLandingPage(seoSlug);

  if (!page) {
    notFound();
  }

  const path = `/${page.slug}`;
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.title, path },
    ]),
    generateServiceSchema({
      name: page.title,
      description: page.metaDescription,
      path,
    }),
    generateFAQSchema(page.faqs),
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-28">
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <section className="relative overflow-hidden bg-primary pb-20 pt-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.18),transparent_34%)]" />
          <Container className="relative z-10 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-4xl space-y-6">
              <nav aria-label="Breadcrumb" className="text-sm text-white/70">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">/</span>
                <span>{page.title}</span>
              </nav>
              <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {page.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-white/82">
                {page.intro}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/submit">Submit your document</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                  <Link href="/pricing">Check pricing</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/64">
                Best for
              </p>
              <p className="mt-3 text-base leading-7 text-white/86">{page.audience}</p>
            </div>
          </Container>
        </section>

        <section className="bg-white py-20">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/8 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <ShieldCheck className="h-3.5 w-3.5" />
                Human editing
              </span>
              <h2 className="mt-5 font-serif text-3xl font-bold text-foreground">
                What this service helps you improve
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Each project is reviewed against your document type, audience, and submission requirements. The result is cleaner writing with fewer distractions for readers, reviewers, examiners, or clients.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {page.benefits.map((benefit) => (
                <div key={benefit} className="rounded-2xl border border-border/70 bg-slate-50 p-5">
                  <CheckCircle2 className="mb-4 h-5 w-5 text-primary" />
                  <p className="text-sm leading-6 text-foreground/78">{benefit}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-y border-border/50 bg-slate-50 py-20">
          <Container className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              {page.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-serif text-2xl font-bold text-foreground">{section.heading}</h2>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">{section.body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-foreground">How the process works</h2>
              <ol className="mt-6 space-y-5">
                {page.process.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="bg-white py-20">
          <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">Who it is for</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {page.whoFor.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-border/70 p-4">
                    <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm leading-6 text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-primary p-7 text-white">
              <h2 className="font-serif text-2xl font-bold">Turnaround and pricing</h2>
              <p className="mt-3 text-sm leading-7 text-white/78">
                Pricing depends on word count, service level, document complexity, and turnaround. Use the pricing calculator for a quick estimate, or submit the document for confirmation.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/pricing">View pricing</Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white" asChild>
                  <Link href="/contact">Ask a question</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-y border-border/50 bg-slate-50 py-20">
          <Container className="max-w-4xl">
            <h2 className="text-center font-serif text-3xl font-bold text-foreground">
              Frequently asked questions
            </h2>
            <div className="mt-10 space-y-4">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-border/70 bg-white p-6">
                  <summary className="cursor-pointer list-none font-semibold text-foreground">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white py-20">
          <Container className="grid gap-8 lg:grid-cols-2">
            <LinkPanel title="Related services" links={page.relatedServices} />
            <LinkPanel title="Related reading" links={page.relatedPosts} />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function LinkPanel({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-slate-50 p-6">
      <h2 className="font-serif text-2xl font-bold text-foreground">{title}</h2>
      <div className="mt-5 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
          >
            {link.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
