import Link from "next/link";
import { ArrowUpRight, BookOpenText, Mail, MapPin, Phone } from "lucide-react";

import { SITE_CONTACT } from "@/lib/site";
import { Container } from "./container";

const FOOTER_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Editing Services", path: "/services/editing" },
  { name: "More Services", path: "/services/additional" },
  { name: "Pricing", path: "/pricing" },
  { name: "Editors", path: "/editors" },
  { name: "Contact", path: "/contact" },
  { name: "Submit", path: "/submit" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto w-full overflow-hidden bg-[#17347f] pt-28 text-white">
      <div className="absolute left-0 right-0 top-0 h-24 bg-background">
        <svg
          className="absolute bottom-[-1px] left-0 h-24 w-full text-[#17347f]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,72 C140,22 260,18 410,56 C560,94 690,110 850,70 C1010,30 1160,10 1440,48 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_45%)]" />

      <Container className="relative z-10 grid gap-10 pb-10 lg:grid-cols-[1.15fr_0.65fr_1fr]">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-md">
              <BookOpenText size={22} strokeWidth={1.9} />
            </div>
            <div className="flex flex-col">
              <span className="text-[1.15rem] font-extrabold leading-none tracking-[0.04em] text-white">
                PEEKBOOKS
              </span>
              <span className="mt-1 max-w-[12rem] text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-white/62 leading-tight">
                Editing and Proofreading
              </span>
            </div>
          </Link>

          <p className="max-w-md text-sm leading-7 text-white/72">
            Professional proofreading and editing for academic, professional, and
            institutional writing. Confidential, ethical, and designed to help
            serious authors submit stronger work.
          </p>

          <div className="max-w-md rounded-[24px] border border-white/12 bg-white/8 p-5 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            <ContactLine
              icon={Phone}
              label="Phone"
              value={SITE_CONTACT.phone}
              href={`tel:${SITE_CONTACT.phone.replace(/\s+/g, "")}`}
            />
            <div className="my-4 h-px bg-white/12" />
            <ContactLine
              icon={Mail}
              label="Email"
              value={SITE_CONTACT.publicEmail}
              href={`mailto:${SITE_CONTACT.publicEmail}`}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Navigation
          </h4>
          <ul className="grid gap-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            Offices
          </h4>
          <div className="grid gap-4">
            {SITE_CONTACT.addresses.map((address) => (
              <div
                key={address}
                className="rounded-[22px] border border-white/12 bg-white/8 p-5 shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-6 text-white/72">{address}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5"
          >
            Contact support
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="border-t border-white/12 pt-6 lg:col-span-3">
          <p className="text-sm text-white/62">
            © {new Date().getFullYear()} Peekbooks Editing and Proofreading. All rights reserved.
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
      className="flex items-start gap-3 rounded-2xl transition-colors hover:bg-white/6"
    >
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/54">
          {label}
        </p>
        <p className="mt-1 text-sm text-white">{value}</p>
      </div>
    </a>
  );
}
