import Link from "next/link";
import { Container } from "./container";

const FOOTER_LINKS = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Editors", path: "/editors" },
    { name: "Submit", path: "/submit" },
    { name: "Login", path: "/login" },
];

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-background py-12 md:py-16 mt-auto">
            <Container className="flex flex-col md:flex-row justify-between items-start gap-8">

                {/* Brand & Copyright */}
                <div className="flex flex-col gap-4 max-w-sm">
                    <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
                        PEEKBOOKS
                    </Link>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Professional Proofreading and Editing for Academic, Professional, and Institutional Writing.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        © {new Date().getFullYear()} PEEKBOOKS. All rights reserved.
                    </p>
                </div>

                {/* Links */}
                <div className="grid grid-cols-2 gap-8 sm:gap-16">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold text-foreground">Navigation</h4>
                        <ul className="flex flex-col gap-3">
                            {FOOTER_LINKS.slice(0, 4).map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-sm font-semibold text-color-foreground">Company</h4>
                        <ul className="flex flex-col gap-3">
                            {FOOTER_LINKS.slice(4).map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
