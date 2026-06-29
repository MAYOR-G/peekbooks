import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
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
            <header className="mb-10 text-center sm:text-left">
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

            <div 
              className="prose prose-lg max-w-none text-foreground/80 prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
