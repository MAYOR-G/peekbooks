import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, Info, CheckCircle2, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";
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
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/blog/${post.slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
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
    "@type": "Article",
    "headline": post.title,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": post.author
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 w-full pt-32 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        
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
              className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-table:border-collapse prose-table:w-full prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-slate-200 prose-th:bg-slate-50 prose-th:p-4 prose-th:text-left prose-td:p-4 prose-td:border-t prose-td:border-slate-100"
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
