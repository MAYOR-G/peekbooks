"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpenText, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layouts/container";
import { cn } from "@/lib/utils";

type NavLink = {
    name: string;
    path: string;
    items?: { name: string; path: string }[];
};

const NAV_LINKS: NavLink[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
        name: "Services",
        path: "/services",
        items: [
            { name: "Academic & Non-Academic Editing", path: "/services/editing" },
            { name: "Express Services", path: "/services/additional#express" },
            { name: "Manuscript Formatting", path: "/services/additional#formatting" },
            { name: "Translation", path: "/services/additional#translation" }
        ]
    },
    { name: "Pricing", path: "/pricing" },
    { name: "Editors", path: "/editors" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [expandedMobileMenus, setExpandedMobileMenus] = useState<Record<string, boolean>>({});
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

    const toggleMobileMenu = (name: string) => {
        setExpandedMobileMenus(prev => ({ ...prev, [name]: !prev[name] }));
    };

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
                        className="flex items-center gap-2.5 group"
                    >
                        <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <BookOpenText size={20} className="text-white" strokeWidth={2} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[1.15rem] font-extrabold tracking-[0.04em] text-foreground leading-none">
                                PEEK<span className="text-primary">BOOKS</span>
                            </span>
                            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground leading-none mt-[3px]">
                                Proofreading
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.path || pathname.startsWith(link.path + '/');
                                const hasDropdown = !!link.items;
                                const isHovered = hoveredLink === link.name;

                                return (
                                    <li
                                        key={link.name}
                                        className="relative"
                                        onMouseEnter={() => setHoveredLink(link.name)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        <Link
                                            href={hasDropdown ? "#" : link.path}
                                            className={cn(
                                                "relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-sm px-1 py-1",
                                                isActive ? "text-foreground" : "text-muted-foreground"
                                            )}
                                        >
                                            {link.name}
                                            {hasDropdown && (
                                                <ChevronDown
                                                    size={14}
                                                    className={cn(
                                                        "transition-transform duration-200",
                                                        isHovered ? "rotate-180" : "rotate-0"
                                                    )}
                                                />
                                            )}
                                            {isActive && !hasDropdown && (
                                                <motion.div
                                                    layoutId="navbar-indicator"
                                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </Link>

                                        {/* Dropdown Menu */}
                                        {hasDropdown && (
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50 origin-top-left py-2"
                                                    >
                                                        <ul className="flex flex-col">
                                                            {link.items?.map((item, idx) => (
                                                                <li key={idx}>
                                                                    <Link
                                                                        href={item.path}
                                                                        className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-50 transition-colors"
                                                                        onClick={() => setHoveredLink(null)}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        )}
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
                            className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-card border-l border-border shadow-xl flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
                        >
                            <nav className="flex-1 flex flex-col gap-6">
                                <ul className="flex flex-col gap-4">
                                    {NAV_LINKS.map((link) => {
                                        const hasDropdown = !!link.items;
                                        const isExpanded = expandedMobileMenus[link.name];

                                        return (
                                            <li key={link.name} className="flex flex-col gap-2">
                                                {hasDropdown ? (
                                                    <button
                                                        className={cn(
                                                            "flex items-center justify-between text-lg font-medium transition-colors w-full text-left",
                                                            pathname.startsWith(link.path) || isExpanded
                                                                ? "text-foreground"
                                                                : "text-muted-foreground"
                                                        )}
                                                        onClick={() => toggleMobileMenu(link.name)}
                                                    >
                                                        {link.name}
                                                        <ChevronDown
                                                            size={20}
                                                            className={cn(
                                                                "transition-transform duration-200",
                                                                isExpanded ? "rotate-180" : "rotate-0"
                                                            )}
                                                        />
                                                    </button>
                                                ) : (
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
                                                )}

                                                {/* Mobile Submenu */}
                                                <AnimatePresence>
                                                    {hasDropdown && isExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <ul className="flex flex-col gap-3 pl-4 pt-2 border-l border-border/50 ml-1">
                                                                {link.items?.map((item, idx) => (
                                                                    <li key={idx}>
                                                                        <Link
                                                                            href={item.path}
                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                            className="block text-base font-medium text-muted-foreground hover:text-foreground"
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <span className="h-px w-full bg-border mt-auto mb-4" />

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
