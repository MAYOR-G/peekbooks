import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";

import type { BlogPost } from "@/lib/blog";
import { BLOG_POSTS_PER_PAGE, getBlogCategories, getPostCategory } from "@/lib/blog";

type BlogListingProps = {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  basePath: string;
  allPosts: BlogPost[];
  heading?: string;
  intro?: string;
};

export function BlogListing({
  posts,
  currentPage,
  totalPages,
  basePath,
  allPosts,
  heading,
  intro,
}: BlogListingProps) {
  const categories = getBlogCategories(allPosts);

  return (
    <>
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          {heading ? <h2 className="font-serif text-3xl font-bold text-foreground">{heading}</h2> : null}
          {intro ? <p className="mt-3 text-base leading-7 text-muted-foreground">{intro}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Blog categories">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blog/category/${category.slug}`}
              className="rounded-full border border-border/70 bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {post.heroImage ? (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.heroImage}
                  alt={post.heroImageAlt || post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-6">
              <Link
                href={`/blog/category/${categorySlugForPost(post, categories)}`}
                className="mb-4 w-fit rounded-full bg-primary/8 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary"
              >
                {getPostCategory(post)}
              </Link>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <time dateTime={post.date} className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1.5 h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </time>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  {post.readTime}
                </div>
              </div>
              <div className="group relative mt-4">
                <h3 className="font-serif text-xl font-semibold leading-6 text-foreground transition-colors group-hover:text-primary">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <p className="text-sm font-semibold leading-6 text-foreground">
                  {post.author}
                </p>
                <div className="flex items-center text-sm font-semibold text-primary">
                  Read article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className="mt-14 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
          <PaginationLink
            href={pageHref(basePath, currentPage - 1)}
            disabled={currentPage === 1}
            label="Previous page"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </PaginationLink>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <Link
              key={page}
              href={pageHref(basePath, page)}
              aria-current={page === currentPage ? "page" : undefined}
              aria-label={`Go to blog page ${page}`}
              className={`flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors ${
                page === currentPage
                  ? "border-primary bg-primary text-white"
                  : "border-border/70 bg-white text-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              {page}
            </Link>
          ))}
          <PaginationLink
            href={pageHref(basePath, currentPage + 1)}
            disabled={currentPage === totalPages}
            label="Next page"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </PaginationLink>
        </nav>
      ) : null}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Showing {posts.length} of {allPosts.length} published articles. Archive pages show no more than {BLOG_POSTS_PER_PAGE} articles each.
      </p>
    </>
  );
}

function pageHref(basePath: string, page: number) {
  if (page <= 1) return basePath;
  return `${basePath}/page/${page}`;
}

function PaginationLink({
  href,
  disabled,
  label,
  children,
}: {
  href: string;
  disabled: boolean;
  label: string;
  children: ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className="flex h-10 items-center gap-2 rounded-full border border-border/50 bg-slate-50 px-4 text-sm font-semibold text-muted-foreground/60"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-10 items-center gap-2 rounded-full border border-border/70 bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      {children}
    </Link>
  );
}

function categorySlugForPost(post: BlogPost, categories: ReturnType<typeof getBlogCategories>) {
  return categories.find((category) => category.name === getPostCategory(post))?.slug || "editing-guides";
}
