import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { buildPageMetadata, generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = buildPageMetadata({
  title: "Peekbooks Editing and Proofreading | Professional Services",
  description: "Peekbooks provides professional editing, proofreading, formatting, and translation services for academic, business, and author writing. Trusted by researchers worldwide.",
  canonicalPath: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const webSchema = generateWebsiteSchema();

  return (
    <html lang="en" className="antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-background text-foreground flex flex-col font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
