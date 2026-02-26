"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Editors", path: "/editors" },
    { name: "Login", path: "/login" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out border-b border-transparent",
                    isScrolled
                        ? "bg-white/80 backdrop-blur-md shadow-xs border-border py-3"
                        : "bg-transparent py-5"
                )}
            >
                <Container className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tight text-foreground"
                    >
                        PEEKBOOKS
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.path;
                                return (
                                    <li key={link.name}>
                                        <Link
                                            href={link.path}
                                            className={cn(
                                                "relative text-sm font-medium transition-colors hover:text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-0.5",
                                                isActive ? "text-foreground" : "text-muted-foreground"
                                            )}
                                        >
                                            {link.name}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <Button asChild>
                            <Link href="/submit">Submit Manuscript</Link>
                        </Button>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 -mr-2 text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </Container>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-card border-l border-border shadow-xl flex flex-col pt-24 pb-8 px-6"
                        >
                            <nav className="flex-1 flex flex-col gap-6">
                                <ul className="flex flex-col gap-4">
                                    {NAV_LINKS.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.path}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={cn(
                                                    "block text-lg font-medium transition-colors hover:text-foreground",
                                                    pathname === link.path
                                                        ? "text-foreground"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <span className="h-px w-full bg-border" />

                                <div className="flex flex-col gap-3">
                                    <Button asChild size="lg" className="w-full">
                                        <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>
                                            Submit Manuscript
                                        </Link>
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        Confidential. Ethical. Tracked Changes.
                                    </p>
                                </div>
                            </nav>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
