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
  title: "PEEKBOOKS | Professional Proofreading and Editing",
  description: "Professional Proofreading and Editing for Academic, Professional, and Institutional Writing. Confidential, ethical, and transparent.",
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
