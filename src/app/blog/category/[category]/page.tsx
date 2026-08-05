import { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogListing } from "@/components/blog/blog-listing";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { getAllBlogPosts, getBlogCategories, getBlogPageCount, paginateBlogPosts } from "@/lib/blog";
import { buildPageMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return getBlogCategories(posts).map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const posts = await getAllBlogPosts();
  const { category: categorySlug } = await params;
  const category = getBlogCategories(posts).find((item) => item.slug === categorySlug);

  if (!category) {
    return buildPageMetadata({ title: "Blog Category Not Found", description: "This blog category could not be found.", noindex: true });
  }

  return buildPageMetadata({
    title: `${category.name} Articles`,
    description: `Read PeekBooks Editors guides about ${category.name.toLowerCase()}, including practical editing, proofreading and submission advice.`,
    canonicalPath: `/blog/category/${category.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const posts = await getAllBlogPosts();
  const { category: categorySlug } = await params;
  const category = getBlogCategories(posts).find((item) => item.slug === categorySlug);

  if (!category) {
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
              Focused editing and proofreading guides for this topic.
            </p>
          </Container>
        </section>
        <section className="bg-background py-24 sm:py-32">
          <Container>
            <BlogListing
              posts={paginateBlogPosts(category.posts, 1)}
              currentPage={1}
              totalPages={getBlogPageCount(category.posts)}
              basePath={`/blog/category/${category.slug}`}
              allPosts={posts}
              heading={`${category.name} articles`}
              intro="Each article links naturally to the relevant service page, pricing guidance, or submission workflow where useful."
            />
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
