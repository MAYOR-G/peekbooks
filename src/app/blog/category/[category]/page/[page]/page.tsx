import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogListing } from "@/components/blog/blog-listing";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { getAllBlogPosts, getBlogCategories, getBlogPageCount, paginateBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ category: string; page: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return getBlogCategories(posts).flatMap((category) => {
    const totalPages = getBlogPageCount(category.posts);
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({
      category: category.slug,
      page: String(index + 2),
    }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, page: pageParam } = await params;
  const posts = await getAllBlogPosts();
  const category = getBlogCategories(posts).find((item) => item.slug === categorySlug);
  const page = Number(pageParam);

  if (!category) {
    return buildPageMetadata({ title: "Blog Category Not Found", description: "This blog category could not be found.", noindex: true });
  }

  return buildPageMetadata({
    title: `${category.name} Articles - Page ${page}`,
    description: `Page ${page} of PeekBooks Editors guides about ${category.name.toLowerCase()}.`,
    canonicalPath: `/blog/category/${category.slug}/page/${page}`,
  });
}

export default async function BlogCategoryArchivePage({ params }: Props) {
  const { category: categorySlug, page: pageParam } = await params;
  const page = Number(pageParam);
  const posts = await getAllBlogPosts();
  const category = getBlogCategories(posts).find((item) => item.slug === categorySlug);

  if (!category) {
    notFound();
  }

  const totalPages = getBlogPageCount(category.posts);
  if (!Number.isInteger(page) || page < 2 || page > totalPages) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <section className="relative overflow-hidden border-b border-white/10 bg-primary pb-20 pt-24">
          <div className="absolute inset-0 bg-white/5 opacity-10 mix-blend-overlay" />
          <Container className="relative z-10 max-w-4xl text-center sm:text-left">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-snug text-white/80 sm:text-xl">
              Topic archive page {page}.
            </p>
          </Container>
        </section>
        <section className="bg-background py-24 sm:py-32">
          <Container>
            <BlogListing
              posts={paginateBlogPosts(category.posts, page)}
              currentPage={page}
              totalPages={totalPages}
              basePath={`/blog/category/${category.slug}`}
              allPosts={posts}
              heading={`${category.name} articles, page ${page}`}
              intro="Older topic-specific guides remain available through crawlable pagination."
            />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
