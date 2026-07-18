import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Info, CheckCircle2, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { buildPageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";
import { BRAND_NAME, PRODUCTION_SITE_URL } from "@/lib/site";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return buildPageMetadata({ title: "Post Not Found", description: "This post could not be found." });
  }

  return buildPageMetadata({
    title: post.seoTitle,
    description: post.metaDescription || post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    keywords: post.tags,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.heroImage ? [
        {
          url: post.heroImage,
          width: 1536,
          height: 864,
          alt: post.heroImageAlt || post.title,
        },
      ] : undefined,
    },
  });
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${PRODUCTION_SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.updated).toISOString(),
    mainEntityOfPage: `${PRODUCTION_SITE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      "@id": `${PRODUCTION_SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: PRODUCTION_SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${PRODUCTION_SITE_URL}/icon.svg`,
      },
    },
    image: post.heroImage ? {
      "@type": "ImageObject",
      url: `${PRODUCTION_SITE_URL}${post.heroImage}`,
      caption: post.heroImageAlt || post.title,
    } : undefined,
  };
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);
  const faqSchema = post.faqs?.length ? generateFAQSchema(post.faqs) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 w-full pt-32 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {faqSchema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        ) : null}
        
        <Container className="max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-primary mb-8 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <article>
            <header className="mb-12 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-muted-foreground mb-6">
                <time dateTime={post.date} className="flex items-center">
                  <Calendar className="mr-1.5 h-4 w-4" />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </time>
                <time dateTime={post.updated} className="flex items-center">
                  Updated {new Date(post.updated).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </time>
                <div className="flex items-center">
                  <Clock className="mr-1.5 h-4 w-4" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <User className="mr-1.5 h-4 w-4" />
                  {post.author}
                </div>
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                {post.title}
              </h1>
            </header>

            {post.heroImage ? (
              <div className="relative mb-14 aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <Image
                  src={post.heroImage}
                  alt={post.heroImageAlt || post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            ) : null}

            {/* Premium Summary Box */}
            {post.summary && post.summary.length > 0 && (
              <div className="mb-14 bg-slate-50 border border-slate-100 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-foreground m-0">Executive Summary</h2>
                </div>
                <ul className="space-y-4 m-0 p-0 list-none">
                  {post.summary.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 leading-relaxed text-lg">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div 
              className="max-w-none text-[1.05rem] leading-8 text-slate-700 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary/80 [&_blockquote]:my-8 [&_blockquote]:rounded-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-primary/5 [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-medium [&_blockquote]:text-foreground [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_li]:mb-2 [&_li]:pl-1 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-5 [&_p]:text-slate-700 [&_strong]:font-bold [&_strong]:text-foreground [&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:rounded-2xl [&_table]:border [&_table]:border-slate-200 [&_table]:bg-white [&_table]:text-sm [&_tbody_tr:nth-child(even)]:bg-slate-50/70 [&_td]:min-w-40 [&_td]:border-t [&_td]:border-slate-100 [&_td]:p-4 [&_td]:align-top [&_th]:min-w-40 [&_th]:bg-primary/8 [&_th]:p-4 [&_th]:text-left [&_th]:font-bold [&_th]:text-foreground [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Interactive FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-foreground m-0">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-4">
                  {post.faqs.map((faq, idx) => (
                    <details 
                      key={idx} 
                      className="group bg-white border border-slate-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-lg hover:bg-slate-50 transition-colors">
                        {faq.question}
                        <span className="transition-transform duration-300 group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                      </summary>
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 mt-2">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
