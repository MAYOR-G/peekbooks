import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peak Books Editing and Proofreading",
  description: "Peak Books Editing and Proofreading for academic, professional, and institutional writing. Confidential, ethical, and transparent.",
  icons: {
    icon: [
      { url: "/peekbooks-favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/peekbooks-favicon.svg",
    apple: "/peekbooks-favicon.svg",
  },
};

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
