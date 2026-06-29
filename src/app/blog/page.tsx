import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import { Navbar } from "@/components/layouts/navbar";
import { Footer } from "@/components/layouts/footer";
import { Container } from "@/components/layouts/container";

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 w-full pt-20">
        <section className="relative overflow-hidden border-b border-white/10 bg-primary pb-20 pt-24">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="absolute right-0 top-0 h-full w-1/2 rounded-bl-full bg-linear-to-bl from-white/5 to-transparent blur-3xl pointer-events-none" />

          <Container className="relative z-10 flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="max-w-4xl space-y-4">
              <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                The Peekbooks Blog
              </h1>
              <p className="max-w-2xl text-lg font-medium leading-snug text-white/80 sm:text-xl md:text-2xl">
                Insights and guides to elevate your writing and publishing journey.
              </p>
            </div>
          </Container>
        </section>

        <section className="bg-background py-24 sm:py-32">
          <Container>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col items-start justify-between rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-x-4 text-xs">
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
                    <h3 className="font-serif text-xl font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-foreground">
                        {post.author}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center text-sm font-semibold text-primary">
                    Read article <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
