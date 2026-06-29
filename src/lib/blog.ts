export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Temporary placeholder data to setup the standard blog structure
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "importance-of-proofreading",
    title: "Why Proofreading is Essential Before Publishing",
    excerpt: "Discover the critical role proofreading plays in ensuring your manuscript or document is publication-ready and error-free.",
    content: "<p>This is a placeholder for the full blog content. The actual content will be provided later.</p>",
    author: "Peekbooks Editorial Team",
    date: "2026-06-28",
    readTime: "4 min read",
    tags: ["Proofreading", "Publishing"],
  },
  {
    slug: "academic-editing-guide",
    title: "A Complete Guide to Academic Editing",
    excerpt: "Everything you need to know about preparing your research paper or thesis for successful journal submission.",
    content: "<p>This is a placeholder for the full blog content. The actual content will be provided later.</p>",
    author: "Peekbooks Editorial Team",
    date: "2026-06-25",
    readTime: "6 min read",
    tags: ["Academic", "Editing"],
  }
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
