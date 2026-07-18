import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { buildPageMetadata } from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = buildPageMetadata({
  title: "Professional Editing and Proofreading Services",
  description: "PeekBooks Editors provides human editing, proofreading, formatting, and document support for academic, business, author, and professional writing.",
  canonicalPath: "/",
  keywords: ["professional editing services", "proofreading services", "academic editing", "manuscript editing", "PeekBooks Editors"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-background text-foreground flex flex-col font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
