import { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";
import { Container } from "@/components/layouts/container";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_CONTACT } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Read the PeekBooks Editors privacy policy covering manuscript handling, contact forms, payments, analytics, and data protection practices.",
  canonicalPath: "/privacy",
  keywords: ["PeekBooks Editors privacy policy", "manuscript confidentiality", "editing service privacy"],
});

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <Container className="max-w-3xl">
          <article className="prose prose-slate max-w-none prose-headings:font-serif prose-a:text-primary">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Legal</p>
            <h1>Privacy Policy</h1>
            <p><strong>Last updated:</strong> July 18, 2026</p>
            <p>PeekBooks Editors respects the confidentiality of manuscripts, academic documents, business files, and personal information submitted through this website.</p>

            <h2>Information we collect</h2>
            <p>We may collect your name, email address, phone number, project details, uploaded documents, word count, service selection, turnaround preference, payment status, and messages sent through the contact or submission forms.</p>

            <h2>How we use information</h2>
            <p>We use information to provide quotes, process submissions, deliver editing and proofreading services, respond to enquiries, send transactional emails, manage payments, protect the site from abuse, and improve service quality.</p>

            <h2>Manuscript confidentiality</h2>
            <p>Client documents are used only for the requested editorial service. We do not publish, sell, train public models on, or reuse manuscript content. Editorial access is limited to people who need it to complete or support the project.</p>

            <h2>Payments and service providers</h2>
            <p>Payments may be processed by third-party providers such as Paystack. Email, file storage, hosting, security, and analytics tools may process limited data so the website and service workflow can operate. Full manuscript files are retrieved through the protected administrative workflow rather than being attached to routine internal notification emails.</p>

            <h2>Retention and deletion</h2>
            <p>We retain records only as long as reasonably needed for service delivery, accounting, legal compliance, quality assurance, and dispute prevention. A fixed automatic deletion period is not currently applied to every stored project record. You may contact us to request deletion where applicable; limited payment or transaction records may need to be retained for legal or accounting obligations.</p>

            <h2>Your choices</h2>
            <p>You may request access, correction, or deletion of personal information by contacting <a href={`mailto:${SITE_CONTACT.publicEmail}`}>{SITE_CONTACT.publicEmail}</a>. We may need to retain limited records where required by law or legitimate business obligations.</p>

            <h2>Contact</h2>
            <p>Questions about this policy can be sent through the <Link href="/contact">contact page</Link> or by email at <a href={`mailto:${SITE_CONTACT.publicEmail}`}>{SITE_CONTACT.publicEmail}</a>.</p>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
