import Link from "next/link";
import { BookOpenText, Mail, MapPin, Phone } from "lucide-react";

import { SITE_CONTACT } from "@/lib/site";
import { Container } from "./container";

const FOOTER_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Editing Services", path: "/services/editing" },
  { name: "More Services", path: "/services/additional" },
  { name: "Pricing", path: "/pricing" },
  { name: "Editors", path: "/editors" },
  { name: "Submit", path: "/submit" },
];

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border/80 bg-slate-50/70 py-14 backdrop-blur-sm md:py-18">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary shadow-md">
              <BookOpenText size={22} className="text-white" strokeWidth={1.9} />
            </div>
            <div className="flex flex-col">
              <span className="text-[1.15rem] font-extrabold leading-none tracking-[0.04em] text-foreground">
                PEEK<span className="text-primary">BOOKS</span>
              </span>
              <span className="mt-1 max-w-[11rem] text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground leading-tight whitespace-normal">
                Editing and Proofreading
              </span>
            </div>
          </Link>

          <p className="max-w-md text-sm leading-7 text-muted-foreground">
            Professional proofreading and editing for academic, professional, and
            institutional writing. Confidential, ethical, and designed to help
            serious authors submit stronger work.
          </p>

          <div className="grid gap-3 rounded-[24px] border border-border/70 bg-white p-5 shadow-sm sm:grid-cols-2">
            <ContactLine
              icon={Mail}
              label="Email"
              value={SITE_CONTACT.publicEmail}
              href={`mailto:${SITE_CONTACT.publicEmail}`}
            />
            <ContactLine
              icon={Phone}
              label="Phone"
              value={SITE_CONTACT.phone}
              href={`tel:${SITE_CONTACT.phone.replace(/\s+/g, "")}`}
            />
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              Navigation
            </h4>
            <ul className="grid gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            Offices
          </h4>
          <div className="grid gap-4">
            {SITE_CONTACT.addresses.map((address) => (
              <div
                key={address}
                className="rounded-[22px] border border-border/70 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">{address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border/70 pt-6 lg:col-span-3">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PEEKBOOKS. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function ContactLine({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-3 rounded-2xl transition-colors hover:bg-slate-50"
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-sm text-foreground">{value}</p>
      </div>
    </a>
  );
}
