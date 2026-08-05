import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogListing } from "@/components/blog/blog-listing";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { getAllBlogPosts, getBlogPageCount, paginateBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const totalPages = getBlogPageCount(posts);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = Number((await params).page);
  return buildPageMetadata({
    title: `Editing and Proofreading Blog - Page ${page}`,
    description: `Page ${page} of the PeekBooks Editors blog archive, with practical guides for editing, proofreading, academic writing, manuscripts, CVs and business documents.`,
    canonicalPath: `/blog/page/${page}`,
  });
}

export default async function BlogPageArchive({ params }: Props) {
  const page = Number((await params).page);
  const posts = await getAllBlogPosts();
  const totalPages = getBlogPageCount(posts);

  if (!Number.isInteger(page) || page < 2 || page > totalPages) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <section className="relative overflow-hidden border-b border-white/10 bg-primary pb-20 pt-24">
          <div className="absolute inset-0 bg-white/5 opacity-10 mix-blend-overlay" />
          <div className="absolute right-0 top-0 h-full w-1/2 rounded-bl-full bg-linear-to-bl from-white/5 to-transparent blur-3xl pointer-events-none" />
          <Container className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="max-w-4xl space-y-4">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                The PeekBooks Editors Blog
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-snug text-white/80 sm:text-xl md:text-2xl">
                Editing and proofreading guides, page {page}.
              </p>
            </div>
          </Container>
        </section>
        <section className="bg-background py-24 sm:py-32">
          <Container>
            <BlogListing
              posts={paginateBlogPosts(posts, page)}
              currentPage={page}
              totalPages={totalPages}
              basePath="/blog"
              allPosts={posts}
              heading={`Blog archive page ${page}`}
              intro="Older practical guides remain available through crawlable paginated archive pages."
            />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
