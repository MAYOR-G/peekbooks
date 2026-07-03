import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Container } from "@/components/layouts/container";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "Read the PeekBooks Editors terms for editing, proofreading, formatting, submission, payments, confidentiality, revisions, and acceptable use.",
  canonicalPath: "/terms",
  keywords: ["PeekBooks Editors terms", "editing service terms", "proofreading terms of service"],
});

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <Container className="max-w-3xl">
          <article className="prose prose-slate max-w-none prose-headings:font-serif prose-a:text-primary">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Legal</p>
            <h1>Terms of Service</h1>
            <p><strong>Last updated:</strong> July 3, 2026</p>
            <p>These terms govern use of PeekBooks Editors and the editing, proofreading, formatting, writing-support, and related services requested through this website.</p>

            <h2>Service scope</h2>
            <p>Service scope depends on the option selected, document condition, word count, turnaround, and any instructions you provide. Editing improves language and presentation; it does not guarantee grades, admissions, publication, journal acceptance, funding, employment, or business outcomes.</p>

            <h2>Academic integrity</h2>
            <p>Clients remain responsible for their ideas, citations, data, claims, authorship, and final submission. We do not write academic work intended to be submitted as a client&apos;s original research, fabricate references, alter results, or provide dishonest academic assistance.</p>

            <h2>Submissions and file handling</h2>
            <p>You are responsible for submitting the correct file, accurate project details, and any required style guide, journal instructions, supervisor comments, or deadline information. We may contact you if the scope needs clarification before work begins.</p>

            <h2>Payment and turnaround</h2>
            <p>Payment is completed after submission and quote confirmation. Turnaround estimates begin after payment and scope confirmation unless otherwise agreed. Large, complex, or unclear files may require a custom review.</p>

            <h2>Revisions and support</h2>
            <p>If you have questions about delivered edits, contact us promptly with the file and specific issue. Support applies to the agreed scope and does not include new writing, new sections, or major author rewrites added after delivery.</p>

            <h2>Confidentiality</h2>
            <p>We treat client documents as confidential and use them only to provide the requested service, subject to operational needs described in the <Link href="/privacy">Privacy Policy</Link>.</p>

            <h2>Contact</h2>
            <p>Questions about these terms can be sent through the <Link href="/contact">contact page</Link> or by email at <a href={`mailto:${SITE_CONTACT.publicEmail}`}>{SITE_CONTACT.publicEmail}</a>.</p>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
